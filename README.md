restificant
===========

nodejs easy rest server module

Install
=======

npm install restificant

Usage
=====

```
//import the module
var restserver = require("restificant");
var FilterObj = require("restificant/FilterObj");

//will get executed at "POST" requests to /apitest 
function apitest(req, res) {
        console.log(req.url);
        res.end("apitest");
};

//will get executed at "GET" requests to /killServer
function killServer(req, res) {
        res.end("stopping server");
        rs.close();
	process.exit(0);
}

//1234 => Listinig port
var rs = new restserver(1234);
//gets triggered if "POST" request to /apitest, third argument is the method the should get called
// methode gets exactly two parameters. the request and the response obj ;-)
rs.addRequestFilter(new FilterObj("POST", /\/apitest/g, apitest));
rs.addRequestFilter(new FilterObj("GET", /\/killServer/g, killServer));
//starts the server to listen
rs.start();
```
