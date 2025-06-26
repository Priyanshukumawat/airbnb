const sumRequestHandler = (req, res) => {
  console.log("In sum request handler", req.url);
  const body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', () => {
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    const result = Number(bodyObj.first) + Number(bodyObj.second);
    console.log('result:', result);
    res.setHeader('content-Type', 'text/html');
    res.write(`
      <html>
      <head><title>Calculator</title></head>
      <body>
        <h1>Your Sum is ${result}</h1>
      </body>
      </html>
      `);
    return res.end();
  });

}

exports.sumRequestHandler = sumRequestHandler;