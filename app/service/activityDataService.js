'use strict'

const Service = require('egg').Service

class activityDataService extends Service {
  /**
   * 查询全部
   */
  async FindAll() {
    return await this.ctx.model.ActivityData.find({})
  }
  /**
   * 回显数据
   * @param {string} objectName 项目名
   */
  async findByName(objectName) {
    const object = await this.ctx.model.ActivityObject.find({
      name: objectName
    })
    if (object.length > 0) {
      const data = await this.ctx.model.ActivityData.find({ objectName })
      const objData = {
        objHeight: object[0].height,
        background: object[0].background
      }
      return Promise.resolve({ data, ...objData })
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
      const data = await this.ctx.model.ActivityData.find({ objectName: name })
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
    const { parentName, template } = data
    await this.ctx.model.ActivityData.remove({ objectName: parentName })
    const newData = []
    template.map(e => {
      newData.push({
        objectName: parentName,
        ...e
      })
      return true
    })
    return await this.ctx.model.ActivityData.create(newData).then(
      () => parentName // 将项目名称返回出去
    )
  }
}

module.exports = activityDataService
