
function averageCoordinates(schedule) {    
    var points = schedule.getPoints();
    var xtotal = 0;
    var ytotal = 0;
    for(var i = 0; i < points.length; i++) {
        xtotal += points[i][0];
        ytotal += points[i][1];
    }
    var len = points.length;
    return [xtotal / len, ytotal / len];
}

function maxes(schedule) {
	var xs = [];
	var ys = [];
	schedule.getPoints().map(function(pt) {xs.push(pt[0]); ys.push(pt[1]);});
	return [Math.max.apply(null, xs), Math.max.apply(null, ys)];
}

function mins(schedule) {
	var xs = [];
	var ys = [];
	schedule.getPoints().map(function(pt) {xs.push(pt[0]); ys.push(pt[1]);});
	return [Math.min.apply(null, xs), Math.min.apply(null, ys)];
}

function totalPoints(schedule) {
	return schedule.getPoints().length;
}

function gridCoverage(schedule) {
	var mincs = mins(schedule);
	var maxcs = maxes(schedule);
	var tps = totalPoints(schedule);
	return (100 * tps) / ((maxcs[0] - mincs[0] + 1) * (maxcs[1] - mincs[1] + 1));
}


var statsFuncs = {"average coordinates":  averageCoordinates,
		          "total points":         totalPoints,
		          "maximum increments":   maxes,
		          "minimum increments":   mins,
		          "% coverage":           gridCoverage};


function addStatistics(schedule) {

    $("#refreshStatistics").click(function() {
        // get rid of the old content
        $("#statsOutput").empty();
        // call each stat function
        for(var key in statsFuncs) {
            var f = statsFuncs[key];
            // write a new element to the ul
            $("#statsOutput").append("<li>" + key + ": " + f(schedule) + "</li>");
        }
    });
}