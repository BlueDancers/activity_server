'use strict'

const Controller = require('egg').Controller

class activityDataController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.activityDataService.FindAll()
  }
  async getActivity() {
    const { ctx } = this
    try {
      const result = await ctx.service.activityDataService.findByName(
        ctx.params.name
      )
      ctx.body = {
        data: result,
        code: 200
      }
    } catch (error) {
      ctx.body = {
        data: String(error),
        code: 500
      }
    }
  }
  async saveActivity() {
    const { ctx } = this
    const data = ctx.request.body
    const result = await ctx.service.activityDataService.setActivityData(data)
    ctx.body = {
      data: result,
      code: 200
    }
  }
  async getMobileData() {
    const { ctx } = this
    const { name } = ctx.request.body
    await ctx.service.activityDataService
      .getMobileData(name)
      .then(res => {
        ctx.body = {
          data: res,
          code: 200
        }
      })
      .catch(error => {
        ctx.body = {
          data: String(error),
          code: 500
        }
      })
  }
}

module.exports = activityDataController
