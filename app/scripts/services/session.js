'use strict';

angular.module('simpleRegistryApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
