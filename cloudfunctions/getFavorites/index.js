// 云函数入口文件
//获取文章名字和字段
const cloud = require('wx-server-sdk')

cloud.init(
  {env:"qsxbc"}
)
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection(event.collection).field({ article_name: true, article_theme: true,flag:true }).get()
}