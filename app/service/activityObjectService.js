/*
 * @Author: your name
 * @Date: 2020-02-22 12:50:34
 * @LastEditTime: 2020-03-19 17:54:53
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
    let objetcList = await this.ctx.model.ActivityObject.find({})
    objetcList = JSON.parse(JSON.stringify(objetcList))
    objetcList.map((res, index) => {
      if (res.password) {
        console.log('添加效验')
        res.isAuth = true
        console.log(objetcList)
      } else {
        res.isAuth = false
      }
      delete res.password
    })
    return objetcList
  }
  /**
   * 新建项目
   * @param {String} name
   * @param {String} disp
   * @param {Number} height
   * @param {String} background
   * @param {String} textName
   */
  async setActivityData(data) {
    const ActivityList = await this.ctx.model.ActivityObject.find({
      name: data.name
    })

    if (ActivityList.length > 0) {
      return Promise.reject(new Error('当前项目已经存在'))
    }
    console.log(data)
    return await this.ctx.model.ActivityObject.create({
      ...data,
      height: 667,
      background: 'rgba(255, 255, 255, 1)',
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
   * 项目效验
   * @param {String}} pass
   */
  async objectAuth(data) {
    let objectData = await this.ctx.model.ActivityObject.findOne({
      _id: data.id
    })
    if (objectData.password == data.password) {
      return true
    } else {
      return Promise.reject(new Error('密码错误'))
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
