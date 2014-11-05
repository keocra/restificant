var restserver = require("./rest-server.js");
var FilterObj = require("./FilterObj.js");

function apitest(req, res) {
	console.log(req.url);
	res.end("apitest");
};

function killServer(req, res) {
	res.end("stopping server");
	rs.close();
}

var rs = new restserver(1234);
rs.addRequestFilter(new FilterObj("POST", /\/apitest/g, apitest));
rs.addRequestFilter(new FilterObj("GET", /\/killServer/g, killServer));
rs.start();
