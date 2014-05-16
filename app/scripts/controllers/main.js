'use strict';

angular.module('simpleRegistryApp')
    .controller('MainCtrl', ['$scope', '$http', 'Gift', function ($scope, $http, Gift) {
        /*    $http.get('/api/awesomeThings').success(function(awesomeThings) {
         $scope.awesomeThings = awesomeThings;
         });*/
        $scope.gifts = Gift.getList().$object;
        }]);
