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

var app = angular.module('app', ['ngSanitize']);
app.run(function($rootScope, $location, $http) {
	$rootScope.name = false
	$rootScope.picture = false;

	if($location.search().name) {
		$rootScope.name = $location.search().name.replace(/\+/g, ' ')
		$rootScope.picture = $location.search().picture.replace(/\+/g, ' ')

		setInterval(function() {
			var query = new Parse.Query(Parse.Object.extend("user"));
			query.find({
				success: function(gameScore) {
					for(var i in gameScore) {
						if(!$rootScope.users[gameScore[i].get('fb_id')])
							$rootScope.users[gameScore[i].get('fb_id')] = gameScore[i].get('name')

						if(!$rootScope.$$phase)
							$rootScope.$apply();
					}
				}
			});
		}, 500)
	}

	$rootScope.facebook_login = function() {
		window.location.href = "https://www.facebook.com/dialog/oauth?client_id=412393118862360&redirect_uri="+encodeURIComponent("http://localhost/facebook_callback.php")+"&scope=email&display=touch";
	}
});