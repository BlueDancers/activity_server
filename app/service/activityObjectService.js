'use strict';

const Service = require('egg').Service;

class activityObjectService extends Service {
  async FindAll() {
    return await this.ctx.model.ActivityObject.find({});
  }
  async setActivityData(name, disp, height, background, textName) {
    const ActivityList = await this.ctx.model.ActivityObject.find({
      name,
    });
    if (ActivityList.length > 0) {
      return Promise.reject(new Error('当前项目已经存在'));
    }
    return await this.ctx.model.ActivityObject.create({
      textName,
      name,
      disp,
      height,
      background,
      time: new Date().getTime(),
    }).then(() => {
      return name;
    });
  }
  /**
   * 更新项目高度
   * @param {String} objName 项目名称
   * @param {Number} height 项目高度
   * @param {String} background 页面背景色
   */
  async updateByName(objName, height, background) {
    try {
      await this.ctx.model.ActivityObject.update(
        { name: objName },
        { height, background }
      );
      return '更新项目成功';
    } catch (err) {
      return err;
    }
  }
}

module.exports = activityObjectService;
