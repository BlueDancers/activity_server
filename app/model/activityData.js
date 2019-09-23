'use strict';
/**
 * @param {Egg.model} app - 项目具体布局表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  /**
   * objectName 为项目名 与主表
   */
  const DataSchema = new Schema({
    objectName: { type: String },
    name: { type: String },
    text: { type: String },
    css: { type: Object },
  });
  return mongoose.model('activityData', DataSchema);
};
