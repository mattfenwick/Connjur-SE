

function addModify(schedule) {

    $("#addMany").click(function() {
        // TODO check to make sure list of pairs of positive ints
        var myList = JSON.parse($("#addMany").val());
        myList.map(function(pt) {
            schedule.addPoint(pt);
        });
    });

    $('#addRandom').click(function() {
        schedule.addPoint([Math.floor(Math.random() * 30),
                           Math.floor(Math.random() * 30)]);
    });

    $("#addOne").click(function() {
        var x = parseInt($("#x").val());
        var y = parseInt($("#y").val());
        schedule.addPoint([x, y]);
    });

    $("#removeAll").click(function() {
        schedule.setPoints([]);
    });

};