var BST = require('../binarysearch.js');
var assert = require("assert");


describe('#insert()', function() {

    describe('Insert single', function() {
        var bst = BST.createBST();
        bst.insert(13);

        it('Should have size 1', function() {
            assert.equal(1, bst.size());
        });

        it('Should have 13 as root', function() {
            assert.equal(13, bst.getRoot());
        });
    });

    describe('Insert multiple', function() {

        var bst = BST.createBST();
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

        var bst = BST.createBST();
        bst.insert(8);
        bst.insert(8);

        it('Should have size 1', function() {
            assert.equal(1, bst.size());
        });
    });

    describe('Insert single object', function() {
        var bst = BST.createBST(function(person) {
            return person.age;
        });
        bst.insert({
            name: "John Foo",
            age: 13
        });

        it('Should have size 1', function() {
            assert.equal(1, bst.size());
        });

        it('Should have 13 as root', function() {
            assert.equal(13, bst.getRoot());
        });
    });
});

describe('#contains()', function() {

    var bst = BST.createBST();
    bst.insert(2);

    it('Should return true if node is found, otherwise return false', function() {
        assert.equal(true, bst.contains(2));
        assert.equal(false, bst.contains(4));
    });

});


describe('#remove()', function() {

    describe('Remove root with no children', function() {
        var bst = BST.createBST();
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
        var bst = BST.createBST();
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
        var bst = BST.createBST();
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
            assert.equal(5, bst.getRoot());
        });
    });

    describe('Remove node with no children', function() {
        var bst = BST.createBST();
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
        var bst = BST.createBST();
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
        var bst = BST.createBST();
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
        var bst = BST.createBST();
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
