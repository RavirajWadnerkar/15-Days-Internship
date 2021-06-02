var http = require('http');

http.createServer(function(req,res){
    res.end("Welcome to Node JS");
}).listen(3000);
//http://127.0.0.1:3000 refers to local host
console.log('Server started on port 3000');