

function Load($, schedule) {
    var m = {
        onSuccess: function(j) {
            // TODO dump the points into the chart
            var pts = j["points"];
            pts.map(function(pt) { schedule.addPoint(pt["location"]);} );
            // close the dialog
        },
        
        onError: function(resp) {
            alert("error getting schedule: " + resp);
        }
    };
    
    m.addBehavior = function() {
        $('#chooseSched').change(function() {
            var myid = $('#chooseSched').val();
            // popup a dialog saying 'loading'            
            $.ajax({
                url:       '/getschedule', 
                type:      'GET',
                dataType:  'json',
                data:      {'id': myid},
                success:   m.onSuccess,
                error:     m.onError,  // if the http request fails
                timeout:   2000 // is this long enough?
            });
        });
    };
    
    return m;
}