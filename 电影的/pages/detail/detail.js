// pages/detail/detail.js
import film from "../../utils/film";
const wxParser = require('../../utils/wxParser/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:'',
    richTextID:'',
    iconPath:'../../resources/images/collection.png',
    collection:'',
    ID:0,
    objects:''
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    let that = this;
    // console.log(options.id);
    let oId =parseInt(options.id);
    // console.log(oId);


    film.getTopicByUid(oId, (res) => {    //开局获取=刷新
      if(res.data.objects == "")      //没有收藏的
      {  
        // console.log(oId);
        app.globalData.collection = false;
        that.setData({ collection: app.globalData.collection})
        // console.log('失败');
         
      }
      else{                   //收藏的
      // console.log(res);
      let ID = res.data.objects[0].id;
      // console.log(ID);
      film.getAllCollectionTopic(ID, (e) => {
        console.log(e);
      })
        app.globalData.collection = true;
        that.setData({ collection: app.globalData.collection })
      }  
    })
     

//往已读表添加数据   29-73
    let data = {
      topicid: parseInt(options.id)
    }
    film.getReadquery(res=>{
      // console.log(res);
      that.setData({
        objects: res.data.objects
      });
        if(res.data.objects == ""){
          film.addReadtopic(data, res => {
            console.log(res);
            let objects = [];
            objects.push(res.data);

            that.setData({objects})
          })
        }
        else{ 
          // console.log(oId);
          film.getReadTopicByUid(oId,res=>{
            // console.log("ok");
            if(res.data.objects == ""){
              film.addReadtopic(data, res => {
                // console.log(res);
                let objects = [];
                objects.push(res.data);
                that.setData({ objects })
              })
            }
            else{
            let TopicId = res.data.objects[0].topicid;
            if (oId == TopicId)
            {
                return;
            }else
            {
              film.addReadtopic(data,res=>{
                console.log(res);
              })
            }
            }
          })
          
        }
    })
    

    app.globalData.readTopicId.push(options.id);

      if(app.globalData.topic == options.id){
        wx.getStorage({
          key: 'collection',
          success: function (res) {
            console.log("ok");
            that.setData({
              collection: res.data
            });
          },
        })
      }
      let richTextID = parseInt(options.id);
    
    film.getfilmByCategory(richTextID,(res)=>{
      // console.log(res);

      let html = res.data.content
      wxParser.parse({
        bind: 'content',
        html: html,
        target: this,
        enablePreviewImage: true, // 禁用图片预览功能       
      })

       this.setData({                 //获取内容详情
          information:res.data,
          richTextID,
          // collection: app.globalData.deletecollection
       })
    })
    
 
 
  },

// 点击图片的收藏事件 这里使用的是同步的方式
  toCollect: function (event) {

    

    console.log(app.globalData.collection);
    if (!app.globalData.collection){
        let richTextID = this.data.richTextID;
        let data = {
            topicid:richTextID
        }
        // currentCache = !currentCache;
        //从收藏表里添加
        film.addtopic(data,res=>{
           console.log(res);
        })         
      }
      else{
        //从收藏表里删除
        let richTextID = this.data.richTextID;
        // currentCache = !currentCache;
        
        film.getTopicByUid(richTextID, (res) => {
          console.log(res); 
          // this.setData({
          //   information: res.data.objects,
          // })

          let topic = res.data.objects
          topic.forEach((value) => {
            if (value.topicid == richTextID) {
              let ID = value.id;
              console.log(ID);
              this.setData({
                ID
              })
            }
          })
          let ID = this.data.ID;
          console.log(ID);
          film.deletetopic(ID, res => {
            console.log(res);
          })

        })       
      }
  // 取反，收藏的变成未收藏 未收藏的变成收藏
    app.globalData.collection = !app.globalData.collection;
   
    this.setData({
      // collection 默认的是 false
      collection: app.globalData.collection
    });

    wx.showToast({
      title: app.globalData.collection ? '收藏' : '取消',
      icon: 'success',
      duration: 2000
    });

  },
 

  
  
 // 获取数据
  fetchTopicList: function () {
    let richTextID = this.data.richTextID;
    film.getTopicByUid(richTextID, (res) => {
      console.log(res);
      // console.log(res.data.objects);   
      this.setData({
        information: res.data.objects,
      })
    })
  },


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
   
  }
  
})