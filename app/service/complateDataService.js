'use strict';

const Service = require('egg').Service;

class complateDataService extends Service {
  // 保存单个组件
  async saveComplate(data) {
    return await this.ctx.model.ComplateData.create(data)
  }
}

module.exports = complateDataService