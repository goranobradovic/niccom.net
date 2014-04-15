/// <reference path="../../Scripts/_references.js" />
angular.module('app')
    .controller('AuthCtrl', [
        'auth', 'shortcuts', '$log', '$modal', function (auth, shortcuts, $log, $modal) {

            shortcuts.subscribedHandlers.push(showLoginOnShorcutPressed);

            function showLoginOnShorcutPressed($event) {
                if (String.fromCharCode($event.which) == 'L' && $event.ctrlKey) {
                    var modalInstance = $modal.open({
                        templateUrl: 'myModalContent.html',
                        controller: loginInstanceCtrl,
                    });
                    $log.debug('login shown');

                    modalInstance.result.then(function (login) {
                        auth.login(login.username, login.password);
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                }
            }

            var loginInstanceCtrl = ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                $scope.login = {
                    username: '',
                    password: ''
                };
                $scope.login = function () {
                    $modalInstance.close($scope.login);
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                }
            }];
        }
    ]);

