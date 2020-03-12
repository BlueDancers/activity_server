/*
 * @Author: your name
 * @Date: 2020-02-22 12:50:34
 * @LastEditTime: 2020-03-12 09:21:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/controller/activityObjectController.js
 */
'use strict'

const Controller = require('egg').Controller

class activityObjectController extends Controller {
  async getAllObject() {
    const { ctx } = this
    const data = await ctx.service.activityObjectService.FindAll()
    ctx.body = {
      data,
      code: 200
    }
  }
  async setObject() {
    const { ctx } = this
    const { name, disp, height, background, textName } = ctx.request.body
    await ctx.service.activityObjectService
      .setActivityData(name, disp, height, background, textName)
      .then(result => {
        ctx.body = {
          data: result,
          code: 200
        }
      })
      .catch(err => {
        ctx.body = {
          data: String(err),
          code: 500
        }
      })
  }
  // 删除项目 以及组件
  async deleteObj() {
    const { ctx } = this
    const { name } = ctx.params
    await ctx.service.activityObjectService
      .deleteObj(name)
      .then(data => {
        ctx.body = {
          data,
          code: 200
        }
      })
      .catch(err => {
        ctx.body = {
          data: err,
          code: 500
        }
      })
  }
  // 更新项目相关信息
  async updateObject() {
    const { ctx } = this
    const { height, objectId, background, titlePage } = ctx.request.body
    await ctx.service.activityObjectService
      .updateById(objectId, height, background, titlePage)
      .then(result => {
        ctx.body = {
          data: result,
          code: 200
        }
      })
      .catch(err => {
        ctx.body = {
          data: String(err),
          code: 500
        }
      })
  }
}

module.exports = activityObjectController
