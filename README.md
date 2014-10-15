# binarysearch.js

A JavaScript Binary Search Tree implementation.

## Usage

Some basic usage.

```javascript

	var bst = BST.create();
	bst.insert(45);
	bst.insert(13);
	bst.insert(12);
	bst.insert(56);
	bst.insert(3);
	bst.insert(85);

	var min = bst.getMin(); // 3
	var max = bst.getMax(); // 85

	bst.remove(85);

	max = bst.getMax(); // 56

	var sorted = bst.toArray() // [ 3, 12, 13, 45, 56 ]
```

Basic usage with objects. Note that `.create()` takes a value extraction function as an argument.

```javascript

	var minHeap = BST.create(function(node) {
		return node.age;
	});
	var John = {
		name: "John",
		age: 13
	};
	var Carl = {
		name: "Carl",
		age: 45
	};
	var Sarah = {
		name: "Sarah",
		age: 19
	};
	var Nathalie = {
		name: "Nathalie",
		age: 28
	};

	var min = bst.getMin(); // John
	var max = bst.getMax(); // Carl

	bst.remove(Carl);

	max = bst.getMax(); // Nathalie

	var sorted = bst.toArray() // [ John, Sarah, Nathalie ]
```


## Testing

Make sure you have [Node](http://nodejs.org) installed and then install [Mocha](http://visionmedia.github.io/mocha/) either globally:

```
	node install -g mocha
```

... or locally:

```
	node install
```

Then just run:

```
	node test
```
or:

```
	node test/test.js
```
