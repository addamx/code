# 作用
Fetch提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 Service Workers。
Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如 CORS和HTTP的扩展。

# 与`jQuery.ajax()`的不同
- 接收到一个代表错误的 HTTP 状态码(404, 500)时, `fetch()`返回的promise不会reject, 仍是`resolve`但ok属性为false, 仅当网络故障或请求被阻止时才是`reject`
- 默认不发送或接收任何cookie, 如果站点依赖用户session, 会导致未经认证的请求的错误.

