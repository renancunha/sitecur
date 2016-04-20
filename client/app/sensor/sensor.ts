'use strict';

angular.module('siteCurApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sensor', {
        url: 'sensors',
        template: '<sensor></sensor>'
      });
  });
