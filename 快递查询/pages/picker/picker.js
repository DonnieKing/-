// pages/picker/picker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scom: 'sf',       //快递公司编号
    sinput: 'null',   //快递单号
    expressComName:'', //快递公司名
    search: 'null',
    process: 'null',
    company: [
      // {
      //   "com": "顺丰",
      //   "no": "sf"
      //   // "checked": "true"
      // },
      // {
      //   "com": "申通",
      //   "no": "sto"
      // },
      // {
      //   "com": "圆通",
      //   "no": "yt"
      // },
      // {
      //   "com": "韵达",
      //   "no": "yd"
      // },
      // {
      //   "com": "天天",
      //   "no": "tt"
      // },
      // {
      //   "com": "中通",
      //   "no": "zto"
      // },
      // {
      //   "com": "汇通",
      //   "no": "ht"
      // },
      // {
      //   "com": "全峰",
      //   "no": "qf"
      // },
      // {
      //   "com": "德邦",
      //   "no": "db"
      // }
    ],
    index:0
  },
  comPickerChange:function(e){      
    console.log(e.detail.value );
    let company = this.data.company;
    let index =  e.detail.value;
    let expressComName = company[index].com;
    let scom = company[index].no;
    this.setData({    
      scom,
      expressComName
    });
  },

  number: function (e) {
    // console.log(e.detail.value);
    this.setData({
      sinput: e.detail.value
    })
  },
  searchbtn: function () {
    var that = this;
    var oScom = this.data.scom;
    var oInput = this.data.sinput;
    //  console.log(oScom,oInput);
    wx.request({
      url: 'https://v.juhe.cn/exp/index',
      data: {
        key: '3430c029a043878603c3024a1cc52768',
        com: oScom,
        no: oInput
      },
      success: function (res) {
        // console.log(res.data.result.list);
        let { result, error_code, reason } = res.data;
        if (error_code == 0) {
          let { list } = result;
          that.setData({
            process: list
          })
        }
        else {
          wx.showModal({
            title: '错误提示',
            content: reason,
            showCancel: false,
            confirmColor: "#1296DB",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
        key: 'company',
        success:(res)=>{
           console.log('缓存成功');
           this.setData({
             company:res.data
           });
        },
        fail:()=>{
          console.log('没有缓存');
          this.setData({
            company:this.getCompany()
          });
        }
      })
  },
  getCompany: function () {
    wx.request({
      url: "https://v.juhe.cn/exp/com",
      data: {
        key: '3430c029a043878603c3024a1cc52768'
      },
      success: (res) => {
        // console.log(res);
        let {result} = res.data;
        wx.setStorage({
           key:'company',
           data:result
        })
        this.setData({
          company:result
        });
      },
      fail:()=>{
        console.log("Fail");
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