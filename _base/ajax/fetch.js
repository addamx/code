var _url = 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2508926717.jpg'

/**
 *  基本使用
 */
var myImage = document.createElement('img')

fetch(_url)
  .then(response => response.blob())
  .then(myblob => {
    let objectURL = URL.createObjectURL(myblob)
    myImage.src = objectURL
  })

document.body.appendChild(myImage);


/**
 * 自定义请求的参数 options
 */
var _url = 'https://api.github.com/users/addamx'

var myHeaders = new Headers()
var options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
}

fetch(_url, options)
  .then(response => {
    console.log(response)
  })

/**
 * response.ok
 * 检测请求是否成功
 * 因为404或者500等非网络故障返回的promise是resolve, 所以使用`catch()`无法捕捉
 */
fetch(_url)
  .then(response => {
    if (response.ok) { //检查response的状态是否在200-299(包括200,299)这个范围内
      console.log(response)
    } else {
      console.log('Network response was not ok')
    }
  })
  .catch(error => {
    console.log('网络故障' + error.message)
  })


/**
 * 自定义请求对象 new Request
 * 自定义Headers
 */

var myHeaders = new Headers({
  "content-Type": "text/plain"
})
//myHeaders.append("X-Custom-Header", "ProcessThisImmediately")
var options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
}
var myRequest = new Request('https://api.github.com/users/addamx', options)

fetch(myRequest)
  .then(response => {
    console.log(response)
  })


  /**
   * 最佳实践:
   * 1. 使用response之前应该检测 content type是否正确
   */

fetch(_url).then( response => {
  if (response.headers.get("content-type").indexOf("application/json") !== -1) {
    return response.json().then( json => {
      console.log(json)
    });
  } else {
    console.log("Oops, we haven't got JSON!");
  }
});
