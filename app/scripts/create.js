
function Create($, schedule) {
    var m = {
        createRandom: function() {
            for(var i = 0; i < 100; i++) {
                schedule.addPoint([Math.floor(Math.random() * 100) + 1,  // so the min is 1 and the max is 100
                                   Math.floor(Math.random() * 100) + 1]);
            }
        }
    };
    
    m.addBehavior = function() {
        $("#createRandom").click(m.createRandom);
    }
    
    return m;
}