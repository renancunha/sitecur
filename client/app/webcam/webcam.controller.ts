'use strict';

(function() {

class WebcamController {

  constructor($http, $scope, socket) {
    this.$http = $http;
  }

  $onInit() {
    
  }
}

angular.module('siteCurApp')
  .component('webcam', {
    templateUrl: 'app/webcam/webcam.html',
    controller: WebcamController
  });

})();
