'use strict';

/**
 * @param {Egg.model} app - 项目表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  /**
   * 项目数据模型
   */
  const complateData = new Schema({
    compName: { type: String }, // 自定义组件名
    name: { type: String }, // dom元素映射关系
    placeholder: { type: String }, // 文本框占位符
    text: { type: String }, // dom元素具体文字
    css: { type: Object }, // 数据
  });
  return mongoose.model('complateData', complateData);
};
