/// <reference path="../../Scripts/_references.js" />
angular.module('app')
    .factory('shortcuts', ['$rootScope', '$log', function ($rootScope, $log) {
        var subscribedHandlers = [];

        return {
            handleKeyPress: function ($event) {
                $log.debug('which:' + $event.which + ' ctrl:' + $event.ctrlKey);
                subscribedHandlers.every(function (handler) { handler($event); });
            },
            subscribedHandlers: subscribedHandlers
        };
    }]);

