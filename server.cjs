const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'app');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  const routes = { '/': 'index.html', '/products': 'products.html', '/cart': 'cart.html', '/checkout-success': 'checkout-success.html' };
  const relative = routes[pathname] || pathname.replace(/^\//, '');
  const file = path.resolve(root, relative);

  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }

  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Westay evaluation running at http://127.0.0.1:${port}`));
