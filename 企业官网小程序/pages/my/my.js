// pages/my/my.js
const wxParser = require('../../utils/wxParser/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      company:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tableID = 46928;
    let recordID = '5b695660539c760f47f9f265' //记录Id

    let Company = new wx.BaaS.TableObject(tableID)

    Company.get(recordID).then(res => {
      // success
      console.log(res.data);
      let html = res.data.intro;
      wxParser.parse({
        bind: "intro",
        html: html,
        target: this,
        enablePreviewImage: false,
        tapLink: function (url) {
          wx.switchTab({
            url
          });
        }
      });

      this.setData({
        company: res.data
      })

    }, err => {
      // err
    })
  },

  previewImage: function (e) {
    console.log(e);
    let urls = e.currentTarget.dataset.urls;
    let current = e.currentTarget.dataset.current;
    wx.previewImage({
      current,// // 当前显示图片的https链接 
      urls     // 需要预览的图片https链接列表
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