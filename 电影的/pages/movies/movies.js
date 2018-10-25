// pages/movies/movies.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowfilm:'',
    soonfilm:''
  },

  navigator:function(e){
    // console.log(e.currentTarget.dataset.url);
    app.globalData.moveUrl = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../moviesDetail/moviesDetail',
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '最新影视资讯' }) 
     wx.getStorage({
       key: 'film',
       success: (res)=> {
         console.log("缓存成功");
        //  console.log(res.data[0].data[0].iconlinkUrl);
         this.setData({
           soonfilm:res.data[1].data,
           nowfilm:res.data[0].data
         })
       },
       fail:()=>{
         console.log("失败");
         wx.request({
           url: 'https://op.juhe.cn/onebox/movie/pmovie',
           data: {
             key: 'c687dc15a24fe212eb1c6968a8c23346',
             city: '北京'
           },
           success: (res) => {
             console.log(res);
             wx.setStorage({
               key: 'film',
               data: res.data.result.data,
             })
             let soonfilm = res.data.result.data[1].data;
             let nowfilm = res.data.result.data[0].data;
             this.setData({
               soonfilm,
               nowfilm
             })
           }
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