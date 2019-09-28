'use strict';

const Controller = require('egg').Controller;

class activityObjectController extends Controller {
  async getAllObject() {
    const { ctx } = this;
    let data = await ctx.service.activityObjectService.FindAll();
    ctx.body = {
      data,
      code: 200
    };
  }
  async setObject() {
    const { ctx } = this;
    let { name, disp, height } = ctx.request.body;
    await ctx.service.activityObjectService
      .setActivityData(name, disp, height)
      .then(result => {
        ctx.body = {
          data: result,
          code: 200
        };
      })
      .catch(err => {
        ctx.body = {
          data: err,
          code: 500
        };
      });
  }
  // 更新项目高度
  async updateObjectHeight() {
    const { ctx } = this;
    let { height, objectName } = ctx.request.body;
    console.log(height, objectName);
    await ctx.service.activityObjectService
      .updateByNameHeight(objectName, height)
      .then(result => {
        ctx.body = {
          data: result,
          code: 200
        };
      })
      .catch(err => {
        ctx.body = {
          data: err,
          code: 500
        };
      });
  }
}

module.exports = activityObjectController;