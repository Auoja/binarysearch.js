(function(exports) {

    function BinarySearchTree(customKeyFn) {
        var _root = null;
        var getKey = customKeyFn || function(key) {
            return key;
        };

        // Tree Node
        function Node(value, left, right) {
            this.value = value;
            this.leftChild = left;
            this.rightChild = right;
        }

        Node.prototype.getKey = function() {
            return getKey.call(this, this.value);
        };

        // Private
        function _insert(node, treeRoot) {
            if (treeRoot === null) {
                return node;
            } else if (node.getKey() < treeRoot.getKey()) {
                treeRoot.leftChild = _insert(node, treeRoot.leftChild);
                return treeRoot;
            } else if (node.getKey() > treeRoot.getKey()) {
                treeRoot.rightChild = _insert(node, treeRoot.rightChild);
                return treeRoot;
            } else {
                return treeRoot;
            }
        }

        function _getMin(treeRoot) {
            if (treeRoot.leftChild === null) {
                return treeRoot;
            }
            return _getMin(treeRoot.leftChild);
        }

        function _getMax(treeRoot) {
            if (treeRoot.rightChild === null) {
                return treeRoot;
            }
            return _getMax(treeRoot.rightChild);
        }

        function _contains(node, treeRoot) {
            if (treeRoot === null) {
                return false;
            } else if (getKey(node) < treeRoot.getKey()) {
                return _contains(node, treeRoot.leftChild);
            } else if (getKey(node) > treeRoot.getKey()) {
                return _contains(node, treeRoot.rightChild);
            } else {
                return true;
            }
        }

        function _traverse(treeRoot, operation) {
            if (treeRoot) {
                if (treeRoot.leftChild !== null) {
                    _traverse(treeRoot.leftChild, operation);
                }

                operation.call(this, treeRoot.value);

                if (treeRoot.rightChild !== null) {
                    _traverse(treeRoot.rightChild, operation);
                }
            }
        }

        function _remove(node, treeRoot, parent) {
            if (treeRoot === null) {
                return;
            }

            if (getKey(node) < treeRoot.getKey()) {
                _remove(node, treeRoot.leftChild, treeRoot);
            } else if (getKey(node) > treeRoot.getKey()) {
                _remove(node, treeRoot.rightChild, treeRoot);
            } else if (treeRoot.leftChild !== null && treeRoot.rightChild !== null) {
                treeRoot.value = _getMin(treeRoot.rightChild).value;
                _remove(treeRoot.value, treeRoot.rightChild, treeRoot);
            } else {
                if (parent) {
                    if (treeRoot.getKey() < parent.getKey()) {
                        parent.leftChild = treeRoot.leftChild || treeRoot.rightChild;
                    } else {
                        parent.rightChild = treeRoot.leftChild || treeRoot.rightChild;
                    }
                } else {
                    _root = treeRoot.leftChild || treeRoot.rightChild;
                }
            }

        }

        // Public
        this.contains = function(node) {
            return _contains(node, _root);
        };

        this.insert = function(node) {
            if (!_root) {
                _root = new Node(node, null, null);
            } else {
                _root = _insert(new Node(node, null, null), _root);
            }
        };

        this.remove = function(node) {
            _remove(node, _root, null);
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
            var arr = [];
            _traverse(_root, function(node) {
                arr.push(node);
            });
            return arr;
        };

        this.fromArray = function(arr) {
            if (arr.length !== 0) {
                var middle = Math.floor(arr.length / 2);
                _insert(arr[middle], _root);
                this.fromArray(arr.slice(0, middle));
                this.fromArray(arr.slice(middle + 1));
            } else {
                return;
            }
        };

        this.flatten = function() {
            var sortedArray = this.toArray();
            _root = null;
            this.fromArray(sortedArray);
        };

        this.getDepth = function() {
            // TODO
        };

        this.getMin = function() {
            return _getMin(_root).value;
        };

        this.getMax = function() {
            return _getMax(_root).value;
        };

        this.getRoot = function() {
            return _root.value;
        };

        this.getTree = function() {
            return _root;
        };

        this.delete = function() {
            _root = null;
        };

    }

    exports.create = function(customKeyFn) {
        return new BinarySearchTree(customKeyFn);
    };


    return exports;

})(typeof exports === 'undefined' ? this['BST'] = {} : exports);