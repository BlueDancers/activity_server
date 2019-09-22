'use strict';

const Controller = require('egg').Controller;

class activityDataController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.activityDataService.FindAll();
  }
  async getActivity() {
    const { ctx } = this;
    ctx.body = '请求成功';
  }
  async saveActivity() {
    const { ctx } = this;
    const result = await ctx.service.activityDataService.setActivityData(
      ctx.request.body
    );
    ctx.body = result;
  }
}

module.exports = activityDataController;
