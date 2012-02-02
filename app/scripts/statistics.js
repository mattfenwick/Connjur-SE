
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