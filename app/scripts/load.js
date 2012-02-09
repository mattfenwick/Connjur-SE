
function addLoad(schedule) {
    $('#chooseSched').change(function() { 
        var myid = $('#chooseSched').val();
        // popup a dialog saying 'loading'
        $.getJSON('/getschedule', {id: myid}, function(j) {
            // TODO dump the points into the chart
            //    is j an object or an array?
	        var pts = j["points"];
	        pts.map(function(pt) { schedule.addPoint(pt["location"]);} );
	        // close the dialog
        });
    });
}