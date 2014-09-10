(function (angular) {
	"use strict";

	var module = angular.module('net.enzey.example',
		[
			'net.enzey.splitter'
		]
	);

	module.controller('splitterCtrl', function ($scope, $q, $timeout, $sce) {
		$scope.isShown = true;
		$scope.bClick = function() {
			$scope.isShown = !$scope.isShown;
		}
	});
})(angular);
