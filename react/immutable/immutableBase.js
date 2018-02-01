var immutable = require('immutable');

/**
 * Immutable 的惰性操作
 */
//这里实际没有执行, 只是**声明**
var oddSquares = immutable.Seq.of(1,2,3,4,5,6,7,8)
  .filter(x => {
    console.log('immutable对象执行 filter');
    return x % 2;
  }).map(x => x * x);
//执行, 而且实现只获取1个值, 所以在filter执行3次后就停止;
console.log(oddSquares.get(1));




immutable.Map({name: 'Tom', age: 16});
immutable.List([1,2,3,4,5]);
var immutableData = immutable.fromJS([1,2,3,4,5,6]);
var jsData = immutableData.toJs()

// list or map 大小
immutableData.size;
// or
immutableData.count();


//对象合并
var imA = immutable.fromJS({ a: 1, b: 2 });
var imA = immutable.fromJS({ c: 3 });
var imC = imA.merge(imB); //{a:1,b:2,c:3}
