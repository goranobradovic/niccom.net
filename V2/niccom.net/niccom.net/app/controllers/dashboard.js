angular.module('app')
    .controller('DashboardCtrl', ['$scope', 'dashboard', '$routeParams', function ($scope, dashboard, $routeParams) {
        $scope.bookmarks = [];
        dashboard.get()
            .success(function (data) {
                $scope.dashboard = data;
            });
        $scope.viewName = $routeParams.viewName;
        $scope.currentViewIs = function(viewName) {
            return viewName == $routeParams.viewName;
        };
    }]);