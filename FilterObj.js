FilterObj.prototype.getT = function() {
	return this.t;
};

FilterObj.prototype.getF = function()  {
	return this.f;
};

FilterObj.prototype.getK = function()  {
	return this.k;
};

function FilterObj(t, k, f) {
	this.t = t;
	this.k = k;
	this.f = f;
};

module.exports = FilterObj;
