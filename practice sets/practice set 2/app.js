
/*****practice set 2 - create a calculator.
1. create a new node.js project named "calculator".
2. On the home page (route"/"), show a welcome message and a link to the calculator page.
3. on the "/calculator" page, display a form with two input fields and a "sum" button.
4. when the user clicks the "sum" button, they should be taken to the "/calculate-result" page, which shows the sum of the two numbers.
#make sure the request goes to the server.
#create a seperate module for the addition function.
#create another module to handle the incoming requests.
#on the "/calculate-result" page,parse the user input, use the addition module to calculate the sum, and display the reault on a new html page.****
*/

const http = require('http');
const { requestHandler } = require('./handler');
const server = http.createServer(requestHandler);

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`server running on the address http://localhost:${PORT}`)
})