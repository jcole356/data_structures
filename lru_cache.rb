require './doubly_linked_list'

class LRUCache
  attr_reader :map, :list

  def initialize(max_size)
    @map = {}
    @list = LinkedList.new
    @max_size = max_size
  end

  def insert(key, value)
    if @map.count == @max_size
      evict
    end
    @map[key] = @list.push(Link.new(key,value))
  end

  # Should this all start with get?
  # What should get actually return?
  def get(key)
    if !@map[key]
      raise "This key does not exist!"
    end
    link = @map[key]
    new_link = Link.new(link.key, link.value)
    @list.remove(link)
    @list.push(new_link)
    @map[key] = new_link
    return new_link.value
  end

  def evict
    oldest = @list.shift
    @map.delete(oldest.key)
  end
end

cache = LRUCache.new(4)
cache.insert(2,4)
cache.insert(3,9)
cache.insert(4,16)
cache.insert(5,25)
p cache.get(4)
cache.insert(6,36)
p cache.get(3)
p cache.get(4)
p cache.get(5)
p cache.get(2)
