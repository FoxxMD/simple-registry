'use strict';

angular.module('simpleRegistryApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'restangular',
  'ngAnimate',
    'xeditable'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider) {
        $stateProvider
            .state('index',{
                url:'/',
                templateUrl:'partials/profile.html',
                controller:'ProfileCtrl'

            })
            .state('login',{
                url:'/login',
                templateUrl:'partials/login.html',
                controller:'LoginCtrl'
            })
            .state('signup',{
                url:'/signup',
                templateUrl:'partials/signup.html',
                controller:'SignupCtrl'
            }).
        state('settings',{
                url:'/settings',
                templateUrl:'partials/settings.html',
                controller:'SettingsCtrl'
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
