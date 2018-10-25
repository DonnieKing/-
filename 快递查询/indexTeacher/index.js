// pages/index/index.js
import config from "../../config/config";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressNo:'',   //快递单号
    expressCom:'sf', //快递公司的编号
    expressResult:[],
    expressComName:"",
    expressComData:[],
    expressComIndex:0
  },

  //获取快递单号的输入自定义事件
  expressNoInput:function(e){
    //更新expressNo的数据
    this.setData({
      expressNo:e.detail.value
    })
  },

  //获取切换快递公司的单项选择器的chang事件
  expressComChange: function (e) {
    //更新expressCom的数据
    this.setData({
      expressCom: e.detail.value
    })
  },

  comPickerChange:function(e){
    // console.log(e);
    let expressComData = this.data.expressComData;
    let index = e.detail.value;
    let expressComName = expressComData[index].com;
    let expressCom = expressComData[index].no;
    //更新expressComName和expressCom
    this.setData({
      expressComName,
      expressCom
    });
    // console.log(expressCom);
  },

  //点击查询事件
  searchBtnTap:function(){
    let no = this.data.expressNo;
    let com = this.data.expressCom;

    // console.log(no,com);

    wx.request({
      url: config.EXPRESS_API,
      data: {
        com: com,
        no: no,
        key: config.EXPRESS_API_KEY
      },
      success:(res) => {
        console.log(res.data);
        let { result, error_code,reason } = res.data;
        if(error_code == 0)
        {
          let { list } = result;
          this.setData({
             expressResult: list
          })
        }
        else
        {
          // wx.showToast({
          //   title: reason,
          //   icon: 'none',
          //   duration: 2000
          // })
          wx.showModal({
            title: '错误提示',
            content: reason,
            showCancel:false,
            confirmColor:"#1296DB",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
        
      },
      fail: function () {
        console.log("Fail");
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断expressComData是否缓存
    wx.getStorage({
      key: 'expressComData',
      success:(res) => {
          // console.log('已经缓存');
          this.setData({
            expressComData:res.data
          });
      },
      fail:()=>{
          // console.log('没有缓存');
          this.getExpressComData();
      }
    })

  },

  //获取快递公司的编号，同时缓存起来
  getExpressComData:function(){
    
    wx.request({
      url: "https://v.juhe.cn/exp/com",
      data: {
        key: config.EXPRESS_API_KEY
      },
      success: (res) => {
        // console.log(res.data);
        let { result } = res.data;
        //缓存
        wx.setStorage({
          key: 'expressComData',
          data: result,
        })
        //更新expressComData
        this.setData({
          expressComData: result
        });
      },
      fail: function () {
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