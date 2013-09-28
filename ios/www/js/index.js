/************************/
/*******PHONEGAP*********/
/************************/
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}
function capturePhoto() {
	navigator.camera.getPicture(function(imgData) {

		}, function (message) {

		},
		{quality:50, destinationType:destinationType.DATA_URL});
}

/************************/
/*******ANGULARJS********/
/************************/
function appController($scope) {

}

Parse.initialize("CapTJvjAtrMgMZuLqkPfzw71qO2vgzyeaUcJPU2c", "E8Kykz4Rq59hdS2IF4Fa3RYlVL2r68S3iFWjgIgD");
var app = angular.module('app', ['ngSanitize']);
app.run(function($rootScope, $location, $http) {
	$rootScope.name = false
	$rootScope.picture = false;
	$rootScope.fb_id = false;
	$rootScope.showmap = false;
	$rootScope.objs = {}

	if($location.search().name) {
		$rootScope.name = $location.search().name.replace(/\+/g, ' ')
		$rootScope.picture = $location.search().picture.replace(/\+/g, ' ')
		$rootScope.fb_id = $location.search().fb_id.replace(/\+/g, ' ')

		setInterval(function() {
			var query = new Parse.Query(Parse.Object.extend("object"));
			query.find({
				success: function(gameScore) {
					for(var i in gameScore) {
						if($rootScope.fb_id && gameScore[i].get('fb_id') == $rootScope.fb_id && !$rootScope.objs[gameScore[i].get('name')])
							$rootScope.objs[gameScore[i].get('name')] = {"lat":gameScore[i].get('lat'), "lng":gameScore[i].get('lng')}

						if(!$rootScope.$$phase)
							$rootScope.$apply();
					}
				}
			});
		}, 500)
	}

	$rootScope.discover = function(lat, lng) {
		$rootScope.showmap = true;

		var directionsDisplay;
		var directionsService = new google.maps.DirectionsService();
		var map;

		var map = new google.maps.Map(document.getElementById("map-canvas"), {"zoom":16, "zoomControl":false, "disableDefaultUI":true, "disableDoubleClickZoom":true, "draggable":false, "scrollwheel":false, "panControl":false, "zoomControlOptions":{"style":google.maps.ZoomControlStyle.SMALL}, "mapTypeId":google.maps.MapTypeId.ROADMAP}),
			directions_display = new google.maps.DirectionsRenderer({"map":map, "suppressMarkers":true}),
			directions_service = new google.maps.DirectionsService(),
			map_markers = [];

		directions_display.setMap(map);
		google.maps.visualRefresh = true;

		//get directions google
		directions_service.route({
			"origin": new google.maps.LatLng(40.7532913, -73.9901229), //navigator.geolocation is not very reliable, use static location for demo
			"destination": new google.maps.LatLng(lat, lng),
			"travelMode": google.maps.DirectionsTravelMode.WALKING
		}, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var route = response.routes[0].legs[0];

				directions_display.setDirections(response);

				google.maps.event.trigger(map, 'resize');
			}
		});
	}

	$rootScope.facebook_login = function() {
		window.location.href = "https://www.facebook.com/dialog/oauth?client_id=412393118862360&redirect_uri="+encodeURIComponent("http://nycadventures.elasticbeanstalk.com/facebook_callback.php")+"&scope=email&display=touch";
	}
});