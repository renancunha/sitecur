'use strict';

import mongoose from 'mongoose';
import Sensor from '../sensor/sensor.model';

var SensorDataSchema = new mongoose.Schema({
  date: Date,
  value: Number,
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  }
});

export default mongoose.model('SensorData', SensorDataSchema);
