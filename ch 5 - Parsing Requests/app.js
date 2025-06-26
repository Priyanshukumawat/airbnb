
// ****REQUEST RESPONSE SENDING TO THE SERVER***** & TAKING USER INPUT &REDIRECTING REQUESTS****

const http = require('http');
const requestHandler = require('./user');

const server = http.createServer(requestHandler);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server runnig on address http://localhost:${PORT}`)
});