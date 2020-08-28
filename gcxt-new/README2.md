editForm.contract_id.value

flow.users




# PluginDriver
1. 数据驱动业务
plugin里需要存储上一次的结果，是一个类；
每次组件commit进来都是整个form，不知道修改来源，通过数据新旧比较来确定；
因为不知道修改来源，所以每次都要执行所有plugin的比较

# EventDriver
'field_changed'
我们可以通过事件名来获知“修改来源”，“事件的属性”(来自init，还是用户changed)

- event > 确定修改的store值 > 进入相关effect
- 多重依赖（一个事件循环内）：
  - eg. flow分支依赖多个条件
  - 1. setTimeout 在新的事件循环 触发effect
  - 2. 合并触发表单素有字段改变（只针对表单）
  - 3. 初始化时，合并触发条件

# init和changed的区别


# 数据池dp
ctx.dp.getValue(key)



# 业务流程代码复杂的原因

# 解决方案
- 建立模型，精简判断代码
- 使用一种新的设计模式代替if/else，

# 思想
- saas 趋向配置化
- nestjs 模块化

# tools
- plantUml
- mobx (class 转 state management)8
