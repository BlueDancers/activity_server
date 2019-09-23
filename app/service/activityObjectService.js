'use strict';

const Service = require('egg').Service;

class activityObjectService extends Service {
  async FindAll() {
    return await this.ctx.model.ActivityObject.find({});
  }
  async setActivityData(data) {
    const ActivityList = await this.ctx.model.ActivityObject.find({
      name: data.name
    });
    if (ActivityList.length > 0) {
      return Promise.reject('当前项目已经存在');
    }
    return await this.ctx.model.ActivityObject.create(data).then(() => {
      return data.name;
    });
  }
}

module.exports = activityObjectService;
