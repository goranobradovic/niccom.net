angular.module('app')
    .controller('DashboardCtrl', ['$scope', 'dashboard', '$routeParams', '$route', function ($scope, dashboard, $routeParams, $route) {
        $scope.bookmarks = [];
        dashboard.get()
            .success(function (data) {
                $scope.dashboard = data;
            });
        $scope.currentViewIs = function (menuItem) {
            return menuItem.type == $routeParams.group && menuItem.name == $routeParams.viewName;
        };
    }]);