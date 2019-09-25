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
      return Promise.resolve(datas);
    } else {
      return Promise.reject('无此项目,请检查项目名');
    }
  }
  async setActivityData(data) {
    console.log(data);
    let { parentName, template } = data;
    console.log(parentName, template);
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
