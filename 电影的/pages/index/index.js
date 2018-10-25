// pages/index/index.js
import film from "../../utils/film";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCategory:"主页",
    categoryList: [], //存储所有父类的数据
    currentIndex: 0, //设置默认选中的分类
    activeCategoryIndex: 0,//当前激活的标记点对应的index索引，默认为0
    information:[]   //首页信息
  },

  jumpTap:function(e){
    // console.log(e);
  },
  
  
  categoryChange:function(res){ 
    // console.log(res);
    let currentIndex = res.currentTarget.dataset.index;
      this.setData({
        currentIndex
      })
     
    this.fetchFilmList();
    let categoryListId = this.data.categoryList;
     
    categoryListId.forEach((value,key)=>{
       if(key == currentIndex)
       {
         film.getfilmContentList(value.id, (res) => {
            //  console.log(res);
             this.setData({
               information:res.data.objects
             })

         })
       }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // film.getfilmByCategory((res)=>{
    //   console.log(res);
    //    this.setData({                 //获取内容详情
    //       information:res.data
    //    })
    // })
    this.fetchFilmList();
    film.getfilmContentList(1534125709183346,(res)=>{
       this.setData({
         information: res.data.objects
       })
        console.log(this.data.information);

       })
     
  },

  // 可以获取到 “主页，短片，影评，文字及其对应的id”
  fetchFilmList:function(){
    film.getfilmByCategoryList((res) => {
      // console.log(res);
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