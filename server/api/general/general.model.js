'use strict';

import mongoose from 'mongoose';

var GeneralSchema = new mongoose.Schema({
  lastRaspIp: String
});

export default mongoose.model('General', GeneralSchema);
