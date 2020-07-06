import module from './module';

/**
 * 初始化组件树所需的数据
 *
 */
class BizService {
  constructor() {
    this.modules = new Map();
  }
  static use(plugin) {
    plugin.init(this);
  }
  /**
   * 注册模块类
   */
  register(module) {
    const { name } = module;
    if (!this.modules.has(name)) {
      this.modules.set(name, module);
    }
  }
  init() {
    this.modules.forEach(module => {
      module.init();
    });
  }
}

export {
  // 业务模块原型
  module
};
