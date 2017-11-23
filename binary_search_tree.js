function BSTree() {
  this.root = null;
}

BSTree.prototype.set = function (key, value) {
  if (this.root) {
    this.root = this.root.set2(key, value);
  } else {
    this.root = new BSTNode(key, value);
  }
};

function BSTNode(key, value, left, right) {
  this.key = key;
  this.value = value;
  this.left = left || null;
  this.right = right || null;
  var childDepths = this.childDepths();
  this.depth = Math.max(childDepths[0], childDepths[1]) + 1;
  this.balance = childDepths[1] - childDepths[0];
}

BSTNode.prototype.childDepths = function () {
  var leftDepth, rightDepth;
  if (this.left) {
    leftDepth = this.left.depth;
  } else {
    leftDepth = 0;
  }
  if (this.right) {
    rightDepth = this.right.depth;
  } else {
    rightDepth = 0;
  }

  return [leftDepth, rightDepth];
};

// This is the mutable version...
BSTNode.prototype.set = function (key, value) {
  if (this.key === key) {
    this.value = value;
  } else if (this.key > key) {
    if (this.left) {
      this.left.set(key, value);
    } else {
      this.left = new BSTNode(key, value);
      return this.left;
    }
  } else if (this.key < key) {
    if (this.right) {
      this.right.set(key, value);
    } else {
      this.right = new BSTNode(key, value);
      return this.right;
    }
  }
};

// This is the immutable version...
BSTNode.prototype.set2 = function (key, value) {
  var newNode = null;
  var newLeft = null;
  var newRight = null;
  if (this.key === key) {
    newNode = new BSTNode(
      key, 
      value, 
      this.left, 
      this.right
    );
  } else if (this.key > key) {
    if (this.left) {
      newLeft = this.left.set2(key, value);
      newNode = new BSTNode(
        this.key, 
        this.value, 
        newLeft, 
        this.right
      );
    } else {
      newLeft = new BSTNode(key, value);
      newNode = new BSTNode(
        this.key, 
        this.value, 
        newLeft, 
        this.right
      );
    }
  } else if (this.key < key) {
    if (this.right) {
      newRight = this.right.set2(key, value);
      newNode = new BSTNode(
        this.key, 
        this.value, 
        this.left, 
        newRight
      );
    } else {
      newRight = new BSTNode(key, value);
      newNode = new BSTNode(
        this.key, 
        this.value, 
        this.left, 
        newRight
      );
    }
  }
  if (Math.abs(newNode.balance) === 2) {
    newNode = newNode.correctBalance();
  }

  return newNode;
};

BSTNode.prototype.correctBalance = function () {
  var newLeft, newRight, newRoot;
  if (this.balance === -2) {
    if (this.left.balance === -1 || this.left.balance === 0) {
      return this.rightRotate();
      // This case requires a double rotation
    } else if (this.left.balance === 1) {
      newLeft = this.left.leftRotate();
      newRoot = new BSTNode(
        this.key, 
        this.value, 
        newLeft, 
        this.right
      );
      return newRoot.rightRotate();
    }
  } else if (this.balance === 2) {
    if (this.balance === 2) {
      if (this.right.balance === 1 || this.right.balance === 0) {
        return this.leftRotate();
        // This also requires a double rotation
      } else if (this.right.balance === -1) {
        newRight = this.right.rightRotate();
        newRoot = new BSTNode(
          this.key, 
          this.value, 
          this.left, 
          newRight
        );
        return newRoot.leftRotate();
      }
    }
  }
};

BSTNode.prototype.leftRotate = function () {
  if (!this.right) {
    throw 'There is no right child!';
  }
  var newLeft = new BSTNode(
    this.key,
    this.value,
    this.left,
    this.right.left
  );
  var newRoot = new BSTNode(
    this.right.key,
    this.right.value,
    newLeft,
    this.right.right
  );

  return newRoot;
};

BSTNode.prototype.rightRotate = function () {
  if (!this.left) {
    throw 'There is no left child!';
  }
  var newRight = new BSTNode(
    this.key,
    this.value,
    this.left.right,
    this.right
  );
  var newRoot = new BSTNode(
    this.left.key,
    this.left.value,
    this.left.left,
    newRight
  );

  return newRoot;
};

BSTNode.prototype.get = function (key) {
  if (this.key === key) {
    return this.value;
  } else if (this.key > key && this.left) {
    return this.left.get(key);
  } else if (this.key < key && this.right) {
    return this.right.get(key);
  }

  return null;
};

BSTNode.prototype.hasKey = function (key) {
  if (this.key === key) {
    return true;
  } else if (this.key > key && this.left) {
    return this.left.hasKey(key);
  } else if (this.key < key && this.right) {
    return this.right.hasKey(key);
  }

  return false;
};
