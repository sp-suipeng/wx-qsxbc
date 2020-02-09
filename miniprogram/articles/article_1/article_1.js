// articles/article_1/article_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article_name:'',
    article_theme:'',
    article_littlenames:[""],
    article_texts:[""]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //使用options获取传过来的函数
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"getArticle",
      data:{
        //数据库集合
        articleType:options.articleType+"s",
        //记录中的字段值
        articleName:options.articleName
      },
      success:res=>{
        // console.log(options.articleType)
        // console.log(options.articleName)
        // console.log(res)
        //文章名字
        let name=options.articleName;
        let r='';
        if(res.result.data.length==0)
        {
          //获取文章失败，请重新获取
          
          wx.cloud.database().collection(options.articleType).where({ article_name:name  }).get().then(res=>{r=res.data})
          
        }else
        {
          console.log(res.result)
          r=res.result.data
        }
        this.setData({
          article_name: r[0].article_name,
          article_theme: r[0].article_theme,
          article_littlenames: r[0].article_littlenames,
          article_texts: r[0].article_texts
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})