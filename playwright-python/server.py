from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


APP_DIRECTORY = Path(__file__).resolve().parent.parent / "app"
ROUTES = {
    "/": "/index.html",
    "/products": "/products.html",
    "/cart": "/cart.html",
    "/checkout-success": "/checkout-success.html",
}


class ApplicationHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(APP_DIRECTORY), **kwargs)

    def do_GET(self):
        self.path = ROUTES.get(self.path, self.path)
        super().do_GET()

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4174), ApplicationHandler)
    print("Westay evaluation running at http://127.0.0.1:4174")
    server.serve_forever()
