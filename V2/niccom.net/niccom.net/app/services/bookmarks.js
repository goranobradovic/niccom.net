/// <reference path="../../Scripts/_references.js" />
angular.module('app')
    .factory('bookmarks', [
        '$http', '$q', '$cacheFactory', '$rootScope', function($http, $q, $cacheFactory, $rootScope) {
            var service = {
                get: function() {
                    var deferred = $q.defer();
                    loadData(deferred);
                    return deferred.promise;
                },
                searchTerm: ''
            };

            service.broadcastSearchTerm = function(searchTerm) {
                service.searchTerm = searchTerm;
                $rootScope.$broadcast('handleBroadcast');
            };

            function loadData(deferred) {
                var cache = $cacheFactory.get('bookmarks') || $cacheFactory('bookmarks');
                var cachedData = cache.get('bookmarks');
                if (cachedData) deferred.resolve(cachedData);
                else {
                    var request = $http.get('data/bookmarks.js');
                    request.success(function(data) {
                        cache.put('bookmarks', data);
                        deferred.resolve(data);
                    });
                }
            }

            return service;
        }
    ]);