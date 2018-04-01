/**
 * REF: https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/
 */



/**
 * GET
 */

// 向具有指定ID的用户发出请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// 也可以通过 params 对象传递参数
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });



/**
 * POST
 */

axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


/**
 * 多个并发请求
 */
function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    //两个请求现已完成
  }));





/**
 * 添加请求拦截器
 * https://www.jianshu.com/p/4445595488e2
 */
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}


//添加请求拦截器
axios.interceptors.request.use(config => {
  removePending(config); //在一个ajax发送前执行一下取消操作
  config.cancelToken = new cancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: config.url + '&' + config.method, f: c });
  });
  return config;
}, error => {
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(response => {
  removePending(res.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  return response;
}, error => {
  return { data: {} }; //返回一个空对象，主要是防止控制台报错
});
