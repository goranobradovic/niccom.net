﻿angular.module('app')
    .controller('BookmarksCtrl', [
        '$scope', 'bookmarks', '$routeParams', '$timeout', 'ga', function ($scope, bookmarks, $routeParams, $timeout, ga) {
            $scope.bookmarks = [];
            $scope.groupName = $routeParams.group;
            $scope.searchTerm = '';
            $scope.filteredLinks = [];
            $scope.$on('handleBroadcast', function () {
                $timeout(function () {
                    $scope.searchTerm = bookmarks.searchTerm;
                }, 1);
            });
            $scope.broadcastSearchTerm = function () {
                bookmarks.broadcastSearchTerm($scope.searchTerm);
            };
            $scope.resetSearch = function () {
                $timeout(function () {
                    $scope.searchTerm = '';
                    $scope.broadcastSearchTerm();
                }, 1);
            };
            $scope.trackClick = function (url) {
                ga.sendClickEvent(url);
            };
            bookmarks.get()
                .then(function (data) {
                    $scope.bookmarks = data;
                    processFavicons(data);
                });

            var linksWithMissingFavicons = [];


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
                $timeout(startAcquireOfFavicons, 2);
                //$timeout(startAcquireOfFavicons, 3);
            }

            function withoutFavicon(link) {
                return !(link.favicon) && link.favicon != '';
            }

            function startAcquireOfFavicons() {
                processNextFavicon();
            }

            function processNextFavicon() {
                $scope.$apply();
                if (linksWithMissingFavicons.length < 1) return;
                var link = linksWithMissingFavicons.shift();
                if (link && link.url) {
                    var faviconUrl = link.url.replace(/\/$/, '') + "/favicon.ico";
                    var img = new Image;
                    img.onload = function () {
                        link.favicon = faviconUrl;
                        processNextFavicon();
                    };
                    img.onerror = function () {
                        addDefaultFavicon(link);
                        console.log('invalid favicon: ' + link.url);
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

        }
    ]);