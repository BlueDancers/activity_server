/*
 * @Author: your name
 * @Date: 2020-03-11 20:23:20
 * @LastEditTime: 2020-03-11 23:23:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/service/templateDataService.js
 */
'use strict'

const Service = require('egg').Service

class templateDataService extends Service {
  /**
   * 回显数据
   * @param {string} objectName 项目名
   */
  async findByName(objectName) {
    const object = await this.ctx.model.TemplateObject.find({
      name: objectName
    })
    if (object.length > 0) {
      const data = await this.ctx.model.TemplateData.find({ objectName })
      const objData = {
        objHeight: object[0].height,
        background: object[0].background
      }
      return Promise.resolve({ data, ...objData })
    }
    return Promise.reject(Error('无此项目,请检查项目名'))
  }
  // 保存模板数据
  async setTemplateData(templateId, template) {
    const newData = []
    template.map(data => {
      newData.push({
        templateId: templateId,
        ...data
      })
    })
    return await this.ctx.model.TemplateData.create(newData).then(
      () => templateId // 将项目名称返回出去
    )
  }
}

module.exports = templateDataService
