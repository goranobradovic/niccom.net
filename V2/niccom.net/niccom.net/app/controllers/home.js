angular.module('app')
    .controller('HomeCtrl', function ($scope, $http, $timeout, rootPath) {

        $scope.root = rootPath;

        //$timeout(function() {
        //    $scope.start();
        //}, 150);
        //$timeout(function() {
        //    $scope.complete();
        //}, 5750);
    });