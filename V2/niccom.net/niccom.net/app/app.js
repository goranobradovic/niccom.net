/// <reference path="../Scripts/angular.js" />

angular.module("app", ['chieffancypants.loadingBar', 'ngAnimate', 'ui.bootstrap'])
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    });

    