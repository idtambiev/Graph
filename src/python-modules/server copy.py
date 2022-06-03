import cgi
from dis import dis
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler

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

    self.send_response(301)
    self.send_header('content-type', 'text/html')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()
    self.wfile.write()


def main():
  PORT = 8000
  server = HTTPServer(('', PORT), echoHandler)
  print("server running on port 8000")
  server.serve_forever()

if __name__ == '__main__':
  main()
