/// <reference path="../Scripts/angular.js" />

angular.module("app", ['chieffancypants.loadingBar', 'ngAnimate', 'ui.bootstrap', 'ngRoute'])
    .config(['cfpLoadingBarProvider', '$routeProvider', '$httpProvider', function (cfpLoadingBarProvider, $routeProvider, $httpProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        $routeProvider.
          when('/:viewName', {
              templateUrl: function (params) { return 'app/layout/dashboard/' + params.viewName + '.html'; },
              //controller: 'BookmarksCtrl'
          }).
          otherwise({
              redirectTo: 'favorites'
          });

        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }]);