'use strict';

const Service = require('egg').Service;

class activityDataService extends Service {
  /**
   * 查询全部
   */
  async FindAll() {
    return await this.ctx.model.ActivityData.find({});
  }
  async findByName(objectName) {
    let datas = [];
    let object = await this.ctx.model.ActivityObject.find({ name: objectName });
    if (object.length > 0) {
      let data = await this.ctx.model.ActivityData.find({ objectName });
      data.map(item => {
        datas.push({
          name: item.name,
          text: item.text,
          css: item.css,
          id: item._id
        });
      });
      return Promise.resolve({ data: datas, objHeight: object[0].height });
    } else {
      return Promise.reject('无此项目,请检查项目名');
    }
  }
  /**
   * 移动端获取数据
   */
  async getMobileData(name) {
    let datas = [];
    let object = await this.ctx.model.ActivityObject.find({ name });
    if (object.length > 0) {
      let data = await this.ctx.model.ActivityData.find({ objectName: name });
      console.log('数据', data);
      data.map(item => {
        datas.push({
          name: item.name,
          text: item.text,
          css: item.css
        });
      });
      return Promise.resolve(datas);
    } else {
      return Promise.reject('无此项目,请检查项目名');
    }
  }
  async setActivityData(data) {
    let { parentName, template } = data;
    await this.ctx.model.ActivityData.remove({ objectName: parentName });
    let newData = [];
    template.map(e => {
      newData.push({
        objectName: parentName,
        ...e
      });
    });
    return await this.ctx.model.ActivityData.create(newData).then(
      () => '保存成功'
    );
  }
}

module.exports = activityDataService;
