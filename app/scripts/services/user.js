'use strict';

angular.module('simpleRegistryApp')
  .factory('User', function ($resource, Restangular) {
        return Restangular.all('users');
/*    return $resource('/api/users/:id', {
      id: '@id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });*/
  });
