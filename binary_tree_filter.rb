# I think this is basically it.
def bst_filter(vertex, min, max)
  return nil if vertex.nil?
  return vertex if vertex.value >= min && v.value <= max
  bst_filter(vertex.left, min, max) if vertex.value >= min
  bst_filter(vertex.right, min, max) if vertex.value <= max
end
