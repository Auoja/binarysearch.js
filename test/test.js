var BST = require('../binarysearch.js');

var bst = BST.createBST();

bst.insert(50);
bst.insert(55);
bst.insert(10);
bst.insert(60);

console.log(bst.getRoot());

// bst.remove(10); // No children
bst.remove(55); // One child
console.log("DELETE");

console.log(bst.getRoot());
