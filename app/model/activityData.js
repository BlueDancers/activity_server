'use strict';
/**
 * @param {Egg.model} app - 项目具体布局表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  /**
   * 项目内部数据模型
   */
  const DataSchema = new Schema({
    objectName: { type: String }, // 项目名称
    name: { type: String }, // dom元素映射关系
    inputName: { type: String }, // 文本框存在的名字,用户表单提交
    text: { type: String }, // dom元素具体文字
    btnType: { type: Number }, // 0 无事件 1 外部链接 2 提交表单
    refInput: { type: Array }, // 提交的表单名
    inputFromUrl: { type: String }, // 提交的接口地址
    urlMethod: { type: String }, // 请求方式
    link: { type: String }, // 点击跳转地址
    css: { type: Object }, // 数据
  });
  return mongoose.model('activityData', DataSchema);
};
