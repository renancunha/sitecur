'use strict';

(function() {

class AtuadoresController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket.socket;

    this.lampada = false;
    this.irrigacao = false;
    this.ventilacao = false;

    this.generals = {};
    this.raspIp = 0;

    this.socket.emit('broadcast_atuadores_states', {});
  }

  $onInit() {
    var _this = this;
    this.socket.on('lampada_state', function (data) {
      _this.lampada = data == 0 ? false : true;
    });

    this.socket.on('irrigacao_state', function (data) {
      _this.irrigacao = data == 0 ? false : true;
    });

    this.socket.on('ventilacao_state', function (data) {
      _this.ventilacao = data == 0 ? false : true;
    });
    this.$http.get('/api/generals/raspip').then(response => {
        console.log(response.data);
        this.generals = response.data;
        if(this.generals && this.generals.length > 0) {
          this.raspIp = this.generals[0].lastRaspIp;
        }
      });
  }

  onLampadaChange(state) {
    this.lampada = state;
    this.socket.emit('on_change_lampada', this.lampada);
  }

  onIrrigacaoChange(state) {
    this.irrigacao = state;
    this.socket.emit('on_change_irrigacao', this.irrigacao);
  }

  onVentilacaoChange(state) {
    this.ventilacao = state;
    this.socket.emit('on_change_ventilacao', this.ventilacao);
  }

}

angular.module('siteCurApp')
  .component('atuadores', {
    templateUrl: 'app/atuadores/atuadores.html',
    controller: AtuadoresController
  });

})();
