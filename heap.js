function BinaryArrayHeap() {
  this.store = [];
}

BinaryArrayHeap.prototype.insert = function (val) {
  this.store.push(val);
  this._heapifyUp(this.store.length - 1);
  return val;
};

BinaryArrayHeap.prototype.extract = function () {
  if (this.store.length === 0) {
    return null;
  } else if (this.store.length === 1) {
    return this.store.pop();
  }
  var root = this.store[0];
  this.store[0] = this.store.pop();
  this._heapifyDown(0);
  return root;
};

BinaryArrayHeap.prototype._heapifyDown = function (startIdx) {
  var childIndices = _childIndices(startIdx);
  var smallestChildIdx = null;
  if (this.store[childIndices[1]] === undefined) {
    smallestChildIdx = childIndices[0];
  } else if (this.store[childIndices[0]] < this.store[childIndices[1]]) {
    smallestChildIdx = childIndices[0];
  } else {
    smallestChildIdx = childIndices[1];
  }
  if (smallestChildIdx &&
      (this.store[smallestChildIdx] < this.store[startIdx])) {
    var oldParent = this.store[startIdx];
    this.store[startIdx] = this.store[smallestChildIdx];
    this.store[smallestChildIdx] = oldParent;
  } else {
    return null;
  }

  this._heapifyDown(smallestChildIdx);
};

BinaryArrayHeap.prototype._heapifyUp = function (startIdx) {
  if (startIdx === 0) {
    return null;
  }
  var parentIdx = _parentIdx(startIdx);
  if (this.store[parentIdx] > this.store[startIdx]) {
    var oldParent = this.store[parentIdx];
    this.store[parentIdx] = this.store[startIdx];
    this.store[startIdx] = oldParent;
  } else {
    return null;
  }

  this._heapifyUp(parentIdx);
};

BinaryArrayHeap.prototype.randomHeap = function (size) {
  for (var i = 0; i < size; i++) {
    var randomNumber = Math.floor(Math.random() * 50);
    this.insert(randomNumber);
    console.log(randomNumber);
  }
};

var _childIndices = function (parentIdx) {
  var firstChildIdx = parentIdx * 2 + 1;
  var secondChildIdx = parentIdx * 2 + 2;
  return [firstChildIdx, secondChildIdx];
};

var _parentIdx = function (childIdx) {
  if (childIdx % 2 === 0) {
    return (childIdx - 2) / 2;
  } else {
    return (childIdx - 1) / 2;
  }
};
