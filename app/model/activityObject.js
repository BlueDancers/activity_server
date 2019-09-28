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
  const ObjectSchema = new Schema({
    name: { type: String }, // 项目名称
    disp: { type: String }, // 项目描述
    height: { type: Number }, // 页面高度
    time: { type: Number } // 项目创建的时间
  });
  return mongoose.model('activityObject', ObjectSchema);
};
