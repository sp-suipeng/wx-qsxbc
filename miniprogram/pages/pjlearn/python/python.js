// miniprogram/pages/pjlearn/python/python.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    //用户集合名字
    user_favorite: '',
    screenWidth: 375,
    //条目的左边距距离屏幕
    arr: [],
    //触摸的条目索引
    _index: 0,
    Mstart: 0,
    Mmove: 0,
    Mend: 0,
    buttonRight: -70,
    //按钮右边距
    buttonLeft: []
  },
  /**
   * 收藏响应函数
   */
  saveToFav:function()
  {
    
       console.log(this.data.user_favorite)
    wx.cloud.callFunction({
      name:"saveToMyFav",
      data:{
        collection:this.data.user_favorite,
        articleName:this.data.array[this.data._index]["article_name"],
        articleTheme: this.data.array[this.data._index]["article_theme"],
        flag: this.data.array[this.data._index]["flag"]
      },
      success:res=>{
        console.log(res.result)
        console.log(2)
      },
      fail:console.error
    })
    
  },


   /*  * 手指触摸开始
     */
  touchStart: function (e) {
    this.setData({
      _index: e.currentTarget.dataset.index,
      Mstart: e.changedTouches[0].pageX
    })

  },
  /**
   * 手指向左移动
   */
  touchMove: function (e) {
    //列表项数组
    let _arr = this.data.arr;
    //手指在屏幕上移动的距离
    //移动距离 = 触摸的位置 - 移动后的触摸位置
    let move = this.data.Mstart - e.changedTouches[0].pageX;

    // 这里就使用到我们之前记录的索引index
    //比如你滑动第一个列表项index就是0，第二个列表项就是1，···
    //通过index我们就可以很准确的获得当前触发的元素，当然我们需要在事前为数组list的每一项元素添加x属性
    //只允许左滑


  },
  touchEnd: function (e) {
    let _arr = this.data.arr;
    //清空arr
    let move = this.data.Mstart - e.changedTouches[0].pageX;
    //左滑
    let budel = this.data.buttonLeft
    if (move > 0 && move > 20) {
      _arr[this.data._index] = 70;
      budel[this.data._index] = this.data.screenWidth - 70;
      this.setData({
        arr: _arr,
        buttonLeft: budel
      });
      //右滑
    } else if (move < 0 && move < -10) {
      budel[this.data._index] = this.data.screenWidth;
      _arr[this.data._index] = 0;
      this.setData({
        arr: _arr,
        buttonLeft: budel
      }

      );
    }
    


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: res => {
        this.setData({
          user_favorite: res.userInfo.nickName + "favorite"
        })
      }
    })
    //调用云函数获取python的文章
    //获取系统屏幕宽度
    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenWidth: res.screenWidth
        })
      },
    })
    wx.cloud.callFunction(
      {
        name: "getFavorites",
        data: {
          collection: "python_articles"
        },
        success: res => {
          let result = [];
          //避免云函数出错
          if (res.result == null) {
            wx.cloud.database().collection("python_articles").field({ article_name: true, article_theme: true }).get().then(res => { result = res.data });
          } else {
            result = res.result.data;
          }
          this.setData({ array: result })
          //建立左边距矩阵
          let _arr = []
          let budel = []
          for (let i = 0; i < result.length; ++i) {
            _arr[i] = 0;
            budel[i] = this.data.screenWidth
          }
          this.setData({
            arr: _arr,
            buttonLeft: budel
          })
          // console.log(result)
        }
      }
    )
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.setNavigationBarTitle({
      title: '正在刷新',
    })
    //这里插入刷新代码
    //获取系统屏幕宽度
    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenWidth: res.screenWidth
        })
      },
    })
    //调用云函数获取python的文章

    wx.cloud.callFunction(
      {
        name: "getFavorites",
        data: {
          collection: "python_articles"
        },
        success: res => {
          let result = [];
          //避免云函数出错
          if (res.result == null) {
            wx.cloud.database().collection("python_articles").field({ article_name: true, article_theme: true }).get().then(res => { result = res.data });
          } else {
            result = res.result.data;
          }
          this.setData({ array: result })
          //建立左边距矩阵
          let _arr = []
          let budel = []
          for (let i = 0; i < result.length; ++i) {
            _arr[i] = 0;
            budel[i] = this.data.screenWidth
          }
          this.setData({
            arr: _arr,
            buttonLeft: budel
          })
          // console.log(result)
        }
      }
    )
    wx.hideNavigationBarLoading() //完成停止加载


    wx.setNavigationBarTitle({
      title: '刷新成功',
    })
    setTimeout(() => {
      wx.stopPullDownRefresh() //停止下拉刷新
      wx.setNavigationBarTitle({
        title: '学得快编程',
      })
    }, 1000)
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