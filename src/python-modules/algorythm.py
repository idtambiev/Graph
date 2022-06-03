import math

edgesList = []
dist = []

class Edge():
  def __init__(self, edgeStart, edgeEnd, weight):
    self.edgeStart = edgeStart
    self.edgeEnd = edgeEnd
    self.weight = weight

edgesList.append(Edge(1,2,0.1))


def main(count):
  verticesCount = count
  start = 1

  for i in range(verticesCount):
      var = 0 if i==0 else math.inf
      dist.append(var)
  print(dist)

  for i in range(1, verticesCount-1):
    for j in range(0, len(edgesList)):
      u = edgesList[j].edgeStart
      v = edgesList[j].edgeEnd
      weight = edgesList[j].weight

      if dist[u]!= math.inf and dist[u] + weight < dist[v]:
        dist[v] = dist[u] + weight

  print(dist)


main(10)
