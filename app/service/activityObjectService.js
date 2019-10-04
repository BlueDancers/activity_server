'use strict';

const Service = require('egg').Service;

class activityObjectService extends Service {
  async FindAll() {
    return await this.ctx.model.ActivityObject.find({});
  }
  async setActivityData(name, disp, height) {
    const ActivityList = await this.ctx.model.ActivityObject.find({
      name,
    });
    if (ActivityList.length > 0) {
      return Promise.reject(new Error('当前项目已经存在'));
    }
    return await this.ctx.model.ActivityObject.create({
      name,
      disp,
      height,
      time: new Date().getTime(),
    }).then(() => {
      return name;
    });
  }
  /**
   * 更新项目高度
   * @param {String} objName 项目名称
   * @param {Number} height 项目高度
   */
  async updateByNameHeight(objName, height) {
    try {
      await this.ctx.model.ActivityObject.update({ name: objName }, { height });
      return '更新项目成功';
    } catch (err) {
      return err;
    }
  }
}

module.exports = activityObjectService;
