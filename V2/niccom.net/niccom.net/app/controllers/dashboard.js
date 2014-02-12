angular.module('app')
    .controller('DashboardCtrl', [
        '$scope', 'dashboard', '$routeParams', '$rootScope', '$location', function ($scope, dashboard, $routeParams, $rootScope, $location) {
            $scope.bookmarks = [];
            $scope.navCollapsed = false;
            dashboard.get()
                .success(function (data) {
                    $scope.dashboard = data;
                });
            $scope.currentViewIs = function (menuItem) {
                return menuItem.type == $routeParams.group && menuItem.name == $routeParams.viewName;
            };

            $rootScope.$on('$routeChangeSuccess', function () {
                if (typeof ga == "function")
                    ga('send', 'pageview', { 'page': $location.path() });
            });
        }
    ]);