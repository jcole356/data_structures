function BinaryArrayHeap() {
  this.store = [];
}

function _parentIdx(childIdx) {
  return Math.floor((childIdx - 1) / 2);
}

function _childIndices(parentIdx) {
  return [(parentIdx * 2) + 1, (parentIdx * 2) + 2];
}

function PriorityHashMap() {
  this.store = {};
  this.heap = new BinaryArrayHeap();
}

PriorityHashMap.prototype._insert = function (key, value, priority) {
  this.heap.store.push([key, value, priority]);
  this.store[key] = this.heap.store.length - 1;
  this.heapifyUp(this.heap.store.length - 1);
}

PriorityHashMap.prototype.get = function (key) {
  var idx = this.store[key];
  return this.heap.store[idx];
}

PriorityHashMap.prototype.hasKey = function (key) {
  if (this.store[key] !== undefined) {
    return true;
  } else {
    return false;
  }
}

PriorityHashMap.prototype.extract = function () {
  if (this.heap.store.length === 0) {
    return null;
  }
  var lowestPriority = this.heap.store[0];
  var lastElement = this.heap.store.pop()
  if (this.heap.store.length > 0) {
    this.heap.store[0] = lastElement;
    this.store[lastElement[0]] = 0;
    this.heapifyDown(0);
  }
  delete this.store[lowestPriority[0]];

  return lowestPriority;
}

PriorityHashMap.prototype._update = function (key, value, priority) {
  var idx = this.store[key];
  if (this.heap.store[idx][2] > priority) {
    this.heap.store[idx] = [key, value, priority];
    this.heapifyUp(idx);
    this.heapifyDown(0);
    return [key, value, priority];
  }
  return null;
}

PriorityHashMap.prototype.heapifyDown = function (parentIdx) {
  var smallestChildIdx;
  var childIndices = _childIndices(parentIdx);
  var parent = this.heap.store[parentIdx];
  if (childIndices[0] >= this.heap.store.length) {
    return null;
  } else if (childIndices[1] >= this.heap.store.length || this.heap.store[childIndices[0]][2] < this.heap.store[childIndices[1]][2]) {
    smallestChildIdx = childIndices[0];
  } else {
    smallestChildIdx = childIndices[1];
  }
  var smallestChild = this.heap.store[smallestChildIdx];
  if (this.heap.store[parentIdx][2] > this.heap.store[smallestChildIdx][2]) {
    this.store[smallestChild[0]] = parentIdx;
    this.store[parent[0]] = smallestChildIdx;
    this.heap.store[parentIdx] = this.heap.store[smallestChildIdx];
    this.heap.store[smallestChildIdx] = parent;
  }
  this.heapifyDown(smallestChildIdx);
}

PriorityHashMap.prototype.heapifyUp = function (childIdx) {
  var parentIdx = _parentIdx(childIdx);
  var parent = this.heap.store[parentIdx];
  var child = this.heap.store[childIdx];
  if (parentIdx < 0 || this.heap.store[parentIdx][2] < this.heap.store[childIdx][2]) {
    return null;
  } else {
    this.store[child[0]] = parentIdx;
    this.store[parent[0]] = childIdx;
    this.heap.store[parentIdx] = this.heap.store[childIdx];
    this.heap.store[childIdx] = parent;
  }
  this.heapifyUp(parentIdx);
}

PriorityHashMap.prototype.set = function (key,value,priority) {
  if (this.hasKey(key)) {
    return this._update(key, value, priority);
  } else {
    return this._insert(key, value, priority);
  }
}

function buildRandomHashMap(n) {
  var map = new PriorityHashMap();
  var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  for (var i = 0; i < n; i++) {
    var randomNum = Math.floor(Math.random() * 9) + 1;
    console.log(letters[i]);
    console.log(randomNum);
    map.set(letters[i], randomNum, randomNum);
  }

  return map;
}
