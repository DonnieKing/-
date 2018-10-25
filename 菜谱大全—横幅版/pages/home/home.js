// pages/home/home.js
import cook from "../../utils/cook";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList:[], //存储所有父类的数据
    currentIndex:0, //设置默认选中的分类
    cateData:[],   //存储某一个父类下的所有子类的数据
    currentParentId:10001
  },
  //分类的点击事件
  cateChange:function(e){
      // console.log(e);
      let index = e.currentTarget.dataset.index;
      let parentId = e.currentTarget.dataset.pid;

      this.setData({
        currentIndex: index,
        currentParentId: parentId
      });

      cook.getCookCategory((res) => {

        let { result } = res;
         console.log(result);

        this.setData({
          cateData: result[0].list
        })
      }, parentId);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let parentId = this.data.currentParentId;

    cook.getCookCategory((res) => {
       console.log(res);
      let { result } = res;
      this.setData({
        cateList: result
      })
    });

    cook.getCookCategory((res) => {
      
      let { result } = res;
      console.log(result);

      this.setData({
        cateData: result[0].list
      })
    }, parentId);  
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