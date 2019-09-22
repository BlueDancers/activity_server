'use strict';

const Service = require('egg').Service;

class activityObjectService extends Service {
  async FindAll() {
    return await this.ctx.model.activityObject.find({});
  }
  async setActivityData(data) {
    return await this.ctx.model.activityObject.create(data).then(
      () => '保存成功'
    );
  }
}

module.exports = activityObjectService;
