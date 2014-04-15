angular.module('app')
    .factory('ga', [
        '$location', function($location) {
            return {
                sendPageView: function(url) {
                    if (typeof ga == "function")
                        ga('send', 'pageview', { 'page': url || $location.path() });
                },
                sendClickEvent: function(link) {
                    ga('send', 'event', 'link', 'click', link, 1);
                }
            };
        }
    ]);