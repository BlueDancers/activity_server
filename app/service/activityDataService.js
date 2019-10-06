'use strict';

const Service = require('egg').Service;

class activityDataService extends Service {
  /**
   * 查询全部
   */
  async FindAll() {
    return await this.ctx.model.ActivityData.find({});
  }
  /**
   * 回显数据
   * @param {string} objectName 项目名
   */
  async findByName(objectName) {
    const datas = [];
    const object = await this.ctx.model.ActivityObject.find({
      name: objectName,
    });
    if (object.length > 0) {
      const data = await this.ctx.model.ActivityData.find({ objectName });
      data.map(item => {
        let itemData = {
          name: item.name,
          text: item.text,
          css: item.css,
          id: item._id,
        };
        if (item.name === 'base-buttom') {
          itemData = {
            ...itemData,
            refInput: item.refInput,
            btnType: item.btnType,
            link: item.link,
            inputFromUrl: item.inputFromUrl,
            urlMethod: item.urlMethod,
          };
        } else if (item.name === 'base-input') {
          itemData = {
            ...itemData,
            inputName: item.inputName,
            placeholder: item.placeholder,
          };
        } else {
          itemData = {
            ...itemData,
          };
        }
        datas.push(itemData);
        return true;
      });
      const objData = {
        objHeight: object[0].height,
        background: object[0].background,
      };
      return Promise.resolve({ data: datas, ...objData });
    }
    return Promise.reject(Error('无此项目,请检查项目名'));
  }
  /**
   * 移动端获取数据 包括组件数据 以及页面高度
   * @param {string} name 项目名称
   */
  async getMobileData(name) {
    const datas = [];
    const object = await this.ctx.model.ActivityObject.find({ name });
    if (object.length > 0) {
      const data = await this.ctx.model.ActivityData.find({ objectName: name });
      data.map(item => {
        let itemData = {
          name: item.name,
          text: item.text,
          css: item.css,
        };
        if (item.name === 'base-buttom') {
          itemData = {
            ...itemData,
            refInput: item.refInput,
            btnType: item.btnType,
            link: item.link,
            inputFromUrl: item.inputFromUrl,
            urlMethod: item.urlMethod,
          };
        } else if (item.name === 'base-input') {
          itemData = {
            ...itemData,
            inputName: item.inputName,
            placeholder: item.placeholder,
          };
        } else {
          itemData = {
            ...itemData,
          };
        }
        datas.push(itemData);
        return true;
      });
      const objData = {
        objHeight: object[0].height,
        background: object[0].background,
        textName: object[0].textName,
      };
      return Promise.resolve({ ...objData, datas });
    }
    return Promise.reject(new Error('无此项目,请检查项目名'));
  }
  async setActivityData(data) {
    const { parentName, template } = data;
    await this.ctx.model.ActivityData.remove({ objectName: parentName });
    const newData = [];
    template.map(e => {
      newData.push({
        objectName: parentName,
        ...e,
      });
      return true;
    });
    return await this.ctx.model.ActivityData.create(newData).then(
      () => parentName // 将项目名称返回出去
    );
  }
}

module.exports = activityDataService;
