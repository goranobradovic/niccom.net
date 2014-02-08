/// <reference path="../../Scripts/_references.js" />
angular.module('app')
    .factory('bookmarks', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
        var linksWithMissingFavicons = [];
        return {
            get: function () {
                var deferred = $q.defer();
                var request = $http.get('data/bookmarks.js');
                request.success(function (data) {
                    //processFavicons(data);
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
        };

        function processFavicons(data) {
            for (var index in data) {
                var category = data[index];
                for (var groupIndex in category) {
                    var group = category[groupIndex];
                    if (group.links) {
                        linksWithMissingFavicons = linksWithMissingFavicons
                            .map(addDefaultFavicon)
                            .concat(group.links.filter(withoutFavicon));
                    }
                }
            }
            $timeout(startAcquireOfFavicons, 1);
        }

        function withoutFavicon(link) {
            return !(link.favicon);
        }

        function startAcquireOfFavicons() {
            processNextFavicon();
        }

        function processNextFavicon() {
            if (linksWithMissingFavicons.length < 1) return;
            var link = linksWithMissingFavicons.pop();
            if (link && link.url) {
                var faviconUrl = link.url.replace(/\/$/, '') + "/favicon.ico";
                var img = new Image;
                img.onload = function () {
                    link.favicon = faviconUrl;
                    processNextFavicon();
                };
                img.onerror = function () {
                    processNextFavicon();
                };
                img.src = faviconUrl;
            }
            //$timeout(processNextFavicon, 100);
        }
        //function addFavicon(link) {
        //    if(link.favicon)
        //    link.favicon = 'http://www.niccom.net/favicon.ico';
        //}

        function addDefaultFavicon(link) {
            link.favicon = link.favicon || 'http://www.niccom.net/favicon.ico';
            return link;
        }
    }]);

