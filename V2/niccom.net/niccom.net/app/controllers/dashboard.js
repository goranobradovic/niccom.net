angular.module('app')
    .controller('DashboardCtrl', [
        '$scope', 'dashboard', '$routeParams', function ($scope, dashboard, $routeParams) {
            $scope.bookmarks = [];
            $scope.navCollapsed = false;
            dashboard.get()
                .success(function (data) {
                    $scope.dashboard = data;
                });
            $scope.currentViewIs = function (menuItem) {
                return menuItem.type == $routeParams.group && menuItem.name == $routeParams.viewName;
            };
        }
    ]);