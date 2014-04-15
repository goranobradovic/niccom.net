/// <reference path="../Scripts/angular.js" />

angular.module("app", ['chieffancypants.loadingBar', 'ngAnimate', 'ui.bootstrap', 'ngRoute', 'wu.masonry'])
    .config([
        'cfpLoadingBarProvider', '$routeProvider', '$httpProvider', function (cfpLoadingBarProvider, $routeProvider) {
            cfpLoadingBarProvider.includeSpinner = true;
            $routeProvider
                .when('/bookmarks/:group?', {
                    templateUrl: function (params) {
                        params.viewName = 'bookmarks';
                        return 'app/layout/dashboard/bookmarks.html';
                    },
                    //controller: 'BookmarksCtrl'
                })
                .when('/:viewName/:viewParam?', {
                    templateUrl: function (params) { return 'app/layout/dashboard/' + params.viewName + '.html'; },
                })
                .otherwise({
                    redirectTo: 'bookmarks/favorites'
                });

        }
    ])
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
    })
    .run([
        '$rootScope', 'ga', function ($rootScope, ga) {
            $rootScope.$on('$routeChangeSuccess', function () {
                ga.sendPageView();
            });
        }
    ]);