/// <reference path="../../Scripts/_references.js" />
angular.module('app')
    .factory('auth', ['$http', function ($http) {
        return {
            login: function (username, password) {
                return $http.post('auth', { username: username, password: password });
            }
        };
    }]);