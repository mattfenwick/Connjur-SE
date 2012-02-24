
function Stats($) {

    var m = {
        averageCoordinates: function(points) {    
            var xtotal = 0;
            var ytotal = 0;
            for(var i = 0; i < points.length; i++) {
                xtotal += points[i][0];
                ytotal += points[i][1];
            }
            var len = points.length;
            return [xtotal / len, ytotal / len];
        },
        
        maxes: function(points) {
            var xs = [];
            var ys = [];
            points.map(function(pt) {xs.push(pt[0]); ys.push(pt[1]);});
            return [Math.max.apply(null, xs), Math.max.apply(null, ys)];
        },
        
        mins: function(points) {
            var xs = [];
            var ys = [];
            points.map(function(pt) {xs.push(pt[0]); ys.push(pt[1]);});
            return [Math.min.apply(null, xs), Math.min.apply(null, ys)];
        },
        
        totalPoints: function(points) {
            return points.length;
        },
        
        gridCoverage: function(points) {
            var maxcs = m.maxes(points);
            var tps = m.totalPoints(points);
            return (100 * tps) / (maxcs[0] * maxcs[1]);
        }
    };
    
    var statsFuncs = {"average coordinates":  m.averageCoordinates,
                      "total points":         m.totalPoints,
                      "maximum increments":   m.maxes,
                      "minimum increments":   m.mins,
                      "% coverage":           m.gridCoverage
    };
    
    m.addStatistics = function(schedule) {  
        $("#refreshStatistics").click(function() {
            // get rid of the old content
            $("#statsOutput").empty();
            // call each stat function
            for(var key in statsFuncs) {
                var f = statsFuncs[key];
                // write a new element to the ul
                $("#statsOutput").append("<li>" + key + ": " + f(schedule.getPoints()) + "</li>");
            }
        });
    };

    return m;
};
