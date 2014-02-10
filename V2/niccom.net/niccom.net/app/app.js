/// <reference path="../Scripts/angular.js" />

angular.module("app", ['chieffancypants.loadingBar', 'ngAnimate', 'ui.bootstrap', 'ngRoute', 'wu.masonry'])
    .config(['cfpLoadingBarProvider', '$routeProvider', '$httpProvider', function (cfpLoadingBarProvider, $routeProvider, $httpProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        $routeProvider.
          when('/bookmarks/:group?', {
              templateUrl: function (params) {
                  params.viewName = 'bookmarks';
                  return 'app/layout/dashboard/bookmarks.html';
              },
              //controller: 'BookmarksCtrl'
          }).
          when('/:viewName/:viewParam?', {
              templateUrl: function (params) { return 'app/layout/dashboard/' + params.viewName + '.html'; },
              //controller: 'BookmarksCtrl'
          }).
          otherwise({
              redirectTo: 'bookmarks/favorites'
          });

        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }])
    .filter('filterLinks', function () {
        return function (input, searchTerm) {
            if (!searchTerm) return input;
            var result = [];
            for (var i = 0; i < input.length; i++) {
                var group = input[i];
                var filteredGroup = {};
                for (var prop in group) {
                    filteredGroup[prop] = group[prop];
                }
                filteredGroup.links = group.links.filter(function (link) { return link.name.indexOf(searchTerm) >= 0; });
                if (filteredGroup.links.length > 0) result.push(filteredGroup);
            }
            return result;
        };
    });