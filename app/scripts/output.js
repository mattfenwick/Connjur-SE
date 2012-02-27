
function Output($, schedule) {
    var m = {
        
        bruker: function(pts) {
            var lines = pts.map(function(pt) {return pt.join(" ");});
            var formatted = lines.join("\n"); // TODO is this the right newline character?
            return formatted;
        },
        
        varian: function(pts) {
            var lines = pts.map(function(pt) {
                decremented = pt.map(function(c) {return c - 1;});
                return decremented.join(" ");
            });
            var formatted = lines.join("\n"); // TODO is this the right newline character?
            return formatted;
        },
        
        asJSON: function(pts) {
            return JSON.stringify(pts);
        },
        
        toolkit: function(pts) {
            return m.bruker(pts); // TODO not right once we add in quadrature
        }
    };
    
    var formats = {
            'Bruker':   m.bruker,
            'Varian':   m.varian,
            'JSON':     m.asJSON,
            'Toolkit':  m.toolkit
    }
    
    m.addBehavior = function() {
    
        $("#viewText").click(function() {
            var format = $("#outputFormat").val();
            var func = formats[format];
            var formatted = func(schedule.getPoints().sort()); // TODO sort numerically
            $("#scheduleOut").val(formatted);
        });
    };
    
    return m;
}