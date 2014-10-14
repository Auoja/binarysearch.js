(function(exports) {

    function BinarySearchTree(value) {
        var _root = null;
        var _size = 0;
        var getValue = value || function(a) {
            return a;
        };

        // Tree Node
        function Node(content, left, right) {
            this.content = content;
            this.leftChild = left;
            this.rightChild = right;
        }

        Node.prototype.getValue = function() {
            return getValue.call(this, this.content);
        };

        // Private
        function _insert(newNode, node) {
            if (node === null) {
                _size++;
                return newNode;
            } else if (newNode.getValue() < node.getValue()) {
                node.leftChild = _insert(newNode, node.leftChild);
                return node;
            } else if (newNode.getValue() > node.getValue()) {
                node.rightChild = _insert(newNode, node.rightChild);
                return node;
            } else {
                return node;
            }
        }

        function _getMin(node) {
            if (node.leftChild === null) {
                return node.content;
            }
            return _getMin(node.leftChild);
        }

        function _getMax(node) {
            if (node.rightChild === null) {
                return node.content;
            }
            return _getMax(node.rightChild);
        }

        function _contains(searchNode, node) {
            if (node === null) {
                return false;
            } else if (getValue(searchNode) < node.getValue()) {
                return _contains(searchNode, node.leftChild);
            } else if (getValue(searchNode) > node.getValue()) {
                return _contains(searchNode, node.rightChild);
            } else {
                return true;
            }
        }

        function _traverse(node, operation) {
            if (node) {
                if (node.leftChild !== null) {
                    _traverse(node.leftChild, operation);
                }

                operation.call(this, node.content);

                if (node.rightChild !== null) {
                    _traverse(node.rightChild, operation);
                }
            }
        }

        // Public
        this.contains = function(searchNode) {
            return _contains(searchNode, _root);
        };

        this.insert = function(content) {
            if (!_root) {
                _root = new Node(content, null, null);
                _size++;
            } else {
                _root = _insert(new Node(content, null, null), _root);
            }
        };

        this.remove = function(node) {
            var currentNode = _root;
            var parentNode;
            var inTree = false;

            function removeNodeWithNoChild(node, parent) {
                if (node === _root) {
                    _root = null;
                } else {
                    if (node.getValue() < parent.getValue()) {
                        parent.leftChild = null;
                    } else {
                        parent.rightChild = null;
                    }
                }
            }

            function removeNodeWithOneChild(node, parent) {
                if (node === _root) {
                    _root = node.leftChild || node.rightChild;
                } else {
                    if (node.getValue() < parent.getValue()) {
                        parent.leftChild = node.leftChild || node.rightChild;
                    } else {
                        parent.rightChild = node.leftChild || node.rightChild;
                    }
                }
            }

            function removeNodeWithTwoChild(node, parent) {

                var replacementNode = node.leftChild;
                var replacementNodeParent = null;

                while (replacementNode.rightChild !== null) {
                    replacementNodeParent = replacementNode;
                    replacementNode = replacementNode.rightChild;
                }

                if (replacementNodeParent !== null) {
                    replacementNodeParent.rightChild = replacementNode.leftChild;
                    replacementNode.rightChild = node.rightChild;
                    replacementNode.leftChild = node.leftChild;
                } else {
                    replacementNode.rightChild = node.rightChild;
                }

                if (node === _root) {
                    _root = replacementNode;
                } else {
                    if (node.getValue() < parent.getValue()) {
                        parent.leftChild = replacementNode;
                    } else {
                        parent.rightChild = replacementNode;
                    }
                }

            }

            while (!inTree && currentNode) {
                if (getValue(node) < currentNode.getValue()) {
                    parentNode = currentNode;
                    currentNode = currentNode.leftChild;
                } else if (getValue(node) > currentNode.getValue()) {
                    parentNode = currentNode;
                    currentNode = currentNode.rightChild;
                } else {
                    inTree = true;
                }
            }

            if (inTree) {

                if (currentNode.leftChild && currentNode.rightChild) {
                    removeNodeWithTwoChild(currentNode, parentNode);
                } else if (currentNode.leftChild || currentNode.rightChild) {
                    removeNodeWithOneChild(currentNode, parentNode);
                } else {
                    removeNodeWithNoChild(currentNode, parentNode);
                }

                _size--;
            }
        };

        this.traverse = function(operation) {
            _traverse(_root, operation);
        };

        this.size = function() {
            return _size;
        };

        this.toArray = function() {
            var array = [];
            _traverse(_root, function(node) {
                array.push(node);
            });
            return array;
        };

        this.arrayToTree = function(array) {
            if (array.length !== 0) {
                var middle = Math.floor(array.length / 2);
                _insert(array[middle], _root);
                this.arrayToTree(array.slice(0, middle));
                this.arrayToTree(array.slice(middle + 1));
            } else {
                return;
            }
        };

        this.flatten = function() {
            var sortedArray = this.toArray();
            _root = null;
            _size = 0;
            this.arrayToTree(sortedArray);
        };

        this.getDepth = function() {
            // TODO
        };

        this.getMin = function() {
            return _getMin(_root);
        };

        this.getMax = function() {
            return _getMax(_root);
        };

        this.getRoot = function() {
            return _root.content;
        };

        this.getRootValue = function() {
            return _root.getValue();
        };

        this.getTree = function() {
            return _root;
        };

        this.delete = function() {
            _root = null;
            _size = 0;
        };

    }

    exports.createBST = function(value) {
        return new BinarySearchTree(value);
    };


    return exports;

})(typeof exports === 'undefined' ? this['BST'] = {} : exports);