angular.module('app')
    .controller('BookmarksCtrl', ['$scope', 'bookmarks', function ($scope, bookmarks) {
        $scope.bookmarks = [];
        bookmarks.get()
            .then(function (data) {
                $scope.bookmarks = data;
            });
    }]);