(function (angular) {
	var app = angular.module('ppApp');
	
	app.controller('createCtrl', ['$scope', '$firebaseArray', '$rootScope', '$state', function ($scope, $firebaseArray, $rootScope, $state) {

		if (!$scope.user) {
			$state.go('home');
		}

		var ref = new Firebase('https://project-pitch.firebaseio.com/projects');

		var list = $firebaseArray(ref);

		$scope.Datas = {};

		$scope.submitForm = function () {

			$scope.Datas.uid = $scope.user.uid;
			$scope.Datas.createName = $scope.user[$scope.user.provider].displayName;
			$scope.Datas.createAt = Date.now();
			$scope.Datas.partners = Array.apply(null, Array(5)).map(function() { 
				return {
					uid: "",
					name: "Join ?"
				};
			});
			
			list
				.$add($scope.Datas)
				.then(function (ref) {
					$scope.Datas = {};
					$state.go('project', {
						id: ref.key()
					});
				});
		};

		$scope.clickCancel = function () {
			$state.go('home');
		};
	}]);

})(angular);
