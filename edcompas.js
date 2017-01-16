$(document).ready(function() {
	console.log( "ApplicationStart" );

        $("#form").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter, . and -
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 109, 189 ]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});


$( "#latStart, #lonStart, #latDest, #lonDest" ).on('input', function() {
  calculateBearing();
});


function calculateBearing(){
    var latStart = $("#latStart").val() * Math.PI/180;
    var lonStart = $("#lonStart").val() * Math.PI/180;
    var latDest = $("#latDest").val() * Math.PI/180;
    var lonDest = $("#lonDest").val() * Math.PI/180;
    var deltaLon = lonDest - lonStart;
    var deltaLat = Math.log(Math.tan(Math.PI/4 + latDest/2)/Math.tan(Math.PI/4 + latStart/2));
    var initialBearing = (Math.atan2(deltaLon, deltaLat)) * (180/Math.PI);

    if (initialBearing < 0) {
      initialBearing = 360 + initialBearing;
    }

    initialBearing = Math.round(initialBearing);
    console.log(initialBearing);

    if (isNaN(initialBearing)) {
      $("#bearing").html("X");
    }
    else{
      $("#bearing").html(initialBearing);
    }
}

function setDestination(lat, lon) {
  $("#latDest").val(lat);
  $("#lonDest").val(lon);
  calculateBearing();
}
