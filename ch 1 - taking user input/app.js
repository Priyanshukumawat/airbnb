
// ****REQUEST RESPONSE SENDING TO THE SERVER***** & TAKING USER INPUT &REDIRECTING REQUESTS****

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Priyanshu Node Coding</title></head>');
    res.write('<body><h1>Enter your details :</h1>');
    res.write('<form action="/submit-details" method="POST">');
    res.write('<input type="text" id"name" name="name" placeholder="Enter your name"><br><br></input>');
    res.write('<label for="gender">Gender:</label>');
    res.write('<input type="radio" id="male" name="gender" value="male"></input>');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="female" name="gender" value="female"></input>');
    res.write('<label for="female">Female</label><br><br>');
    res.write('<button type="submit">Submit</button>');
    res.write('</form>');


    res.write('</body>');
    res.write('</html>');
    return res.end();

  } else if (req.url.toLowerCase() === "/submit-details" && req.method == "POST") {
    fs.writeFileSync('user.txt', 'Priyanshu Kumawat');
    res.statusCode = 302;
    res.setHeader('Location', '/')
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