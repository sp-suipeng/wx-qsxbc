// pages/test/test.js
Page({
  connectdb: function() {
   
    //获取数据库集合
    const db = wx.cloud.database({
      env: 'qsxbc'
    });
    //查找_id=1的记录
    const t = db.collection("users").where({
      "_id": "test"
    }).get({
      success: function(res) {
        console.log(res.data)
        getCurrentPages.setData({ttt:"你好"})
      }
    });


  },
  clickme: function() {
    this.setData({
      msg: "Nihao"
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    test: "你好"
    //ttt:"hh"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
  onReady: function() {
    setTimeout(() => {
      if (getApp().globalData.userInfo == null) {
        wx.switchTab({
          url: '../my/my',
        })
      }},2000)
    
    wx.getUserInfo({
      success: res => {
        let user = res.userInfo.nickName + "favorite";
        wx.cloud.callFunction({
          //调用云函数的名字
          name: 'createCollections',
          //传给云函数的参数
          data: {
            collection: user
          },
          //创建成功回调函数
          success: res => {
            // console.log(res.result)
          },
          fail: console.error
        })
      }
    })
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})