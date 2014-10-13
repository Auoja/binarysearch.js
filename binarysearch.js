(function(exports) {

    function BinarySearchTree(value) {
        var _root;
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


        // Public
        this.contains = function(node) {
            var currentNode = _root;
            var inTree = false;

            while (!inTree && currentNode) {
                if (getValue(node) < currentNode.getValue()) {
                    currentNode = currentNode.leftChild;
                } else if (getValue(node) > currentNode.getValue()) {
                    currentNode = currentNode.rightChild;
                } else {
                    inTree = true;
                }
            }

            return inTree;
        }

        this.insert = function(node) {

            var newNode = new Node(node, null, null);
            var inserted = false;

            if (!_root) {
                _root = newNode;
                inserted = true;
            } else {
                var currentNode = _root;

                while (true) {
                    if (getValue(node) < currentNode.getValue()) {
                        if (currentNode.leftChild === null) {
                            currentNode.leftChild = newNode;
                            inserted = true;
                            break;
                        } else {
                            currentNode = currentNode.leftChild;
                        }
                    } else if (getValue(node) > currentNode.getValue()) {
                        if (currentNode.rightChild === null) {
                            currentNode.rightChild = newNode;
                            inserted = true;
                            break;
                        } else {
                            currentNode = currentNode.rightChild;
                        }
                    } else {
                        break;
                    }
                }
            }

            if (inserted) {
                _size++;
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
            function visitAll(node) {
                if (node) {
                    if (node.leftChild !== null) {
                        visitAll(node.leftChild);
                    }

                    operation.call(this, node);

                    if (node.rightChild !== null) {
                        visitAll(node.rightChild);
                    }
                }
            }
            visitAll(_root);
        };

        this.size = function() {
            return _size;
        };

        this.toArray = function() {
            var array = [];
            this.traverse(function(node) {
                array.push(node.content);
            });
            return array;
        };

        this.arrayToTree = function(array) {
            if (array.length !== 0) {
                var middle = Math.floor(array.length / 2);
                this.insert(array[middle]);
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
            var node = _root;
            while (node.leftChild) {
                node = node.leftChild;
            }
            return node.content;
        };

        this.getMax = function() {
            var node = _root;
            while (node.rightChild) {
                node = node.rightChild;
            }
            return node.content;
        };

        this.getRoot = function() {
            return _root.content;
        };

        this.getRootValue = function() {
            return _root.getValue();
        };

        this.delete = function() {
            root = null;
            _size = 0;
        };

    }

    exports.createBST = function(value) {
        return new BinarySearchTree(value);
    };


    return exports;

})(typeof exports === 'undefined' ? this['BST'] = {} : exports);