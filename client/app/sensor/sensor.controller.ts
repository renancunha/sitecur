'use strict';
(function(){

class SensorComponent {
  constructor(sensorService) {
    this.message = 'Hello';
    this.sensorService = sensorService;
  }
}

angular.module('siteCurApp')
  .component('sensor', {
    templateUrl: 'app/sensor/sensor.html',
    controller: SensorComponent
  });

})();
