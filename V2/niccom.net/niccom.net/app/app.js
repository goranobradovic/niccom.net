/// <reference path="../Scripts/angular.js" />

angular.module("app", ['chieffancypants.loadingBar', 'ngAnimate', 'ui.bootstrap'])
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    })

    .controller('HomeCtrl', function ($scope, $http, $timeout, cfpLoadingBar) {

        $scope.start = function () {
            cfpLoadingBar.start();
        };

        $scope.complete = function() {
            cfpLoadingBar.complete();
        };

        $scope.loading = 1;

        function load() {
            $timeout(function () {
                $scope.loading = $scope.loading + 0.3;
                load();
            }, 500);
        }

        load();


        //$timeout(function() {
        //    $scope.start();
        //}, 150);
        //$timeout(function() {
        //    $scope.complete();
        //}, 5750);
    });