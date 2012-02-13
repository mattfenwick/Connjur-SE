

function addModify(schedule) {

    $("#addMany").click(function() {
        // TODO check to make sure list of pairs of positive ints
        var myList = JSON.parse($("#manyPoints").val());
        myList.map(function(pt) {
            schedule.addPoint(pt); // TODO error-handling
        });
    });

    $('#addRandom').click(function() {
        schedule.addPoint([Math.floor(Math.random() * 100) + 1,
                           Math.floor(Math.random() * 100) + 1]);
    });

    $("#addOne").click(function() {
        var x = parseInt($("#x").val(), 10);
        var y = parseInt($("#y").val(), 10);
        schedule.addPoint([x, y]);
    });

    $("#removeAll").click(function() {
        schedule.setPoints([]);
    });

};