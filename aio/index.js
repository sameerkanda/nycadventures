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

		setTimeout(function() {
			$(".categories > *").each(function() {
				var new_elem = $(this).clone();
				new_elem.css('left', $(this).position().left+'px');
				new_elem.css('top', $(this).position().top+'px');
				new_elem.css('width', $(this).width()+'px');
				new_elem.css('height', $(this).height()+'px');
				new_elem.attr('orig_left', $(this).position().left+'px');
				new_elem.attr('orig_top', $(this).position().top+'px');
				new_elem.attr('orig_width', $(this).width()+'px');
				new_elem.attr('orig_height', $(this).height()+'px');
				new_elem.css('position', 'absolute');
				$($(new_elem).find('table').find('td')[1]).remove()

				$("body").append(new_elem)
				$(new_elem).draggable({
					stop: function() {
						new_elem.css('left', $(this).attr('orig_left'));
						new_elem.css('top', $(this).attr('orig_top'));
						new_elem.css('width', $(this).attr('orig_width'));
						new_elem.css('height', $(this).attr('orig_height'));

						if($rootScope.active_user) {
							var objectvar = Parse.Object.extend("object");
							var objectvar2 = new objectvar();

							objectvar2.set("fb_id", $rootScope.active_user);
							objectvar2.set("lat", $(this).attr('lat'));
							objectvar2.set("lng", $(this).attr('lng'));
							objectvar2.set("name", $(this).attr('name'));

							objectvar2.save(null, {
								success: function(gameScore) {

								}
							});
						}
						else {
							alert('Please select a user first')
						}
					}
				})
			});
		}, 500)
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