'use strict';

angular.module('siteCurApp', [
  'siteCurApp.auth',
  'siteCurApp.admin',
  'siteCurApp.constants',
  'siteCurApp.sensor',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }).
  run(function ($rootScope, Auth) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      Auth.isLoggedIn(function (state) {
        $rootScope.userLoggedIn = state;
      });
    });
  });
