/*
 * @Author: your name
 * @Date: 2020-03-01 16:48:58
 * @LastEditTime: 2020-03-19 19:25:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/service/activityDataService.js
 */
'use strict'

const Service = require('egg').Service

class activityDataService extends Service {
  /**
   * 回显数据
   * @param {string} objectName 项目名
   */
  async findById(parentId) {
    let object = await this.ctx.model.ActivityObject.find({
      _id: parentId
    })
    if (object.length > 0) {
      let data = await this.ctx.model.ActivityData.find({ parentId })
      console.log(JSON.parse(JSON.stringify(object)))
      object = JSON.parse(JSON.stringify(object))
      object.map((res, index) => {
        if (res.password) {
          console.log('添加效验')
          res.isAuth = true
        } else {
          res.isAuth = false
        }
        delete res.password
      })
      return { ...object[0], data }
    }
    return Promise.reject(Error('无此项目,请检查项目名'))
  }
  /**
   * 移动端获取数据 包括组件数据 以及页面高度
   * @param {string} name 项目名称
   */
  async getMobileData(name) {
    const object = await this.ctx.model.ActivityObject.find({ name })
    if (object.length > 0) {
      const data = await this.ctx.model.ActivityData.find({
        parentRouterName: name
      })
      const objData = {
        objHeight: object[0].height,
        background: object[0].background,
        textName: object[0].textName
      }
      return Promise.resolve({ ...objData, datas: data })
    }
    return Promise.reject(new Error('无此项目,请检查项目名'))
  }
  async setActivityData(data) {
    const { parentId, parentRouterName, template } = data
    await this.ctx.model.ActivityData.remove({ parentId: parentId })
    const newData = []
    template.map(temp => {
      newData.push({
        parentId: parentId,
        parentRouterName: parentRouterName,
        ...temp
      })
      return true
    })
    return await this.ctx.model.ActivityData.create(newData).then(
      () => parentRouterName // 将项目名称返回出去
    )
  }
}

module.exports = activityDataService
