
function Modify($, schedule) {
    var m = {
        addMany: function() {
                // TODO check to make sure list of pairs of positive ints
                var myList = JSON.parse($("#manyPoints").val());
                myList.map(function(pt) {
                    schedule.addPoint(pt); // TODO error-handling
                });
        },
        
        addRandom: function() {
            schedule.addPoint([Math.floor(Math.random() * 100) + 1,
                               Math.floor(Math.random() * 100) + 1]);
        },
        
        addOne:function() {
            var x = parseInt($("#x").val(), 10);
            var y = parseInt($("#y").val(), 10);
            schedule.addPoint([x, y]);
        },
        
        removeAll:function() {
            schedule.setPoints([]);
        }
    };
    
    m.addBehavior = function() {
        $("#addMany").click(m.addMany);
        $('#addRandom').click(m.addRandom);
        $("#addOne").click(m.addOne);
        $("#removeAll").click(m.removeAll);
    };

    return m;
}