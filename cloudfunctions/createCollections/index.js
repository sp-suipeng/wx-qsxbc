// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"qsxbc"
})

//获取数据库句柄
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  
  //创建集合
  let result='';
  try{
    result = await db.createCollection(event.collection)
  }catch (e){
    return event.collection+"集合已创建"
  }
  return result
  
  
  // const wxContext = cloud.getWXContext()
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }

}