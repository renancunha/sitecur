'use strict';

angular.module('siteCurApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('webcam', {
        url: '/webcam',
        template: '<webcam></webcam>',
        authenticate: true
      });
  });
