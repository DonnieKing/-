// pages/collection/collection.js
import film from "../../utils/film";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:'',
    queryList:''
  },
  deleteBtn:function(e){
    // console.log(e);
    let topicId = e.currentTarget.dataset.index;
    app.globalData.topic = topicId;
    film.getTopicByUid(topicId,res=>{
      let ID = res.data.objects[0].id;
      // console.log(ID);
      film.deletetopic(ID,(res)=>{
         console.log(res);
        this.fetchTopicList();  //删除之后重新获取
        wx.setStorage({
          key: 'collection',
          data: false 
        })
      })
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.fetchTopicList();
  },


  fetchTopicList:function(){
    var that = this;
  film.getquery(res => {
    //  console.log(res);
    if (res.data.objects == ""){
        this.setData({information:''})
    }
    let queryList = res.data.objects;
    console.log(queryList);
    this.setData({
      queryList: res.data.objects
    })
    let TopicId = [];
    queryList.forEach((value) => {
      TopicId.push(value.topicid);
    })
    // console.log(TopicId);
    let information = [];
    TopicId.forEach((value) => {
      let valueInt = parseInt(value);
      //  console.log(valueInt);
      film.getfilmByCategory(valueInt, (res) => {
        //  console.log(res);
        information.push(res.data);
        // console.log(information);
        that.setData({
          information
        })
      })
    })
  })
  }
})