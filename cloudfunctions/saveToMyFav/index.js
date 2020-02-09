// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  evn: "quxbc"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  return await db.collection(event["collection"]).add({
    data: {
      article_name: event["articleName"],
      article_theme: event["articleTheme"],
      flag: event["flag"]
    }
  })
}