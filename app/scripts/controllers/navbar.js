'use strict';

angular.module('simpleRegistryApp')
  .controller('NavbarCtrl', function ($scope, $state, Auth) {
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $state.go('/login');
      });
    };
    
    $scope.isActive = function(route) {
        return route === $state.current.name;
    };
  });
