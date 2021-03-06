﻿angular.module('app')
    .controller('LoadingCtrl', ['$scope', '$timeout', 'cfpLoadingBar', '$route', function ($scope, $timeout, cfpLoadingBar, $route) {

        $scope.start = function () {
            cfpLoadingBar.start();
        };

        $scope.complete = function () {
            cfpLoadingBar.complete();
        };

        $scope.loading = 1;

        function load() {
            $timeout(function () {
                $scope.loading = $scope.loading + 20;
                if ($scope.loading < 300) {
                    load();
                } else {
                    $scope.loaded = true;

                    $route.reload();
                }
            }, 50);
        }

        load();
    }]);
