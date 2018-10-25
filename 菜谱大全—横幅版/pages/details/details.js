// pages/details/details.js
import cook from "../../utils/cook";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DetailList:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      let Id = options.id;
      cook.getDetail((res)=>{
        console.log(res.result.data);
        this.setData({
          DetailList:res.result.data
        })
      },Id)
  }
})