function heapSort(arr) {
  var heapSize = 0;
  for (var i = 0; i < arr.length; i++) {
    heapSize++;
    heapifyUp(arr, heapSize - 1);
  }
  for (var j = 0; j < arr.length; j++) {
    var root = arr[0];
    heapSize--;
    arr[0] = arr[heapSize];
    arr[heapSize] = root;
    heapifyDown(arr, 0, heapSize);
  }

  return arr;
}

function _parentIdx(childIdx) {
  if (childIdx % 2 === 1) {
    return ((childIdx - 1) / 2);
  } else {
    return ((childIdx - 2) / 2);
  }
}

function heapifyUp(arr, childIdx) {
  var parentIdx = _parentIdx(childIdx);
  var child = arr[childIdx];
  if (childIdx === 0) {
    return null;
  }
  if (arr[parentIdx] > arr[childIdx]) {
    arr[childIdx] = arr[parentIdx];
    arr[parentIdx] = child;
  }
  heapifyUp(arr, parentIdx);
}

function _childIndices(parentIdx) {
  return [(parentIdx * 2) + 1, (parentIdx * 2) + 2];
}

function heapifyDown(arr, parentIdx, heapSize) {
  var smallestChildIdx = null;
  var parent = arr[parentIdx];
  var childIndices = _childIndices(parentIdx);
  if (childIndices[0] >= heapSize) {
    return null;
  }
  if (childIndices[1] >= heapSize) {
    smallestChildIdx = childIndices[0];
  } else if (arr[childIndices[0]] <= arr[childIndices[1]]) {
    smallestChildIdx = childIndices[0];
  } else {
    smallestChildIdx = childIndices[1];
  }
  if (arr[parentIdx] > arr[smallestChildIdx]) {
    arr[parentIdx] = arr[smallestChildIdx];
    arr[smallestChildIdx] = parent;
  }
  heapifyDown(arr, smallestChildIdx, heapSize);
}

function randomArray(size) {
  var array = [];
  for (var i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (20 - 1) + 1));
  }
  return array;
}

// console.log(heapSort([3,2,4,1,9,7,8]));
console.log(heapSort(randomArray(7)));
