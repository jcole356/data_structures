class Link
  attr_reader :key, :value
  attr_accessor :prev, :next

  def initialize(key, value)
    @key = key
    @value = value
    @prev = nil
    @next = nil
  end
end

class LinkedList
  def initialize
    @head = nil
    @tail = nil
  end

  def push(link)
    if !@head && !@tail
      @head = link
      @tail = link
    else
      @tail.next = link
      link.prev = @tail
      @tail = link
    end
    @tail
  end

  def shift
    if !@head
      return nil
    elsif @head == @tail
      old_head = @head
      @head = nil
      @tail = nil
    else
      old_head = @head
      @head = old_head.next
      @head.prev = nil
      old_head.next = nil
    end

    old_head
  end

  def remove(link)
    if link == @head
      shift
    elsif link == @tail
      # Shift will handle the case where the head == tail.
      @tail = @tail.prev
      @tail.next = nil
      link.prev = nil
    else
      link.prev.next = link.next
      link.next.prev = link.prev
      link.next = nil
      link.prev = nil
    end
  end
end
