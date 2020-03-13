/*
 * @Author: your name
 * @Date: 2020-02-22 12:50:34
 * @LastEditTime: 2020-03-13 11:44:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/service/activityObjectService.js
 */
'use strict'

const Service = require('egg').Service

class activityObjectService extends Service {
  /**
   * 查询全部项目
   */
  async FindAll() {
    return await this.ctx.model.ActivityObject.find({})
  }
  /**
   * 新建项目
   * @param {String} name
   * @param {String} disp
   * @param {Number} height
   * @param {String} background
   * @param {String} textName
   */
  async setActivityData(name, disp, height, background, textName) {
    const ActivityList = await this.ctx.model.ActivityObject.find({
      name
    })
    if (ActivityList.length > 0) {
      return Promise.reject(new Error('当前项目已经存在'))
    }
    return await this.ctx.model.ActivityObject.create({
      textName,
      name,
      disp,
      height,
      background,
      time: new Date().getTime()
    }).then(data => {
      return data._id
    })
  }
  /**
   * 更新项目数据
   */
  async updateById(data) {
    const {
      objectId,
      height,
      background,
      textName,
      name,
      titlePage,
      parentDisp
    } = data
    console.log(data)
    try {
      let res = await this.ctx.model.ActivityObject.findOne({ name })
      console.log('3123123', res)
      if (res == null || res._id == objectId) {
        await this.ctx.model.ActivityObject.update(
          { _id: objectId },
          { height, background, titlePage, textName, name, disp: parentDisp }
        )
        return '更新项目成功'
      } else {
        return Promise.reject(new Error('路由名称重复,请修改路由名'))
      }
    } catch (err) {
      console.log(err)

      return err
    }
  }
  /**
   * 删除项目
   * @param {String} name
   */
  async deleteObj(name) {
    try {
      await this.ctx.model.ActivityObject.remove({ name })
      await this.ctx.model.ActivityData.remove({ objectName: name })
      return '删除成功'
    } catch (err) {
      return err
    }
  }
}

module.exports = activityObjectService
