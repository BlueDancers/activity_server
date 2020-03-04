'use strict'

const Service = require('egg').Service

class complateDataService extends Service {
  // 保存单个组件
  async saveComplate(data) {
    if (data.name !== 'base-input') {
      // 只有文本框有placeholder属性
      delete data.placeholder
    }
    if (data.name == 'base-div') {
      // 只有div模块没有text属性
      delete data.text
    }
    if (data.compName == '') {
      return Promise.reject('请填写组件保存名')
    }
    let isexist = await this.ctx.model.ComplateData.find({
      compName: data.compName
    })
    if (isexist.length > 0) {
      return Promise.reject('该组件名已经存在')
    }
    return await this.ctx.model.ComplateData.create(data)
  }
  async getComplate() {
    return await this.ctx.model.ComplateData.find()
  }
  async updatesingComp(id, name) {
    return await this.ctx.model.ComplateData.update(
      { _id: id },
      { compName: name }
    )
  }
  async deletesingComp(id) {
    return await this.ctx.model.ComplateData.deleteOne({
      _id: id
    })
  }
}

module.exports = complateDataService
