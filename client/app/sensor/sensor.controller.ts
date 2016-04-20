'use strict';
(function(){

class SensorComponent {

  constructor($http, Auth, $state) {
    this.Auth = Auth;
    this.$http = $http;
    this.$state = $state;
    this.sensors = [];
  }

  $onInit() {
    this.$http.get('/api/sensors').then(response => {
      this.sensors = response.data;
    });
  }

}

class ManageSensorComponent {
  /*var errors: [];
  var submitted: false;*/

  constructor($http, Auth, $state) {
    this.Auth = Auth;
    this.$http = $http;
    this.$state = $state;

    if(this.$state.params.id) {
      this.$http.get('/api/sensors/' + this.$state.params.id)
      .then(response => {
        this.sensor = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  addSensor(form) {
    this.submitted = true;
    this.$http.post('/api/sensors', {
      name: this.sensor.name,
      alias: this.sensor.alias,
    })
    .then(() => {
      this.$state.go('sensor');
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Update validity of form fields that match the mongoose errors
      angular.forEach(err.errors, (error, field) => {
        form[field].$setValidity('mongoose', false);
        this.errors[field] = error.message;
      });

    });
  }

  saveSensor(form) {
    this.submitted = true;

    this.$http.put('/api/sensors/' + this.$state.params.id, this.sensor)
    .then(res => {
      this.$state.go('sensor');
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Update validity of form fields that match the mongoose errors
      angular.forEach(err.errors, (error, field) => {
        form[field].$setValidity('mongoose', false);
        this.errors[field] = error.message;
      });
    });

  }

  removeSensor() {
    this.$http.delete('/api/sensors/' + this.$state.params.id)
    .then(res => {
      this.$state.go('sensor');
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Update validity of form fields that match the mongoose errors
      angular.forEach(err.errors, (error, field) => {
        this.errors[field] = error.message;
      });
    });
  }
}

angular.module('siteCurApp')
  .component('sensor', {
    templateUrl: 'app/sensor/sensor.html',
    controller: SensorComponent
  })
  .component('newsensor', {
    templateUrl: 'app/sensor/new_sensor.html',
    controller: ManageSensorComponent
  })
  .component('editsensor', {
    templateUrl: 'app/sensor/edit_sensor.html',
    controller: ManageSensorComponent
  })
  .component('removesensor', {
    templateUrl: 'app/sensor/remove_sensor.html',
    controller: ManageSensorComponent
  });

})();
