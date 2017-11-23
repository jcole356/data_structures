function PriorityHashMap() {
  this.store = {};
}

PriorityHashMap.prototype._insert = function (key, value, priority) {
  this.store[key] = [value, priority];
}

PriorityHashMap.prototype.get = function (key) {
  return this.store[key];
}

PriorityHashMap.prototype.hasKey = function (key) {
  if (this.store[key]) {
    return true;
  } else {
    return false;
  }
}

PriorityHashMap.prototype.extract = function () {
  var lowestPriority = null;
  var lowestPriorityKey = null;
  for (key in this.store) {
    if (lowestPriority === null || this.store[key][1] > lowestPriority) {
      lowestPriority = this.store[key][1];
      lowestPriorityKey = key;
    }
  }
  delete this.store[lowestPriorityKey];
  return lowestPriorityKey;
}

PriorityHashMap.prototype._update = function (key, value, priority) {
  if (priority < this.store[key][1]) {
    this.store[key] = [value, priority];
  }
}

PriorityHashMap.prototype.set = function (key, value, priority) {
  if (this.hasKey(key)) {
    this._update(key, value, priority);
  } else {
    this._insert(key, value, priority);
  }
}
