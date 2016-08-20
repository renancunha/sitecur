/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import moment from 'moment';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Sensor from '../api/sensor/sensor.model'
import SensorData from '../api/sensor_data/sensor_data.model'

Sensor.find({}).remove()
  .then(() => {
    Sensor.create({
      name: 'Temp. Vaso 1',
      alias: 'TempSolo_vaso_1',
      unit: 'ºC'
    }, {
      name: 'Umidade Solo',
      alias: 'UmSolo_vaso_1',
      unit: 'U'
    }, {
      name: 'Temp. Ambiente',
      alias: 'TempAmb_vaso_1',
      unit: 'ºC'
    }, {
      name: 'Umidade Ambiente',
      alias: 'UmiAmb_vaso_1',
      unit: 'U'
    }, {
      name: 'Peso Vaso 1',
      alias: 'Peso_vaso_1',
      unit: 'g'
    }).then(() => {
      Sensor.findOne().exec()
        .then(sensor => {

          SensorData.find({}).remove()
            .then(() => {
              var date = moment();

              for (var i = 0; i < 0; i++) {
                var _date = date.add(10, 'minutes');
                var sensorData = new SensorData();
                sensorData.date = _date;
                sensorData.value = Math.random() * 30;
                sensorData.sensor = sensor._id;

                sensorData.save();
              }
            })
        });
    })
  });

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
