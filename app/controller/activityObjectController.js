'use strict';

const Controller = require('egg').Controller;

class activityObjectController extends Controller {
  async getAllObject() {
    const { ctx } = this;
    ctx.body = await ctx.service.activityObjectService.FindAll();
  }
  async setObject() {
    const { ctx } = this;
    await ctx.service.activityObjectService
      .setActivityData(ctx.request.body)
      .then(result => {
        ctx.body = {
          data: result,
          code: 200,
        };
      })
      .catch(err => {
        ctx.body = {
          data: err,
          code: 500,
        };
      });
  }
}

module.exports = activityObjectController;
