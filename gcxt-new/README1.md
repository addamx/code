# 指定重构规范、流程、计划
## 流程
- 开始之前：
  - 申明模块功能：注释
  - entity，service 的注释+JSDoc
  - 
## 模板生成器
- 

## 代码规范
- 单一职责
- 迪米特法则
  - 模块
- 推荐设计
  - 代理/中介模式
- 注释
  - JSDoc



- 框架、插件无关，可替换；
  - react、vue都可用


- PC、APP 共用的服务包
  - 业务领域：实体、服务
    - 只申明，无实例化
  - 接口层
    - 数据转换层
  - PC、APP的扩展，类继承
  

# 个性化
- hook
  - store建立新业务属性
- 小工具的个性化功能
  - 特性：
    - 实现PC、APP共用
    - store、依赖
    - 业务生命周期
  - 可能面临的问题
    - 工具函数引入
    - 可能PC、APP需要不同的输出
    - 无法添加个性化组件



form
  - 获取初始值
  - contract_id: 触发拉取contract，company_options, 渲染

插件系统
 - 参考：webpack，vue

业务控制包
 - 【需要再考虑必要性】所有需要改变store的操作，应该在更新阶段最后才真正触发
 - 初始化
 - 更新阶段
  - eg
    - 字段发生变化时，selectBiz+contract_id -> 请求 contract -> 存入store ->
      - 【依赖contract】的其他联动：
        - contract字段的text、subtext
        - 会议纪要的重置text，value


依赖注入器
- 注入service
- 注入组件到slot
- 单例 or 新建
- 嵌套的服务依赖
- 依赖倒置
- 装饰器


# DDD
https://github.com/Vincedream/ddd-fe-demo
https://juejin.im/post/5ee0332ce51d457859656cc8