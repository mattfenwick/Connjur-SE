
function Schedule(chart) {
    if (!(this instanceof arguments.callee)) {
        throw new Error("Constructor called as a function");
    }
    
    this.points = [];
    
    this.chart = chart;
    
}

Schedule.prototype.addPoint = function(pt) {
	if(this.points.length > 0) {
		if(this.points[0].length != pt.length) {
			throw new Error("point of bad dimensionality added");
		}
	}
	this.points.push(pt);
	this.chart.series[0].addPoint(pt);
}

Schedule.prototype.getPoints = function() {
	return this.points;
}

Schedule.prototype.setPoints = function(pts) {
	this.points = [];
	this.chart.series[0].setData([]);
	pts.map(function(pt) {this.addPoint(pt); });
}