// JS version of binary tree with search
class BinaryTree {
    constructor(rootObj){
        this.key = rootObj;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
        // we have to bind our traversal methods to BinaryTree here
        // since we are passing these methods as arguments to search and get,
        // 'this' actually gets lost in scope if we don't run .bind(this) here
        this.bookTraverse = this.bookTraverse.bind(this)
        this.revDepthTraverse = this.revDepWidthTraverse.bind(this)
        this.revWidthTraverse = this.revWidthTraverse.bind(this)
        this.revDepWidthTraverse = this.revDepWidthTraverse.bind(this)
        this.triangleTraverse = this.triangleTraverse.bind(this)
        this.revTriangleTraverse = this.revTriangleTraverse.bind(this)
        BinaryTree.searchState = false;
        BinaryTree.getterState = false;
        BinaryTree.foundResult = null;
    }
    getLeftChild() {return this.leftChild};
    getRightChild() {return this.rightChild};
    getParent() {return this.parent};
    setRootVal(obj) {this.key = obj;}
    getRootVal() {return this.key};
    insertLeft(obj){
        if (this.leftChild === null) {
            this.leftChild = new BinaryTree(obj);
            this.leftChild.parent = this;
        } else {
            let newLeft = new BinaryTree(obj);
            newLeft.leftChild = this.leftChild;
            this.leftChild.parent = newLeft;
            newLeft.parent = this;
            this.leftChild = newLeft;
        }
    }
    insertRight(obj) {
        if (this.rightChild === null) {
            this.rightChild = new BinaryTree(obj);
            this.rightChild.parent = this;
        } else {
            let newRight = new BinaryTree(obj);
            newRight.rightChild = this.rightChild;
            this.rightChild = newRight;
        }

    }
    // traversal methods
    bookTraverse() {
        /*
        bookTraverse is like reading a book:
        top to bottom, left to right

        Used as argument to search and get methods
        */
       if (BinaryTree.searchState === true && BinaryTree.searchItem === this.key) {
           BinaryTree.foundResult = true;
           return;
       };
       if (BinaryTree.getterState === true && BinaryTree.searchItem === this.key) {
           BinaryTree.foundResult = this;
           return;
       }
       if (this.getLeftChild()) {this.leftChild.bookTraverse();}
       if (this.getRightChild()) {this.rightChild.bookTraverse();}
    }
    revDepthTraverse() {
    /*
        bottom to top, left to right

        Used as argument to search and get methods
    */
        if (this.getLeftChild()) {this.leftChild.revDepthTraverse()};
        if (this.getRightChild()) {this.rightChild.revDepthTraverse()};
        if (BinaryTree.searchState === true && BinaryTree.searchItem === self.key) {
            BinaryTree.foundResult = true;
            return;
        }
        if (BinaryTree.getterState === true && BinaryTree.searchItem == self.key) {
            BimaryTree.foundResult = this;
            return;
        }
    }
    revWidthTraverse() {
        /*
        top to bottom, but right to left

        Used as argument to search and get methods    
        */
        if (BinaryTree.searchState === true && BinaryTree.searchItem === this.key) {
            BinaryTree.foundResult = true;
            return;
        }    
        if (BinaryTree.getterState === true && BinaryTree.searchIte === this.key) {
            BinaryTree.foundResult = true;
            return;
        }
        if (this.getRightChild()) {this.rightChild.revWidthTraverse();}
        if (this.getLeftChild()) {this.leftChild.revWidthTraverse();}
    }

