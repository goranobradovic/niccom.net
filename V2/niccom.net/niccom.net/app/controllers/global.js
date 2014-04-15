/// <reference path="../../Scripts/_references.js" />
angular.module('app')
    .controller('GlobalCtrl', [
        '$scope', 'shortcuts', function ($scope, shortcuts) {
            $scope.keyPressed = function ($event) {
                shortcuts.handleKeyPress($event);
            }
        }
    ]);

