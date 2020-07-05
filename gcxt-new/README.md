# TODO
[] 如何通过插槽插入个性化组件，修改颗粒度更细的组件

新增业务功能
1. 新增一个组件，拉取API获取初始值，渲染，校验，保存提交业务值到Detail，编辑时从Detail中回复
  - 组件的业务逻辑可能受其他组件的影响，包括API获取初始值，校验规则
  - 组件的业务值可能影响其他组件的业务逻辑
  - 组件业务值可能衍生其他业务值（EditForm selectBiz）

---



# Business Page
- 提供配置
  - 需要的注册模块
  - 提供模块配置
  - 个性化Hook
    - 修改、拦截model值改变的操作
  - 个性化组件
    - slot
- 初始化 Business 模块




# Business Service
## 初始化
- 管理子模块
  - 根据配置注册模块
  - 初始化模块的 Model 至 Business Model
  - 根据模块业务的 依赖项 决定初始化阶段的业务逻辑的执行顺序
- 拉取 calc_layout，触发子模块之间的联动


## 更新
- 监视模块的 State 变化
- （this.$nextTick，避免多次触发）再根据模块业务的 依赖项 触发业务逻辑的执行顺序

# Business Model
- 提供 Detail

# Business Component（Edit/Detail）
- Watch

# Business 子模块
- Model：由Business Model 关联
- Service：由Business Service 调用
  - 包含该模块的业务逻辑
- UI：由Business Component 渲染


# Edit Form 模块（EditForm）
## 初始化：
- 拉取layout
  - `{bizType}_{chagneType}_edit`
- 生成字段间关联关系
- 从 Detail 获取字段初始值（单据编辑时）
- 触发字段关联以便为某些字段(isEdit 0, isSave 0)赋值

## 更新：
- SelectBiz
  - 更新业务状态
    - contract
    - project
    - 。。。
  - 更新衍生业务状态
  - 渲染自身内容
  - 触发字段关联
- 一般字段
  - 触发字段关联

# 工作流 模块（Flow）
## 初始化：
- 根据 Detail 的 Contract/Project 获取最新 Flow 配置，以确定固定或自由
  - 根据 Form 值确定分支
  - 如果是打会重发：Detail 获取 Flow 配置，以确定固定或自由

## 更新
- 同初始化

## 自由流程
### 初始化
- 根据 Detail 获取 Flow 已选项

### 更新

## 固定流程
### 初始化：
- 根据 Detail 获取 Flow 已选项

### 更新



# 附件 模块（Attachment）
## 初始化
- 根据 Detail 的Contract/Project 获取最新的 restrictSetting 配置，已确定简单或附件域
  - 根据 Form 值确定附件某些域开启关闭
  - 根据 Flow 值确定附件某些域可见、可传
  - 如果是打会重发：Detail 获取 attach_setting 配置，该配置替代 restrictSetting 配置，并且已确定开启关闭、可传、可见

## 更新
- 同初始化

# 数据crud中心