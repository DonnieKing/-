// pages/read/read.js
import film from "../../utils/film";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryList:'',
    information:''
  },

  deleteBtn: function (e) {
    // console.log(e);
    let topicId = e.currentTarget.dataset.index;
    app.globalData.topic = topicId;
    film.getReadTopicByUid(topicId, res => {
      let ID = res.data.objects[0].id;
      // console.log(ID);
      film.deleteReadtopic(ID, (res) => {
        console.log(res);
        this.fetchReadTopicList();  //删除之后重新获取
        
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let topicid = [];
    topicid = app.globalData.readTopicId;
    // console.log(topicid);
    this.fetchReadTopicList();

  },

  

  fetchReadTopicList: function () {
    var that = this;
    film.getReadquery(res => {
      //  console.log(res);
      if (res.data.objects == "") {
        this.setData({ information: '' })
      }
      let queryList = res.data.objects;
      // console.log(queryList);
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