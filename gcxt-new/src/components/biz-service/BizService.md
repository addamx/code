# BizService
1. 属性
modules
plugins


# Module

## 分类
1. 业务组件模块：渲染到页面，editForm、flow
2. 额外模块：业务领域，contract，project，detail

## 属性
1. name
2. model
3. servcie

```js
{
  name: '模块名',
  model: ModelClass,
  service
}
```

# Plugin
1. Store
拿到module，生成页面用的store

2. eventBus
"field_changed","editForm_changed","editForm_inited"

3. effect
Effect:
1. 根据行为定义
eg.
```js
{
  name: 'get-contract',
  fun
}
```
