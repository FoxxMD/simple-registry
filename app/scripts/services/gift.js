'use strict';

angular.module('simpleRegistryApp')
    .factory('Gift', ['Restangular', function (Restangular) {
        return Restangular.all('gifts');

    }]);