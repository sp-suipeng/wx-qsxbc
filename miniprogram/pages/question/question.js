// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */

    data: {
      //问题图片集合
      files: [],
      //默认名字
      _nickname:"noname",
      //正在上传标志1-正在上传，0-隐藏
      upload:0,
      //1-上传成功，0-隐藏
      uploadsuccess:0,
      //问题文本
      questionText:'',
     textvalue:'22222222222222222'
    },
    //获取问题文本

  getQuestionText: function (e) {
    this.setData({
      questionText: e.detail.value
      
    })
    // console.log(e.detail.value)
  },
    uploadfiles:function()
    {
      if(getApp().globalData.userInfo==null)
      {
        wx.switchTab({
          url: '../my/my',
        })
      }
      //获取用户nickname
      wx.getUserInfo({
        success: res=> {
          


          this.setData({_nickname:res.userInfo.nickName});
          if(this.data.questionText!='')
          {
            this.setData({ upload: 1 })
            //获取数据库实例
            const db=wx.cloud.database();
            //选择集合
            const collection=db.collection("questions");
            //上传数据
            collection.add({
              data:{
                _id:this.data._nickname+Math.random().toString(),
                sendTime:Date().toString(),
                sender: this.data._nickname,
                question:this.data.questionText
              }
            }).then(
              res => { console.log(res); 
              this.setData({ textvalue: '' });
                //结束上传
                this.setData({ upload: 0 });
                //设置成功标志
                this.setData({ uploadsuccess: 1 });
                //1s后退出
                setTimeout(() => { this.setData({ uploadsuccess: 0 }) }, 1000);
              console.log(1);
              }
            
            ).catch(console.error)


          }
          //逐个上传图片
          if(this.data.files.length!=0){
            this.setData({ upload: 1 })
          
          for (let i = 0; i < this.data.files.length; ++i) {
            wx.cloud.uploadFile(
              {
                //用户名加个随机数作为文件名
                cloudPath: this.data._nickname + Math.random().toString() + ".jpg",
                filePath: this.data.files[i],
                success: res => {
                  //结束上传
                  this.setData({ upload: 0 })
                  //清空文件
                  this.setData({ files: [] })
                  //设置成功标志
                  this.setData({ uploadsuccess: 1 })
                  //1s后退出
                  setTimeout(()=>{this.setData({uploadsuccess:0})},1000)
                  
                },
                fail: console.error
              })
          }
          }
        }
      })
      
      
      
    }
    ,
    chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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