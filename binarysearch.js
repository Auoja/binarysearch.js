(function(exports) {

    function Node(val, left, right) {
        this.value = val;
        this.leftChild = left;
        this.rightChild = right;
    }

    function BinarySearchTree() {
        var _root;
        var _size = 0;

        this.contains = function(value) {
            var currentNode = _root;
            var inTree = false;

            while (!inTree && currentNode) {

                if (value < currentNode.value) {
                    currentNode = currentNode.leftChild;
                } else if (value > currentNode.value) {
                    currentNode = currentNode.rightChild;
                } else {
                    inTree = true;
                }
            }

            return inTree;
        }

        this.insert = function(value) {

            var newNode = new Node(value, null, null);
            var inserted = false;

            if (!_root) {
                _root = newNode;
                inserted = true;
            } else {
                var currentNode = _root;

                while (true) {
                    if (value < currentNode.value) {
                        if (currentNode.leftChild === null) {
                            currentNode.leftChild = newNode;
                            inserted = true;
                            break;
                        } else {
                            currentNode = currentNode.leftChild;
                        }
                    } else if (value > currentNode.value) {
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

        this.remove = function(value) {
            var currentNode = _root;
            var parentNode;
            var inTree = false;

            function removeNodeWithNoChild(node, parent) {
                if (node === _root) {
                    _root = null;
                } else {
                    if (node.value < parent.value) {
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
                    if (node.value < parent.value) {
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
                    if (node.value < parent.value) {
                        parent.leftChild = replacementNode;
                    } else {
                        parent.rightChild = replacementNode;
                    }
                }

            }

            while (!inTree && currentNode) {
                if (value < currentNode.value) {
                    parentNode = currentNode;
                    currentNode = currentNode.leftChild;
                } else if (value > currentNode.value) {
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
                array.push(node.value);
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
            return node;
        };

        this.getMax = function() {
            var node = _root;
            while (node.rightChild) {
                node = node.rightChild;
            }
            return node;
        };

        this.getRoot = function() {
            return _root.value;
        };

        this.getRootNode = function() {
            return _root;
        };

        this.delete = function() {
            root = null;
            _size = 0;
        };

    }

    exports.createBST = function() {
        return new BinarySearchTree();
    };


    return exports;

})(typeof exports === 'undefined' ? this['BST'] = {} : exports);