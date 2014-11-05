var http = require("http");
var FilterObj = require("./FilterObj.js");

//processes the requests and delegates to the correct function
restserver.prototype.processRequest = function(req, res) {
//	console.log("process req...");
	var url = req.url;
//	console.log("resource is: " + url);
	var method = req.method;
//	console.log("method is: " + method);
	var found = false;
	for (var i = 0; i < this.filter.length; i++) {
		var fObj = this.filter[i];
		if (fObj.getT() == method && fObj.getK().test(url)) {
			this.filter[i].getF()(req, res);
			found = true;
			break;
		}
	}
	if (!found) {
		res.writeHead(404);
		res.write(url + " not known.");
	} 
	res.end();
}; 

//adds a new filter with an associated callback function
restserver.prototype.addRequestFilter = function(filterObj) {
	this.filter.push(filterObj);
};

restserver.prototype.remRequestFilter = function(regex) {
	for (var i = 0; i < this.filter.length; i++) {
		if (this.filter[i].getK() == regex) {
			if (i == 0)
				this.filter = this.filter.slice(1);
			else if (i == this.filter.length - 1)
				this.filter = this.filter.slice(0, -1);
			else
				this.filter = this.filter.slice(0, i).concat(this.filter.slice(i + 1));
		}
	}
};

restserver.prototype.printFilter = function() {
	console.log(this.filter);
};

restserver.prototype.start = function() {
	if (!this.isRunning && this.server) {
		this.server.listen(this.port);
		this.isRunning = true;
	}
};

restserver.prototype.close = function() {
	if (this.isRunning && this.server) {
//		this.server.getConnections(function(err, n) {
//			if (err) throw err;
//			for (var i = 0; i < n; i++) {
//				console.log("destroy");
//				this.server.connections[i].destroy();
//			}
//		});
		console.log("killing server");
		this.server.close(function() { console.log("server stops..."); });
		this.isRunning = false;
	}
};

//constructor
function restserver(port) {
	//default port == 8080
	this.port = 8080;
	this.server = null;
	this.isRunning = false;
	this.filter = [];
	
	if (port && +port > 0) 
		this.port = +port;
	
	var _parent = this;
	this.server = http.createServer(function(req, res) { _parent.processRequest(req, res); });
};

module.exports = restserver;
