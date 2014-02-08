/// <reference path="../../Scripts/_references.js" />
angular.module('app')
    .factory('dashboard', ['$http', function ($http) {
        return {
            get: function () {
                return $http.get('data/dashboard.js');
            }
        };
    }]);

