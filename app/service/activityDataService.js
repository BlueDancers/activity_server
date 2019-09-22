'use strict';

const Service = require('egg').Service;

class activityDataService extends Service {
  /**
   * 查询全部
   */
  async FindAll() {
    return await this.ctx.model.ActivityData.find({});
  }
  async setActivityData(data) {
    return await this.ctx.model.ActivityData.create(data).then(
      () => '保存成功'
    );
  }
}

module.exports = activityDataService;
