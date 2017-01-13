//PAGE LOAD
$(document).ready(function() {
	console.log( "ready!" );
	$("#root").html("<h1>EDbearing!!!</h1>");

});


//script from https://edbearingcalc.neocities.org/


function calculateBearing(){
    var latStart = document.getElementById("latStart").value;
    var lonStart = document.getElementById("lonStart").value;
    var latEnd = document.getElementById("latDest").value;
    var lonEnd = document.getElementById("lonDest").value;

    var deltaLat = latEnd - latStart;
    var deltaLon = lonEnd - lonStart;

    var heading = (Math.atan2(deltaLon, deltaLat) * (180/3.14159265));

    if (heading <= 0) {
        heading = 360 + heading;
    }
    
    heading = Math.round(heading);
    console.log(heading);
}