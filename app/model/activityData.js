/*
 * @Author: your name
 * @Date: 2020-02-22 12:50:34
 * @LastEditTime: 2020-03-09 22:19:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/model/activityData.js
 */
'use strict'
/**
 * @param {Egg.model} app - 项目具体布局表
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  /**
   * 项目内部数据模型
   */
  const DataSchema = new Schema({
    objectName: { type: String }, // 项目名称
    name: { type: String }, // dom元素映射关系
    text: { type: String }, // dom元素具体文字
    css: { type: Object }, // 样式集合
    option: { type: Object }, // 数据集合
    animation: {type: Object}, // 动画集合
  })

  return mongoose.model('activityData', DataSchema)
}
