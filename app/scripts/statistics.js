function averagePoints(schedule) {	
                var points = schedule.getPoints();
                var x=0;
                var y=0;
		for (var i = 0; i < points.length; i++) {
	         	x += points[i][0] ;
                 	y += points[i][1] ;
		}
                avX = x/points.length;
                avY = y/points.length;
return [avX, avY] ;
}


var colbertsfunctions = [averagePoints];

function addStatistics(schedule) {
	
    $("#refreshStatistics").click(function() {
        // get rid of the old content
    	$("#statsOutput").empty();
    	// call each of colbert's functions
    	for(var i = 0; i < colbertsfunctions.length; i++) {
    		f = colbertsfunctions[i];
    		// write a new element to the ul
    		$("#statsOutput").append("<li>" + f(schedule) + "</li>");
    	}
    });
}