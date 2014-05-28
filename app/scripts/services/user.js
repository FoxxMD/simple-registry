'use strict';

angular.module('simpleRegistryApp')
  .factory('User', function ($resource, Restangular) {
        return Restangular.all('users');
  });
