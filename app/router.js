'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.activityDataController.index)
  router.get('/getObject', controller.activityObjectController.getAllObject)
  router.post('/setObject', controller.activityObjectController.setObject)
  router.post('/deleteObj/:name', controller.activityObjectController.deleteObj)
  router.post(
    '/getActivity/:name',
    controller.activityDataController.getActivity
  )
  router.post('/saveActivity', controller.activityDataController.saveActivity)
  router.post('/getTemplate', controller.activityDataController.getMobileData)
  router.post('/updateObj', controller.activityObjectController.updateObject)
  router.post('/test', controller.testController.test)
  router.post('/upimage', controller.imageController.upload) // 上传图片接口
  router.get('/getImage', controller.imageController.getImage) // 获取图片接口
  router.post('/saveSingleComplate', controller.complateController.save) // 保存单个组件
  router.get('/getSingleComplate', controller.complateController.getComplate) // 获取单个组件列表
}
