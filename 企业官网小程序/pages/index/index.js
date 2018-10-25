// pages/index/index.js
import service from "../../utils/service";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      // '../../resources/images/timg.jpg',
      // '../../resources/images/timg2.jpg'
    ],
    //所有图片的高度  
    imgheights: [],
    //图片宽度  
    imgwidth: 750,
    indicatorDots: false,
    autoplay: true,
    interval:2000,
    duration: 1000
     
  },

  imageLoad: function (e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,

      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;

    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里  
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //查询广告表的数据

    // 1、通过 tableID 实例化一个 adTable 对象，操作该对象即相当于操作对应的数据表
    let tableID = 46915;
    let adTable = new wx.BaaS.TableObject(tableID);

    //2、示例化一个 Query 对象，在该对象上添加查询条件
    let query = new wx.BaaS.Query()

    //3.支持查询条件并执行查找操作
    // query.compare('isShow', '=', 1);

    adTable.setQuery(query).orderBy('sort').find().then(res => {
      // success
      // console.log(res.data.objects)

      this.setData({
        imgUrls: res.data.objects
      })


    }, err => {
      // err

    })

    let TtableID = 46928;
    let recordID = '5b695660539c760f47f9f265' //记录Id
    let Company = new wx.BaaS.TableObject(TtableID)

    Company.get(recordID).then(res => {
      // success
      // console.log(res.data);
      this.setData({
        company: res.data
      })

    }, err => {
      // err
    })

    service.getServices((res) => {
      console.log(res)
      this.setData({
        serviceInfo: res.data.objects
      })
    },3)

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