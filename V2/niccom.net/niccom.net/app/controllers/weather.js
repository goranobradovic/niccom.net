angular.module('app')
    .controller('WeatherCtrl', ['$scope', '$http', function ($scope, $http) {

        $http.get("http://81.93.70.194/synopphp/synop.php")
            .then(function (data) {
                $scope.weather = data;
            });


        //$timeout(function() {
        //    $scope.start();
        //}, 150);
        //$timeout(function() {
        //    $scope.complete();
        //}, 5750);
    }]);