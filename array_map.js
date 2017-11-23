function ArrayMap() {
  this.store = [];
}

ArrayMap.prototype.get = function (key) {
  for (var i = 0; i < this.store.length; i++) {
    if (this.store[i][0] === key) {
      return "{" + this.store[i][0] + " => " + this.store[i][1] + "}";
    }
  }

  return null;
};

ArrayMap.prototype.set = function (key, value) {
  if (this.get(key)) {
    for (var i = 0; i < this.store.length; i++) {
      if (this.store[i][0] === key) {
        this.store[i][1] = value;
        return "{" + this.store[i][0] + " => " + this.store[i][1] + "}";
      }
    }
  } else {
    this.store.push([key, value]);
    return "{" + this.store[this.store.length - 1][0] + " => " +
      this.store[this.store.length - 1][1] + "}";
  }
};
