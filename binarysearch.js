(function(exports) {

    function Node(val, left, right) {
        this.value = val;
        this.leftChild = left;
        this.rightChild = right;
    }

    function BinarySearchTree() {
        var root;

        // function remove(node, value) {
        //     if (value < node.value) {
        //         remove(node.leftChild, value);
        //     } else if (value > node.value) {
        //         remove(node.rightChild, value);
        //     } else {
        //         if (node.leftChild && node.rightChild) {

        //         } else if (node.leftChild || node.rightChild) {

        //         } else {
        //             delete node;
        //         }
        //     }
        // }

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
            var inTree = false;

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
                if (currentNode === root) {
                    if (currentNode.leftChild && currentNode.rightChild) {
                        // Two child nodes
                        // TODO
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