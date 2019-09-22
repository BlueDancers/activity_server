'use strict';

const Controller = require('egg').Controller;

class activityObjectController extends Controller {
  async getAllObject() {
    const { ctx } = this;
    ctx.body = await ctx.service.activityObjectService.FindAll();
  }
  async setObject() {
    const { ctx } = this;
    const result = await ctx.service.activityObjectService.setActivityData(
      ctx.request.body
    );
    ctx.body = result;
  }
}

module.exports = activityObjectController;
