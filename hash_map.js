String.prototype.hash = function() {
  var hash = 0;
  for (var i = 0; i < this.length; i++) {
    hash += this.charCodeAt(i);
  }

  return hash;
};

function HashMap() {
  this.store = new Array(4);
  for (var i = 0; i < this.store.length; i++) {
    this.store[i] = [];
  }
  this.capacity = 4;
  this.items = 0;
}

HashMap.prototype.get = function (key) {
  var bucket = this.store[key.hash() % this.capacity];
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === key) {
      return bucket[i][1];
    }
  }

  return null;
};

HashMap.prototype.set = function (key, value) {
  var bucket = this.store[key.hash() % this.capacity];
  if (this.get(key)) {
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return value;
      }
    }
  }
  if (this.items === this.capacity) {
    this.resize();
  }
  bucket = this.store[key.hash() % this.capacity];
  bucket.push([key, value]);
  this.items += 1;
  return value;
};

HashMap.prototype.resize = function () {
  this.capacity = this.capacity * 2;
  var oldStore = this.store;
  this.store = new Array(this.capacity);
  for (var i = 0; i < this.store.length; i++) {
    this.store[i] = [];
  }
  oldStore.forEach(function (bucket) {
    bucket.forEach(function (pair) {
      this.set(pair[0], pair[1]);
    }, this);
  }, this);
};
