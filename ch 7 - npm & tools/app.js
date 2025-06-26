
// ****REQUEST RESPONSE SENDING TO THE SERVER***** & TAKING USER INPUT &REDIRECTING REQUESTS****

const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
})

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server runnig on address http://localhost:${PORT}`)
});