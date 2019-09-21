'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '你好, egg';
  }
  async getActivity() {
    const { ctx } = this;
    ctx.body = '请求成功';
  }
}

module.exports = HomeController;
