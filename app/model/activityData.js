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
    text: { type: String }, // dom元素具体文字
    css: { type: Object }, // 数据
  });
  return mongoose.model('activityData', DataSchema);
};
