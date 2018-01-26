var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
//
var db = mongoose.connection;
db.on('error', console.error.bind(console, '链接错误'))
db.once('open', function(){
  console.log('opening')
})

/**
 * 定义 Scheme
 */
//添加属性
var PersonScheme = new mongoose.Schema({
  name: String,
  age: Number,
  company: String
})
//添加方法
PersonScheme.methods.speak = function(_greeting) {
  var greeting = this.name
    ? "My name is " + this.name
    : "I don't have a name";
  console.log(greeting + ' ' + (_greeting || ''));
}
// Entity的方法
PersonScheme.methods.findSameName = function(cb) {
  return this.model('Person').find({name: this.name}, cb);
}
//Model的静态方法
PersonScheme.statics.findByName = function(name, cb) {
  return this.find({name: new RegExp(name, 'i')}, cb);
}
/**
 * 发布 Model
 */
var PersonModel = db.model('Person', PersonScheme);

/**
 * 创建 Entity
 */
var personEntity = new PersonModel({
  name:'Addamx',
  age: 18,
  company: 'google'
});




//before save
PersonModel.find(function(err, persons){
  // console.log(persons)
})

/*
personEntity.save(function(err, person) {
  if(err) return console.error(err);
  console.log(person === personEntity); //true
  console.log(person !== this); //true
  //after save
  PersonModel.find(function(err, persons){
    console.log(persons)
  })
})
*/








/**
 * test
 */
// console.log(personEntity.name);
// personEntity.speak();
personEntity.findSameName(function(err, him){
  // console.log('findSameName:')
  // console.log(him)
})
PersonModel.findByName('AMX', function(err, him) {
  // console.log('findByName:')
  // console.log(him)
})


/**
 * # 查询
 */
//##1 带callback
PersonModel.findOne({'company': 'google'}, 'name age', function(err, person){
  console.log('%s is %s old, work in %s', person.name, person.age, person.company); //'company' 不在获取的field, 所以person.company是'undefined'
})