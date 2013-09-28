/************************/
/*******ANGULARJS********/
/************************/
function appController($scope) {

}

Parse.initialize("CapTJvjAtrMgMZuLqkPfzw71qO2vgzyeaUcJPU2c", "E8Kykz4Rq59hdS2IF4Fa3RYlVL2r68S3iFWjgIgD");
var app = angular.module('app', ['ngSanitize']);
app.run(function($rootScope, $location, $http) {
	$rootScope.step = 1;
	$rootScope.users = {}

	$rootScope.step2 = function(category) {
		$rootScope.category = category;
		$rootScope.step = 2;
	}

	$rootScope.set_active_user = function(input) {
		$rootScope.active_user = input
	}

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
});