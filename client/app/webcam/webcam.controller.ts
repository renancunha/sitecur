'use strict';

(function() {

class WebcamController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.generals = {};
    this.raspIp = 0;
  }

  $onInit() {
      this.$http.get('/api/generals/raspip').then(response => {
      	console.log(response.data);
        this.generals = response.data;
        if(this.generals && this.generals.length > 0) {
        	this.raspIp = this.generals[0].lastRaspIp;
        }
      });
    }
}

angular.module('siteCurApp')
  .component('webcam', {
    templateUrl: 'app/webcam/webcam.html',
    controller: WebcamController
  });

})();
