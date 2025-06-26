

// ****REQUEST RESPONSE SENDING TO THE SERVER****

const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Priyanshu Node Coding</title></head>');
    res.write('<body><h1>Coding Is Fun you are on home page</h1></body>');
    res.write('</html>');
    return res.end();

  } else if (req.url === '/products') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Priyanshu Node Coding</title></head>');
    res.write('<body><h1>Coding Is Fun you are on PRODUCTS page</h1></body>');
    res.write('</html>');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Priyanshu Node Coding</title></head>');
  res.write('<body><h1>Coding Is Fun</h1></body>');
  res.write('</html>');
  res.end();

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server runnig on address http://localhost:${PORT}`)
});

