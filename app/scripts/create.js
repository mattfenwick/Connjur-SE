
function addCreate(schedule) {
	
	$("#createRandom").click(function() {
		for(var i = 0; i < 100; i++) {
	        schedule.addPoint([Math.floor(Math.random() * 100),
	                           Math.floor(Math.random() * 100)]);
		}
	});
}
