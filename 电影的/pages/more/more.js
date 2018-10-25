// pages/more/more.js
import film from "../../utils/film";
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:''
  },

  focus:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  navigator:function(e){
      console.log(e);
    app.globalData.moocbaUrl = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../moocbacom/moocbacom',
     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 可以获取到 “主页，短片，影评，文字及其对应的id”
      film.getfilmByCategoryList((res) => {
        console.log(res);
        this.setData({
          categoryList: res.data.objects
        })
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