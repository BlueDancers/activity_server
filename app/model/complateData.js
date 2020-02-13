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
    name: { type: String }, // dom元素映射关系
    inputName: { type: String }, // 文本框存在的名字,用户表单提交
    placeholder: { type: String }, // 文本框占位符
    text: { type: String }, // dom元素具体文字
    btnType: { type: Number }, // 0 无事件 1 外部链接 2 提交表单
    refInput: { type: Array }, // 提交的表单名
    inputFromUrl: { type: String }, // 提交的接口地址
    QQNum: { type: String }, // 客服QQ
    PhoneNum: { type: String }, // 客服电话
    urlMethod: { type: String }, // 请求方式
    link: { type: String }, // 点击跳转地址
    css: { type: Object }, // 数据
  });
  return mongoose.model('complateData', complateData);
};
