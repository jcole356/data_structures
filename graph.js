function Vertex(value) {
  this.value = value;
  this.inEdges = [];
  this.outEdges = [];
}

function Edge(startVertex, endVertex, value) {
  this.startVertex = startVertex;
  this.endVertex = endVertex;
  this.value = value || null;
  this.startVertex.outEdges.push(this);
  this.endVertex.inEdges.push(this);
}

function topoSort(vertices) {
  var dependencies = {};
  var queue = [];
  var results = [];
  vertices.forEach(function (vertex) {
    if (vertex.inEdges.length === 0) {
      queue.push(vertex);
    }
    dependencies[vertex.value] = vertex.inEdges.length;
  });
  while (queue.length > 0) {
    var vertex = queue.shift();
    vertex.outEdges.forEach(function (edge) {
      dependencies[edge.endVertex.value]--;
      if (dependencies[edge.endVertex.value] === 0) {
        queue.push(edge.endVertex);
      }
    });
    results.push(vertex);
  }

  return results;
}

a = new Vertex("A");
b = new Vertex("B");
c = new Vertex("C");
d = new Vertex("D");
e = new Vertex("E");
e1 = new Edge(a, b);
e2 = new Edge(a, c);
e3 = new Edge(e, c);
e4 = new Edge(b, d);
e5 = new Edge(c, d);
