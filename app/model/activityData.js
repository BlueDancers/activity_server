'use strict';
/**
 * @param {Egg.model} app - 项目具体布局表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  /**
   * objectId 为项目id
   */
  const DataSchema = new Schema({
    name: { type: String },
    objectId: { type: String },
    text: { type: String },
    css: { type: Object },
  });
  return mongoose.model('activityData', DataSchema);
};
