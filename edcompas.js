$(document).ready(function() {
	console.log( "ApplicationStart" );

	var title = getParameterByName();
	if (title) {
		document.title = title + ' ― EDbearing';
	}
	else{
		document.title ='EDbearing';
	}

	$( ".loader-bg" ).fadeOut( 1000, function() {});
	$( ".loader-logo" ).fadeOut( 800, function() {});


});


$( "#latStart, #lonStart, #latDest, #lonDest, #title" ).on('input', function() {
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

		updateURL(
			$("#latDest").val(),
			$("#lonDest").val(),
			$("#title").text()
		);

			if ($("#title").text()) {
		document.title = $("#title").text() + ' ― EDbearing';
	}
	else{
		document.title ='EDbearing';
	}
}

function setDestination(lat, lon, title) {
	$("#latDest").val(lat);
	$("#lonDest").val(lon);
	$("#title").text(title);
	calculateBearing();
}

function updateURL(lat, lon, title) {
	if (lat.length > 0 && lon.length >0) {
		if (history.pushState) {
			var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?lat=' + lat + '&lon=' + lon + '&title=' + title;
			window.history.pushState({path:newurl},'',newurl);
		}
	}
	else {
		if (history.pushState) {
			var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
			window.history.pushState({path:newurl},'',newurl);
		}
	}
}

function getParameterByName() {
	var lat = RegExp('[?&]' + 'lat' + '=([^&]*)').exec(window.location.search);
	var lon = RegExp('[?&]' + 'lon' + '=([^&]*)').exec(window.location.search);
	var title = RegExp('[?&]' + 'title' + '=([^&]*)').exec(window.location.search);
	console.log("Coordinates in url!")
	setDestination(
		lat && decodeURIComponent(lat[1].replace(/\+/g, ' ')),
		lon && decodeURIComponent(lon[1].replace(/\+/g, ' ')),
		title && decodeURIComponent(title[1].replace(/\+/g, ' '))
	);

	return title && decodeURIComponent(title[1].replace(/\+/g, ' '));
}

$(".card").click(function() {
    $('html, body').animate({
        scrollTop: $("#top").offset().top
    }, 1000);
});