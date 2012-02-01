
function bruker(pts) {
	var lines = pts.map(function(pt) {return pt.join(" ");});
	var formatted = lines.join("\n"); // TODO is this the right newline character?
	return formatted;
}

function varian(pts) {
	var lines = pts.map(function(pt) {
		decremented = pt.map(function(c) {return c - 1;});
		return decremented.join(" ");
	});
	var formatted = lines.join("\n"); // TODO is this the right newline character?
	return formatted;
}

function asJSON(pts) {
	return JSON.stringify(pts);
}

function toolkit(pts) {
	return bruker(pts); // TODO not right once we add in quadrature
}

formats = {
		'Bruker':   bruker,
		'Varian':   varian,
		'JSON':     asJSON,
		'Toolkit':  toolkit
}

function addOutput(schedule) {

    $("#outputFormat").change(function() {
    	var format = $("#outputFormat").val();
    	var func = formats[format];
        var formatted = func(schedule.getPoints().sort()); // TODO sort numerically
        $("#scheduleOut").val(formatted);
    });
}