    revDepWidthTraverse() {
        /*
        bottom to top, right to left

        Used as argument to search and get methods
        */
        if (this.getRightChild()) {
            this.rightChild.revDepWidthTraverse();
        }
        if (this.getLeftChild()) {
            this.leftChild.revDepWidthTraverse();
        }
        if (BinaryTree.searchState === true && BinaryTree.searchItem === this.key) {
            BinaryTree.foundResult = true;
            return;
        }
        if (BinaryTree.getterState === true && BinaryTree.searchItem == this.key) {
            BinaryTree.foundResult = true;
            return;
        }
    }
    triangleTraverse() {
        /*
        traversal looks like a triangle:
        bottom, up, right, bottom, up, right

        Used as argument to search and get methods
        */
       if (this.getLeftChild()) {this.leftChild.triangleTraverse();}
       if (BinaryTree.searchState === true && BinaryTree.searchItem === this.key) {
           BinaryTree.foundResult = true;
           return;
       }
       if (BinaryTree.getterState == true && BinaryTree.searchItem === this.key) {
           BinaryTree.foundResult = true;
           return;
       }
       if (this.getRightChild()) {this.rightChild.triangleTraverse();}
    }
    revTriangleTraverse() {
        /*
        triangle starting on bottom right:
        bottom, up, left, bottom, up, left

        Used as argument to search and get methods
        */
        if (this.getRightChild()) {this.rightChild.revTriangleTraverse();}
        if (BinaryTree.searchState === true && BinaryTree.searchItem === this.key) {
            BinaryTree.foundResult = true;
            return;
        }
        if (BinaryTree.getterState === true && BinaryTree.searchItem === this.key) {
            BinaryTree.foundResult = true;
            return;
        }
        if (this.getLeftChild()) {this.leftChild.revTriangleTraverse();}
    }
    search(item, traverseMethod) {
        /*
        search works by actually running through whichever traversal method we choose
        Then, inside those traversal methods, static variable BinaryTree.foundResult is changed
        based on whether item was found or not

        Args:
            item (type is dependent on keys in nodes of tree): item we are searching for
            traverseMethod: Traversal method to be used in search. passed as string name of method
            Options are: bookTraverse, revDepthTravers, revWidthTraverse, RevDepWidthTraverse, triangleTraverse, revTriangleTraverse.
            If you have a rough idea of where your item might be located, 
            changing traversal method can cut down on search time. Defaults to bookTraverse.

        Returns:
            BinaryTree.foundResult: True or False bool
        */
       BinaryTree.foundResult = false;
       BinaryTree.searchState = true;
       BinaryTree.getterState = false;
       BinaryTree.searchItem = item;
       switch(traverseMethod) {
           case 'bookTraverse':
               this.bookTraverse();
               break;
            case 'revDepthTraverse':
                this.revDepthTraverse();
                break;
            case 'revWidthTraverse':
                this.revWidthTraverse();
                break;
            case 'revDepWidthTraverse':
                this.revDepWidthTraverse();
                break;
            case 'triangleTraverse':
                this.triangleTraverse();
                break;
            case 'revTriangleTraverse':
                this.revTriangleTraverse();
                break;
            default:
                console.log('using default: bookTraverse traversal method')
                this.bookTraverse();

       }
       return BinaryTree.foundResult;
    }
    get(item, traverseMethod) {
        /*
        Get works by actually running through whichever traversal method we choose
        Then, inside those traversal methods, static variable BinaryTree.foundResult is changed
        based on whether item was found or not

        Args:
            item (type is dependent on keys in nodes of tree): item we are searching for
            traverseMethod: Traversal method to be used in search. 
            Options are: bookTraverse, revDepthTravers, revWidthTraverse, RevDepWidthTraverse, triangleTraverse, revTriangleTraverse.
            If you have a rough idea of where your item might be located, 
            changing traversal method can cut down on search time. Defaults to bookTraverse.

        Returns:
            BinaryTree.foundResult: True or False bool
        */
        BinaryTree.foundResult = false;
        BinaryTree.searchState = false;
        BinaryTree.getterState = true;
        BinaryTree.searchItem = item;
        traverseMethod();
        return BinaryTree.foundResult;
    }

}

let bt = new BinaryTree('root');
bt.insertLeft('left branch');
bt.insertRight('right branch');
bt.leftChild.insertLeft('l.l');
bt.leftChild.leftChild.insertLeft('l.l.l');
bt.leftChild.leftChild.insertRight('l.l.r');
bt.leftChild.insertRight('l.r');
bt.leftChild.rightChild.insertRight('l.r.r');
bt.rightChild.insertRight('r.r');

// testing search
console.log(bt.search('l.l.l')) // default
console.log(bt.search('l.l.l', 'bookTraverse')) // pick up here
console.log(bt.search('l.l.l', 'revDepWidthTraverse'))
console.log(bt.search('l.l.l', 'revDepthTraverse'))
console.log(bt.search('l.l.l', 'revWidthTraverse'))
console.log(bt.search('l.l.l', 'triangleTraverse'))
console.log(bt.search('l.l.l', 'revTriangleTraverse'))
//bt.bookTraverse() // funtionality is working when bookTraverse is run on its own,
// but not yet getting it to run inside search, because 'this' is being lost?