angular.module('app')
    .controller('BookmarksCtrl', function ($scope, $http, $timeout, bookmarks) {
        $scope.bookmarks = [];
        bookmarks.get()
            .then(function (data) {
                $scope.bookmarks = data;
            });


        //$timeout(function() {
        //    $scope.start();
        //}, 150);
        //$timeout(function() {
        //    $scope.complete();
        //}, 5750);
    });