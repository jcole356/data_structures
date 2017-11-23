function Vertex(key, value, priority) {
  this.key = key;
  this.value = value || null;
  // The or = doesn't work with 0 because it is falsey
  this.priority = priority;
  this.inEdges = [];
  this.outEdges = [];
}

function Edge(startVertex, endVertex, weight){
  this.startVertex = startVertex;
  this.endVertex = endVertex;
  this.weight = weight;
  this.startVertex.outEdges.push(this);
  this.endVertex.inEdges.push(this);
}

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

PriorityHashMap.prototype._insert = function (key, value, priority, vertex) {
  var vertex = vertex || new Vertex(key, value, priority);
  this.heap.store.push(vertex);
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
    this.store[lastElement.key] = 0;
    this.heapifyDown(0);
  }
  delete this.store[lowestPriority.key];

  return lowestPriority;
}

PriorityHashMap.prototype._update = function (key, value, priority) {
  var idx = this.store[key];
  if (this.heap.store[idx].priority > priority) {
    var vertex = this.heap.store[idx];
    vertex.key = key;
    vertex.value = value;
    vertex.priority = priority;
    this.heapifyUp(idx);
    this.heapifyDown(0);
    return vertex;
  }
  return null;
}

PriorityHashMap.prototype.heapifyDown = function (parentIdx) {
  var smallestChildIdx;
  var childIndices = _childIndices(parentIdx);
  var parent = this.heap.store[parentIdx];
  if (childIndices[0] >= this.heap.store.length) {
    return null;
  } else if (childIndices[1] >= this.heap.store.length ||
             this.heap.store[childIndices[0]].priority <
             this.heap.store[childIndices[1]].priority) {
    smallestChildIdx = childIndices[0];
  } else {
    smallestChildIdx = childIndices[1];
  }
  var smallestChild = this.heap.store[smallestChildIdx];
  if (this.heap.store[parentIdx].priority >
      this.heap.store[smallestChildIdx].priority)
  {
    this.store[smallestChild.key] = parentIdx;
    this.store[parent.key] = smallestChildIdx;
    this.heap.store[parentIdx] = this.heap.store[smallestChildIdx];
    this.heap.store[smallestChildIdx] = parent;
  }
  this.heapifyDown(smallestChildIdx);
}

PriorityHashMap.prototype.heapifyUp = function (childIdx) {
  var parentIdx = _parentIdx(childIdx);
  var parent = this.heap.store[parentIdx];
  var child = this.heap.store[childIdx];
  if (parentIdx < 0 ||
      this.heap.store[parentIdx].priority <
      this.heap.store[childIdx].priority)
  {
    return null;
  } else {
    this.store[child.key] = parentIdx;
    this.store[parent.key] = childIdx;
    this.heap.store[parentIdx] = this.heap.store[childIdx];
    this.heap.store[childIdx] = parent;
  }
  this.heapifyUp(parentIdx);
}

PriorityHashMap.prototype.set = function (key, value, priority, vertex) {
  if (this.hasKey(key)) {
    return this._update(key, value, priority);
  } else {
    return this._insert(key, value, priority, vertex);
  }
}

function dijkstras(vertices, startVertex) {
  var queue = new PriorityHashMap();
  var shortestPaths = {};
  vertices.forEach(function (vertex) {
    if (vertex === startVertex) {
      vertex.priority = 0;
    } else {
      vertex.priority = Infinity;
    }
    queue.set(vertex.key, vertex.value, vertex.priority , vertex);
  });
  while (queue.heap.store.length > 0) {
    var currentVertex = queue.extract();
    shortestPaths[currentVertex.key] = currentVertex.priority;
    // Need conditional in case last edge points back to the first edge
    // again.
    if (queue.heap.store.length > 0) {
      currentVertex.outEdges.forEach(function (edge) {
        queue.set(edge.endVertex.key, edge.endVertex.value,
                  shortestPaths[currentVertex.key] + edge.weight);
      });
    }
  }

  return shortestPaths;
}


// Make an array of vertices with edges
function buildGraph() {
  var vertices = [];
  for (var i = 1; i < 7; i++) {
    vertices.push(new Vertex(i, i));
  }
  new Edge(vertices[0], vertices[5], 14);
  new Edge(vertices[5], vertices[4],  9);
  new Edge(vertices[4], vertices[3],  6);
  new Edge(vertices[3], vertices[1], 15);
  new Edge(vertices[1], vertices[0],  7);
  new Edge(vertices[0], vertices[2],  9);
  new Edge(vertices[1], vertices[2], 10);
  new Edge(vertices[2], vertices[5],  2);
  new Edge(vertices[2], vertices[3], 11);

  return vertices;
}


// This will need to be rewritten
// Lets make this build a fancy graph
// function buildRandomHashMap(n) {
//   var map = new PriorityHashMap();
//   var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
//   for (var i = 0; i < n; i++) {
//     var randomNum = Math.floor(Math.random() * 9) + 1;
//     console.log(letters[i]);
//     console.log(randomNum);
//     map.set(letters[i], randomNum, randomNum);
//   }
//
//   return map;
// }
