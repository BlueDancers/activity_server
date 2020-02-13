'use strict';

const Controller = require('egg').Controller;


class complateController extends Controller {
  async save() {
    const { ctx } = this;
    let { complate } = ctx.request.body
    console.log(complate);
    return this.ctx.service.complateDataService.saveComplate(complate).then(res => {
      ctx.body = {
        data: '保存成功',
        code: 200,
      };
    })
      .catch(err => {
        console.log(err);
        ctx.body = {
          data: err,
          code: 500,
        };
      })
  }
  async getComplate() {
    const { ctx } = this
    return this.ctx.service.complateDataService.getComplate().then(data => {
      ctx.body = {
        data: data,
        code: 200
      }
    })
      .catch(err => {
        console.log(err);
        ctx.body = {
          data: err,
          code: 500,
        };
      })
  }
}


module.exports = complateController