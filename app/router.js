'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.activityDataController.index);
  router.get('/getObject', controller.activityObjectController.getAllObject);
  router.post('/setObject', controller.activityObjectController.setObject);
  router.get('/getActivity', controller.activityDataController.getActivity);
  router.post('/saveActivity', controller.activityDataController.saveActivity);
};
