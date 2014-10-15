var BST = require('../binarysearch.js');
var assert = require("assert");


describe('#insert()', function() {

    describe('Insert single', function() {

        var bst = BST.create();
        bst.insert(13);

        it('Should have size 1', function() {
            assert.equal(1, bst.size());
        });

        it('Should have 13 as root', function() {
            assert.equal(13, bst.getRoot());
        });

    });

    describe('Insert multiple', function() {

        var bst = BST.create();
        bst.insert(2);
        bst.insert(1);
        bst.insert(3);

        it('Should have size 3', function() {
            assert.equal(3, bst.size());
        });

        it('Should have 2 as root', function() {
            assert.equal(2, bst.getRoot());
        });

    });

    describe('Insert duplicate', function() {

        var bst = BST.create();
        bst.insert(8);
        bst.insert(8);

        it('Should have size 1', function() {
            assert.equal(1, bst.size());
        });

    });

    describe('Insert single object', function() {

        var bst = BST.create(function(person) {
            return person.age;
        });

        var John = {
            name: "John",
            age: 13
        };

        bst.insert(John);

        it('Should have size 1', function() {
            assert.equal(1, bst.size());
        });

        it('Should have John as root', function() {
            assert.equal(John, bst.getRoot());
        });

    });

    describe('Insert multiple objects', function() {

        var bst = BST.create(function(person) {
            return person.age;
        });

        var Sarah = {
            name: "Sarah",
            age: 19
        };
        var John = {
            name: "John",
            age: 13
        };

        bst.insert(Sarah);
        bst.insert(John);

        it('Should have size 2', function() {
            assert.equal(2, bst.size());
        });

        it('Should have Sarah as root', function() {
            assert.equal(Sarah, bst.getRoot());
        });

    });

    describe('Insert duplicate object', function() {

        var bst = BST.create(function(person) {
            return person.age;
        });

        var John = {
            name: "John",
            age: 13
        };

        bst.insert(John);
        bst.insert(John);

        it('Should have size 1', function() {
            assert.equal(1, bst.size());
        });

    });

});

describe('#contains()', function() {

    var bst = BST.create();
    bst.insert(2);

    it('Should return true if node is found, otherwise return false', function() {
        assert.equal(true, bst.contains(2));
        assert.equal(false, bst.contains(4));
    });

});

describe('#traverse()', function() {

    var bst = BST.create();
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);

    it('Should return 6', function() {
        var result = 0;
        bst.traverse(function(node) {
            result += node;
        })
        assert.equal(6, result);
    });

    it('Should return 3', function() {
        var result = 0;
        bst.traverse(function(node) {
            result++;
        })
        assert.equal(3, result);
    });

});


describe('#remove()', function() {

    describe('Remove root with no children', function() {

        var bst = BST.create();
        bst.insert(13);

        it('Should have size 0', function() {
            bst.remove(13);
            assert.equal(0, bst.size());
        });

        it('Should not contain 13', function() {
            assert.equal(false, bst.contains(13));
        });

    });

    describe('Remove root with one child', function() {

        var bst = BST.create();
        bst.insert(13);
        bst.insert(5);

        bst.remove(13);

        it('Should have size 1', function() {
            assert.equal(1, bst.size());
        });

        it('Should not contain 13', function() {
            assert.equal(false, bst.contains(13));
        });

        it('Should have 5 as root', function() {
            assert.equal(5, bst.getRoot());
        });

    });

    describe('Remove root with two children', function() {

        var bst = BST.create();
        bst.insert(13);
        bst.insert(5);
        bst.insert(25);

        bst.remove(13);

        it('Should have size 2', function() {
            assert.equal(2, bst.size());
        });

        it('Should not contain 13', function() {
            assert.equal(false, bst.contains(13));
        });

        it('Should have 5 as root', function() {
            assert.equal(25, bst.getRoot());
        });

    });

    describe('Remove node with no children', function() {

        var bst = BST.create();
        bst.insert(13);
        bst.insert(8);

        bst.remove(8);

        it('Should have size 1', function() {
            assert.equal(1, bst.size());
        });

        it('Should not contain 8', function() {
            assert.equal(false, bst.contains(8));
        });

    });

    describe('Remove node with one child', function() {

        var bst = BST.create();
        bst.insert(13);
        bst.insert(8);
        bst.insert(5);

        bst.remove(8);

        it('Should have size 2', function() {
            assert.equal(2, bst.size());
        });

        it('Should not contain 8', function() {
            assert.equal(false, bst.contains(8));
        });

    });

    describe('Remove node with two children', function() {

        var bst = BST.create();
        bst.insert(13);
        bst.insert(8);
        bst.insert(5);
        bst.insert(11);

        bst.remove(8);

        it('Should have size 3', function() {
            assert.equal(3, bst.size());
        });

        it('Should not contain 8', function() {
            assert.equal(false, bst.contains(8));
        });

    });

    describe('Remove all nodes', function() {

        var bst = BST.create();
        bst.insert(13);
        bst.insert(8);
        bst.insert(5);

        bst.remove(5);
        bst.remove(8);
        bst.remove(13);

        it('Should have size 0', function() {
            assert.equal(0, bst.size());
        });

        it('Should not contain 5, 8 or 13', function() {
            assert.equal(false, bst.contains(5));
            assert.equal(false, bst.contains(8));
            assert.equal(false, bst.contains(13));
        });

    });

});

describe('#getMin(), #getMax()', function() {

    it('Should return 0 and 17', function() {

        var bst = BST.create();
        bst.insert(16);
        bst.insert(2);
        bst.insert(8);
        bst.insert(17);

        assert.equal(2, bst.getMin());
        assert.equal(17, bst.getMax());
    });

    it('Should return John and Carl', function() {

        var bst = BST.create(function(person) {
            return person.age;
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

        bst.insert(John);
        bst.insert(Carl);
        bst.insert(Sarah);
        bst.insert(Nathalie);

        assert.equal(John, bst.getMin());
        assert.equal(Carl, bst.getMax());
    });

});
