function Link(value, next) {
  this.value = value;
  this.next = next;
}

function LinkedList() {
  this.head = null;
}

LinkedList.prototype.delete = function (link) {
  if (!this.head) {
    return null;
  }
  if (this.head === link) {
    this.head = this.head.next;
    return link.value;
  }
  var current_link = this.head;
  while (current_link.next) {
    if (current_link.next === link) {
      current_link.next = current_link.next.next;
      return link.value;
    }
  }

  return null;
};

LinkedList.prototype.delete_at = function (idx) {
  if (!this.head) {
    return null;
  }
  if (idx === 0) {
    this.head.next = null;
    return this.head.value;
  }
  var current_link = this.head;
  for (var i = 0; i < idx - 1; i++) {
    if (current_link.next.next) {
      current_link = current_link.next;
    } else {
      return null;
    }
  }
  var oldNext = current_link.next;
  current_link.next = current_link.next.next;

  return oldNext.value;
};

LinkedList.prototype.insert = function (val, idx) {
  if (!this.head) {
    return null;
  }
  if (idx === 0) {
    this.head = new Link(val, this.head);
    return null;
  }
  var current_link = this.head;
  for (var i = 0; i < idx - 1; i++) {
    if (!current_link.next) {
      current_link = current_link.next;
    } else {
      return null;
    }
  }
  var oldNext = current_link.next;
  current_link.next = new Link(val, current_link.next.next);
  current_link.next.next = oldNext;

  return null;
};

LinkedList.prototype.pop = function () {
  if (!this.head) {
    return null;
  } else if (!this.head.next) {
    var oldHead = this.head;
    this.head = null;
    return oldHead.value;
  }
  var current_link = this.head;
  while (current_link.next.next) {
    current_link = current_link.next;
  }
  var lastLink = current_link.next;
  current_link.next = null;

  return lastLink.value;
};

LinkedList.prototype.push = function (val) {
  if (!this.head) {
    this.head = new Link(val, null);
    return null;
  }
  var current_link = this.head;
  while (current_link.next) {
    current_link = current_link.next;
  }
  current_link.next = new Link(val, null);

  return null;
};

LinkedList.prototype.shift = function () {
  if (!this.head) {
    return null;
  } else {
    var link = this.head;
    this.head = link.next;

    return link.value;
  }
};

LinkedList.prototype.unshift = function (val) {
  if (!this.head) {
    this.head = new Link(val, null);
    return null;
  } else {
    this.head = new Link(val, this.head);

    return null;
  }
};
