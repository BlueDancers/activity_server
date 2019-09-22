'use strict';

/**
 * @param {Egg.model} app - 项目表
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  /**
   * objectId 为项目id
   */
  const ObjectSchema = new Schema({
    name: { type: String },
    disp: { type: String },
  });
  return mongoose.model('activityObject', ObjectSchema);
};
