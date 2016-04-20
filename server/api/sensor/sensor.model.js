'use strict';

import mongoose from 'mongoose';

var SensorSchema = new mongoose.Schema({
  name: String,
  info: String,
  alias: String,
  active: Boolean
});

export default mongoose.model('Sensor', SensorSchema);
