
// ****practice set 1 - create a page that shows a navigation bar of myntra with the following links: home,men,women,kids,cart & clicking on each link page should navigate to that page and a welcome to section text is shown there.****

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Myntra</title></head>');
    res.write('<body><h1>Welcome to the myntra home page</h1>');
    res.write('<nav><a href="/">Home</a> | <a href="/men">Men</a> | <a href="/women">Women</a> |<a href="/kids">Kids</a> |<a href="/cart">Cart</a> </nav>');


    res.write('</body>');
    res.write('</html>');
    return res.end();

  } else if (req.url.toLowerCase() === '/men') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><h1>Welcome to mens section</h1></body>');
    res.write('</html>');
    return res.end();


  } else if (req.url.toLowerCase() === '/women') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><h1>Welcome to womens section</h1></body>');
    res.write('</html>');
    return res.end();


  } else if (req.url.toLowerCase() === '/kids') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><h1>Welcome to kids section</h1></body>');
    res.write('</html>');
    return res.end();


  } else if (req.url.toLowerCase() === '/cart') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><h1>Welcome to cart section</h1></body>');
    res.write('</html>');
    return res.end();


  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Myntra page</title></head>');
  res.write('<body><h1>Please choose the correct url</h1></body>');
  res.write('</html>');
  res.end();

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server runnig on address http://localhost:${PORT}`)
});