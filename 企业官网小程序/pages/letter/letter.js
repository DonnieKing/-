// pages/service/serviceDetail.js
import service from "../../utils/service";
import utils from "../../utils/utils";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let id = '5b699e9b042ad255db280e2e';
    service.getLetterById(id, (res) => {
      console.log(res);
      res.data.created_at = utils.formatTime(res.data.created_at, "Y年M月D日 h:m:s");

      wx.setNavigationBarTitle({
        title: res.data.title
      })
      this.setData({
        service: res.data
      })

    },
      err => {

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