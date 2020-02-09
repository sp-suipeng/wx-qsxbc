// 云函数入口文件
const cloud = require('wx-server-sdk')
//获取文章内容
cloud.init({
  env:"qsxbc"
})
const db=cloud.database()
// 云函数入口函数
//event.articleType集合名
//event.articleName文章name
exports.main = async (event, context) => {
  let name=event.articleName;
  return await db.collection(event.articleType).where({article_name:name}).get()
}