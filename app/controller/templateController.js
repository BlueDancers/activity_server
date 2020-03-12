/*
 * @Author: your name
 * @Date: 2020-03-11 20:30:30
 * @LastEditTime: 2020-03-12 17:47:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/controller/templateController.js
 */
'use strict'

const Controller = require('egg').Controller
/**
 * 模板统一处理控制层
 */
class templateController extends Controller {
  // 获取模板列表
  async getAllObject() {
    const { ctx } = this
    const data = await ctx.service.templateObjectService.FindAll()
    ctx.body = {
      data,
      code: 200
    }
  }
  // 保存模板
  async setTemplate() {
    const { ctx } = this
    const { templateId, template } = ctx.request.body
    await ctx.service.templateObjectService
      .setTemplateData(ctx.request.body)
      .then(result => {
        // 异步存储模板数据
        ctx.service.templateDataService.setTemplateData(templateId, template)
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
    await ctx.service.templateObjectService
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
  // 获取模板数据
  async getTemplate() {
    const { ctx } = this
    try {
      const result = await ctx.service.templateDataService.findByName(
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
  // 保存模板数据
  async saveTemplate() {
    const { ctx } = this
    const data = ctx.request.body
    const result = await ctx.service.templateDataService.setTemplateData(data)
    ctx.body = {
      data: result,
      code: 200
    }
  }
}

module.exports = templateController
