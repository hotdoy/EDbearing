//PAGE LOAD
$(document).ready(function() {
	console.log( "ready!" );
	// $("#root").append("<h1>EDbearing!!!</h1>");
});



$( "#latStart, #lonStart, #latDest, #lonDest" ).on('input', function() {
  console.log( calculateBearing() );
});

//script from https://edbearingcalc.neocities.org/
function calculateBearing(){
    var latStart = parseFloat($("#latStart").val());
    var lonStart = parseFloat($("#lonStart").val());
    var latDest = parseFloat($("#latDest").val());
    var lonDest = parseFloat($("#lonDest").val());

    var deltaLat = latDest - latStart;
    var deltaLon = lonDest - lonStart;

    var initialBearing = (Math.atan2(deltaLon, deltaLat) * (180/3.14159265));


    if (initialBearing <= 0) {
       initialBearing = 360 + initialBearing;
    }

    initialBearing = Math.round(initialBearing);

    console.log(initialBearing);
    $("#bearing").html(initialBearing);
}