
function averagePoints(schedule) {    
    var points = schedule.getPoints();
    var x = 0;
    var y = 0;
    for(var i = 0; i < points.length; i++) {
        x += points[i][0];
        y += points[i][1];
    }
    var avX = x / points.length;
    var avY = y / points.length;
    return [avX, avY];
}

function totalPoints(schedule) {
	return schedule.getPoints().length;
}


var statsFuncs = {"average coordinates": averagePoints,
		          "total points": totalPoints};


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