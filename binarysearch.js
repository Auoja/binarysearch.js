(function(exports) {

    function BinarySearchTree(value) {
        var _root = null;
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
                return node;
            }
            return _getMin(node.leftChild);
        }

        function _getMax(node) {
            if (node.rightChild === null) {
                return node;
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

        function _remove(x, node, parent) {
            if (node === null) {
                return;
            }

            if (getValue(x) < node.getValue()) {
                _remove(x, node.leftChild, node);
            } else if (getValue(x) > node.getValue()) {
                _remove(x, node.rightChild, node);
            } else if (node.leftChild !== null && node.rightChild !== null) {
                node.content = _getMin(node.rightChild).content;
                _remove(node.content, node.rightChild, node);
            } else {
                if (parent) {
                    if (node.getValue() < parent.getValue()) {
                        parent.leftChild = node.leftChild || node.rightChild;
                    } else {
                        parent.rightChild = node.leftChild || node.rightChild;
                    }
                } else {
                    _root = node.leftChild || node.rightChild;
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
            } else {
                _root = _insert(new Node(content, null, null), _root);
            }
        };

        this.remove = function(removeNode) {
            _remove(removeNode, _root, null);
        };

        this.traverse = function(operation) {
            _traverse(_root, operation);
        };

        this.size = function() {
            var size = 0;
            _traverse(_root, function() {
                size++;
            });
            return size;
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
            this.arrayToTree(sortedArray);
        };

        this.getDepth = function() {
            // TODO
        };

        this.getMin = function() {
            return _getMin(_root).content;
        };

        this.getMax = function() {
            return _getMax(_root).content;
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
        };

    }

    exports.createBST = function(value) {
        return new BinarySearchTree(value);
    };


    return exports;

})(typeof exports === 'undefined' ? this['BST'] = {} : exports);