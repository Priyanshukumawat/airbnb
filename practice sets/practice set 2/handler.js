const { sumRequestHandler } = require('./sum');

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === '/') {
    res.setHeader('content-Type', 'text/html');
    res.write(`
      <html>
      <head><title>Calculator</title></head>
      <body>
        <h1>Welcome to the calculator app</h1>
        <a href="/calculator">Go To Calculator</a>
      </body>
      </html>
      `);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader('content-Type', 'text/html');
    res.write(`
      <html>
      <head><title>Calculator</title></head>
      <body>
        <h1>Welcome to the CALCULATOR app</h1>
        <form action="/calculate-result" method="POST">
          <input type="text" placeholder="First Num" name="first">
          <input type="text" placeholder="Second Num" name="second">
          <input type="submit" value="Sum">
        </form>
      </body>
      </html>
      `);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculate-result" && req.method === 'POST') {
    return sumRequestHandler(req, res);

  }

  res.setHeader('content-Type', 'text/html');
  res.write(`
      <html>
      <head><title>Calculator</title></head>
      <body>
        <h1>404 Page does not exist</h1>
        <a href="/">Go To Home</a>
      </body>
      </html>
      `);
  return res.end();

}

exports.requestHandler = requestHandler;