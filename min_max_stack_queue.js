function MinMaxStack () {
  this.values = [];
}

// O(1) time
MinMaxStack.prototype.push = function (value) {
  if (this.values.length === 0) {
    this.values.push({
      value: value,
      min: value,
      max: value
    });
  } else {
    this.values.push({
      value: value,
      min: [this.values[this.values.length - 1].min, value].
        sort(function (a,b) {
          return a - b;
        })[0],
      max: [this.values[this.values.length - 1].max, value].
        sort(function (a,b) {
          return a - b;
        })[1]
    });
  }

  return null;
};

// O(1) time
MinMaxStack.prototype.pop = function () {
  if (this.values.length === 0) {
    return null;
  } else {
    return this.values.pop().value;
  }
};

MinMaxStack.prototype.length = function () {
  return this.values.length;
};

MinMaxStack.prototype.max = function () {
  if (this.values.length > 0) {
    return this.values[this.values.length - 1].max;
  } else {
    return null;
  }
};

MinMaxStack.prototype.min = function () {
  if (this.values.length > 0) {
    return this.values[this.values.length - 1].min;
  } else {
    return null;
  }
};

function MinMaxStackQueue () {
  this.in = new MinMaxStack();
  this.out = new MinMaxStack();
}

// O(1) time
MinMaxStackQueue.prototype.enqueue = function (value) {
  this.in.push(value);
  return null;
};

// Ammortized O(1) time.  Worst Case O(n) time
MinMaxStackQueue.prototype.dequeue = function () {
  if (this.out.length() !== 0) {
    return this.out.pop();
  } else if (this.in.length() > 0) {
    while (this.in.length() > 0) {
      this.out.push(this.in.pop());
    }
  } else {
    return null;
  }

  return this.out.pop();
};

MinMaxStackQueue.prototype.length = function () {
  return this.in.length() + this.out.length();
};

MinMaxStackQueue.prototype.min = function () {
  if (this.length() === 0) {
    return null;
  }
  if (this.in.min() !== null && this.out.min() !== null) {
    return [this.in.min(), this.out.min()].sort(function (a, b) {
      return a - b;
    })[0];
  } else if (this.in.min() !== null) {
    return this.in.min();
  } else {
    return this.out.min();
  }
};

MinMaxStackQueue.prototype.max = function () {
  if (this.length() === 0) {
    return null;
  }
  if (this.in.max() !== null && this.out.max() !== null) {
    return [this.in.max(), this.out.max()].sort(function (a, b) {
      return a - b;
    })[1];
  } else if (this.in.max() !== null) {
    return this.in.max();
  } else {
    return this.out.max();
  }
};

function windowMaxRange(array, ws) {
  var queue = new MinMaxStackQueue();
  var maxRange = null;
  for (var i = 0; i < array.length; i++) {
    if (queue.length() < ws) {
      queue.enqueue(array[i]);
    }
    if (queue.length() === ws) {
      if (maxRange === null || maxRange < (queue.max() - queue.min())) {
        maxRange = (queue.max() - queue.min());
      }
      queue.dequeue();
    }
  }

  return maxRange;
}
