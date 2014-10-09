(function(exports) {

    function Node(val, left, right) {
        this.value = val;
        this.leftChild = left;
        this.rightChild = right;
    }

    function BinarySearchTree() {
        var root;

        this.contains = function(value) {
            var currentNode = root;
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

            if (!root) {
                root = newNode;
            } else {
                var curNode = root;

                while (true) {
                    if (value < curNode.value) {
                        if (curNode.leftChild === null) {
                            curNode.leftChild = newNode;
                            break;
                        } else {
                            curNode = curNode.leftChild;
                        }
                    } else if (value > curNode.value) {
                        if (curNode.rightChild === null) {
                            curNode.rightChild = newNode;
                            break;
                        } else {
                            curNode = curNode.rightChild;
                        }
                    } else {
                        break;
                    }
                }
            }
        };

        this.remove = function(value) {
            var currentNode = root;
            var parentNode;
            var replacementNode;
            var replacementNodeParent;

            var inTree = this.contains(value);

            if (inTree) {
                if (currentNode === root) {
                    if (currentNode.leftChild && currentNode.rightChild) {
                        // Two child nodes
                        replacementNode = root.leftChild;

                        while (replacementNode.rightChild !== null) {
                            replacementNodeParent = replacementNode;
                            replacementNode = replacementNode.rightChild;
                        }
                        console.log("replacementNodeParent " + replacementNodeParent);
                        console.log("replacementNode " + replacementNode);
                        // if (replacementNodeParent !== null) {
                        //     replacementNodeParent.rightChild = replacementNode.leftChild;
                        //     replacementNode.rightChild = root.rightChild;
                        //     replacementNode.leftChild = root.leftChild;
                        // } else {
                        //     replacementNode.rightChild = root.rightChild;
                        // }

                        root = replacementNode;

                    } else if (currentNode.leftChild || currentNode.rightChild) {
                        // One child node
                        root = currentNode.leftChild || currentNode.rightChild;
                    } else {
                        // No child nodes
                        root = null;
                    }
                } else {
                    if (currentNode.leftChild && currentNode.rightChild) {
                        // Two child nodes
                        // TODO
                    } else if (currentNode.leftChild || currentNode.rightChild) {
                        // One child node
                        if (currentNode.value < parentNode.value) {
                            parentNode.leftChild = currentNode.leftChild || currentNode.rightChild;
                        } else {
                            parentNode.rightChild = currentNode.leftChild || currentNode.rightChild;
                        }
                    } else {
                        // No child nodes
                        if (currentNode.value < parentNode.value) {
                            parentNode.leftChild = null;
                        } else {
                            parentNode.rightChild = null;
                        }
                    }
                }
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
            visitAll(root);
        };

        this.size = function() {
            var length = 0;
            this.traverse(function(node) {
                length++;
            });
            return length;
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
            root = null;
            this.arrayToTree(sortedArray);
        }

        this.getMin = function() {
            var node = root;
            while (node.leftChild) {
                node = node.leftChild;
            }
            return node;
        };

        this.getMax = function() {
            var node = root;
            while (node.rightChild) {
                node = node.rightChild;
            }
            return node;
        };

        this.getRoot = function() {
            return root;
        };

    }

    exports.createBST = function() {
        return new BinarySearchTree();
    };


    return exports;

})(typeof exports === 'undefined' ? this['Bst'] = {} : exports);