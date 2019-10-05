'use strict';

const Controller = require('egg').Controller;

class activityObjectController extends Controller {
  async getAllObject() {
    const { ctx } = this;
    const data = await ctx.service.activityObjectService.FindAll();
    ctx.body = {
      data,
      code: 200,
    };
  }
  async setObject() {
    const { ctx } = this;
    const { name, disp, height, background, textName } = ctx.request.body;
    await ctx.service.activityObjectService
      .setActivityData(name, disp, height, background, textName)
      .then(result => {
        ctx.body = {
          data: result,
          code: 200,
        };
      })
      .catch(err => {
        ctx.body = {
          data: String(err),
          code: 500,
        };
      });
  }
  // 更新项目相关信息
  async updateObject() {
    const { ctx } = this;
    const { height, objectName, background } = ctx.request.body;
    await ctx.service.activityObjectService
      .updateByName(objectName, height, background)
      .then(result => {
        ctx.body = {
          data: result,
          code: 200,
        };
      })
      .catch(err => {
        ctx.body = {
          data: String(err),
          code: 500,
        };
      });
  }
}

module.exports = activityObjectController;
