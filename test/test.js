var BST = require('../binarysearch.js');

var bst = BST.createBST();

bst.insert(8);
bst.insert(3);
bst.insert(10);
bst.insert(1);
bst.insert(6);
bst.insert(14);
bst.insert(4);
bst.insert(7);
bst.insert(13);
// bst.insert(2);

// bst.traverse(function (n) {
//     console.log(n.value);
// });
// console.log(bst.size());
// console.log(bst.getRoot());

// bst.remove(10); // No children

// bst.remove(1);
bst.remove(3);
// bst.remove(3);

console.log(bst.getRoot());

console.log(bst.toArray());

bst.flatten();

