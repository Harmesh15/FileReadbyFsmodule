const http = require('http');
const routes = require("./routes");

const server = http.createServer(routes);



let PORT = 3000;
server.listen(PORT,()=>console.log("helllo from server"));