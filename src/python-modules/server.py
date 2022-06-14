from argparse import Namespace
import cgi
from dis import dis
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
import json
import math

dist = []
edges = []

class Edge():
  def __init__(self, startIdx, edgeStart, endIdx, edgeEnd, weight):
    self.startIdx = startIdx
    self.endIdx = endIdx
    self.edgeStart = edgeStart
    self.edgeEnd = edgeEnd
    self.weight = weight

def algorythm(count, start):
  verticesCount = count
  dist.clear()

  for i in range(verticesCount):
      var = 0 if i==start else math.inf
      dist.append(var)

  for i in range(1, verticesCount-1):
    for j in range(0, verticesCount):
      u = edges[j].startIdx
      v = edges[j].endIdx
      weight = edges[j].weight

      if dist[u]!= math.inf and dist[u] + weight < dist[v]:
        dist[v] = dist[u] + weight



class echoHandler(SimpleHTTPRequestHandler):
  def do_GET(self):
    self.send_response(200)
    self.send_header('content-type', 'text/html')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()
    self.wfile.write('Hello'.encode())

  def do_POST(self):
    ctype, pdict = cgi.parse_header(self.headers.get('content-type'))
    pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
    content_len = int(self.headers.get('Content-length'))
    pdict['CONTENT-LENGTH'] = content_len
    if ctype == 'multipart/form-data':
      edges.clear()
      fields = cgi.parse_multipart(self.rfile, pdict)
      new_Elements = fields.get('edges')
      count =  int(fields.get('count')[0])
      start =  int(fields.get('start')[0])
      edges.extend(json.loads(new_Elements[0], object_hook=lambda d: Namespace(**d)))
      algorythm(count, start)

    self.send_response(200)
    self.send_header('content-type', 'text/html')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()
    self.wfile.write(json.dumps(dist).encode())


def main():
  PORT = 8000
  server = HTTPServer(('', PORT), echoHandler)
  print("server running on port 8000")
  server.serve_forever()

if __name__ == '__main__':
  main()
