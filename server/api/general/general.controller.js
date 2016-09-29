/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sensors              ->  index
 * POST    /api/sensors              ->  create
 * GET     /api/sensors/:id          ->  show
 * PUT     /api/sensors/:id          ->  update
 * DELETE  /api/sensors/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Sensor from './sensor.model';
import General from './general.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Sensors
export function getRaspIp(req, res) {
  return General.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
