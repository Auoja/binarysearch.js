var BST = require('../binarysearch.js');

var bst = BST.createBST();

bst.insert(50);
bst.insert(55);
bst.insert(10);
bst.insert(20);
bst.insert(60);
bst.insert(16);
bst.insert(18);
bst.insert(23);

bst.traverse(function (n) {
    console.log(n.value);
});
console.log(bst.size());
console.log(bst.getRoot());

// bst.remove(10); // No children
// bst.remove(50); // One child
console.log(bst.contains(50));
console.log(bst.contains(55));
console.log(bst.contains(10));
console.log(bst.contains(60));
console.log(bst.contains(0));


console.log(bst.toArray());

bst.flatten();
console.log(bst.getRoot());

