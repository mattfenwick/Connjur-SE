

function Save($, schedule) {
    var m = {
        onSuccess: function (res) {
            if("success" in res) {
                // change dialogs to jqueryui
                alert("success: " + res.success);
            } else {
                alert("failed: " + res.error); // if we gave it bad data
            }
        },
        
        onError: function(resp) {
            alert("ajax http request failed: " + resp);
        }
    };
    
    m.addBehavior = function() {
        $("#saveSchedule").click(function() {
            var formatted = JSON.stringify({"points": schedule.getPoints()});
            var auth = $("#author").val();
            var desc = $("#description").val();
            // popup a dialog saying 'saving' ----------------------- //////
            $.ajax({
                url:       '/saveschedule', 
                type:      'POST',
                dataType:  'json',
                data:      {'schedulestring': formatted,
                            'author':         auth,
                            'description':    desc},
                success:   m.onSuccess,
                error:     m.onError,  // if the http request fails
                timeout:   2000 // is this long enough?
            });
        });
    };
    
    return m;
}