'use strict';

angular.module('simpleRegistryApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'restangular'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider) {
/*    $routeProvider
      .when('/', {
        template: ''//,
*//*        controller: 'MainCtrl'*//*
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });*/
        $stateProvider
            .state('index',{
                url:'/',
                template:''
            })
            .state('login',{
                url:'/login',
                templateUrl:'partials/login.html'
            });

    $urlRouterProvider.otherwise('index');
    $locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('/api');
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q','$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $state, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      
      if (toState.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });
