'use strict';

(function() {

class MainController {

  constructor($http, $scope) {
    this.$http = $http;
    this.sensors = [];

  }

  $onInit() {
    this.$http.get('/api/sensors').then(response => {

      this.sensors = response.data;

      for(var index in this.sensors) {
        this.loadSensorData(index);
      }

    });
  }

  loadSensorData(_i) {
    this.$http.get('/api/sensor_data/get_last_read/' + this.sensors[_i]._id)
    .then(res => {

      this.sensors[_i].last_read_value = 'N/A';
      this.sensors[_i].last_read_date = 'N/A';

      if(res.data.length > 0) {
        this.sensors[_i].last_read_value = res.data[0].value;
        this.sensors[_i].last_read_date = res.data[0].date;
      }
    });
  }

}

angular.module('siteCurApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
