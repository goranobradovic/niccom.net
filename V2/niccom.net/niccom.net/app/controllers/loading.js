angular.module('app')
    .controller('LoadingCtrl', function ($scope, $http, $timeout, cfpLoadingBar) {

        $scope.start = function () {
            cfpLoadingBar.start();
        };

        $scope.complete = function () {
            cfpLoadingBar.complete();
        };

        $scope.loading = 1;

        function load() {
            $timeout(function () {
                $scope.loading = $scope.loading + 5;
                if ($scope.loading < 200) {
                    load();
                } else {
                    $scope.loaded = true;
                }
            }, 50);
        }

        load();


        //$timeout(function() {
        //    $scope.start();
        //}, 150);
        //$timeout(function() {
        //    $scope.complete();
        //}, 5750);
    });