 // http://www.bingshangroup.com/blog/2019/12/09/zhou/IoC/
 // http://www.bingshangroup.com/blog/2019/12/09/zhou/DI/
 // https://angular.cn/guide/dependency-injection-providers
 // https://github.com/angular/di.js
 // https://juejin.im/post/590d5f502f301e006c145f01
 // https://zhuanlan.zhihu.com/p/72323250
 // https://zhuanlan.zhihu.com/p/53832991

import Injectable from './Injectable';
import InstanceType from './constants'

const defaultProvideConfig = {
  type: InstanceType.singleton
}

/**
 * 
 */
export default class Ioc {
  constructor(config = {}) {
    this.tokens = new Map();
    const { provide: provideConfig } = config;
    // init injectable/provide config
    this.provideConfig = {
      ...defaultProvideConfig,
      ...provideConfig,
    }
  }
  getDep(token) {

  }
  setDep(token) {

  }
  injectable() {
    return (target) => {
      if (typeof target !== 'function') {
        throw new Error(`请注入函数`)
      }
      const { name } = target;
      if (!this.tokens.has(name)) {
        this.tokens.set(name, new Injectable(target));
      }
    }
  }
  /**
   * 注册
   */
  provide(arg) {
    let providerName;
    let curProvideConfig;
    if (typeof arg === 'string') {
      curProvideConfig = this.provideConfig;
    } else if (typeof arg === 'object' && arg.name) {
      const { name, ...rest = {} } = arg;
      providerName = name
      curProvideConfig = {
        ...this.provideConfig,
        ...rest
      };
    }
    
    const { type } = curProvideConfig;
    const isExisted = this.tokens.get(providerName);
    if (!isExisted) {
      
    }
    switch (type) {
      case InstanceType.singleton:
        break
    }
  }
  get(token) {

  }
}

export {

}