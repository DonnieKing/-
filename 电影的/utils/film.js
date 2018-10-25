//内容库操作
//获取内容详情
let getfilmByCategory = function (richTextID,cb){
  let contentGroupID = 1534124783095268;
  // let richTextID = 1534146725391327;

  let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
  MyContentGroup.getContent(richTextID).then(res => {
    // success
      cb(res);
  }, err => {
    // err
      cb(err);
  })
}

//获取内容库分类列表
let getfilmByCategoryList = function(cb){
  let contentGroupID = 1534124783095268;
  let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
  MyContentGroup.getCategoryList().then(res => {
    // success
    cb(res);
  }, err => {
    // err
  })
}

//查询，获取内容列表
let getfilmContentList = function (categoryId,cb){
  let contentGroupID = 1534124783095268;
  let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID);
  let query = new wx.BaaS.Query()
  query.arrayContains('categories', [categoryId])
  MyContentGroup.setQuery(query).orderBy('-created_at').find().then(res => {
    // success
    cb(res);
  }, err => {
    // err
  })
}
// 查找该内容库下的所有内容
let getAllContent = function(cb){
  let contentGroupID = 1534124783095268;
  let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID);
  MyContentGroup.orderBy('-created_at').find().then(res=>{
    cb(res);
  },err =>{
    console.log("失败");
  })
}
//搜索
let getSearchContentList = function (key, cb) {
  let contentGroupID = 1534124783095268;
  let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID);
  let query = new wx.BaaS.Query()
  // const regExp = new RegExp('^key', 'i')
  // query.matches(key, regExp)
  query.contains('title', key);
  MyContentGroup.setQuery(query).orderBy('-created_at').find().then(res => {
    // success
    cb(res);
  }, err => {
    // err
    console.log("失败");
  })
}
//对收藏表操作
//获取
let getAllCollectionTopic = function (recordID,cb){
  let MyTableObject = new wx.BaaS.TableObject(48087);
  let id = recordID;
  MyTableObject.get(id).then(res => {
    // success
    cb(res);
  }, err => {
    // err
  })
}
//收藏表查询（不设置查询条件，全部查询出来）
let getquery = function(cb){
  let Product = new wx.BaaS.TableObject(48087);
  Product.orderBy('-created_at').find().then(res => {
    // success
    cb(res);
  }, err => {
    // err
  })
}
//查询
let getTopicByUid = function (topicId, cb) {
  let Topic = new wx.BaaS.TableObject(48087);
  let query = new wx.BaaS.Query();
  query.compare("topicid", "=", topicId);
  Topic.setQuery(query).find().then(res => {
    // success
    cb(res)
  }, err => {
    // err
  })
}
//新增
let addtopic = function (obj, cb) {
  let Topic = new wx.BaaS.TableObject(48087);
  let Record = Topic.create();
  Record.set(obj).save().then(res => {
    // success
    cb(res)
  }, err => {
    // err
  })
}
//删除单个
let deletetopic = function (ID, cb) {
  let Topic = new wx.BaaS.TableObject(48087);

  Topic.delete(ID).then(res => {
    // success
    cb(res)
  }, err => {
    // err
  })
}


//对已读表操作
//获取
let getAllReadTopic = function (recordID, cb) {
  let MyTableObject = new wx.BaaS.TableObject(48088);
  let id = recordID;
  Product.get(id).then(res => {
    // success
    cb(res);
  }, err => {
    // err
  })
}
//已读表查询（不设置查询条件，全部查询出来）
let getReadquery = function (cb) {
  let Product = new wx.BaaS.TableObject(48088);
  Product.orderBy('-created_at').find().then(res => {
    // success
    cb(res);
  }, err => {
    // err
  })
}
//查询
let getReadTopicByUid = function (topicId, cb) {
  let Topic = new wx.BaaS.TableObject(48088);
  let query = new wx.BaaS.Query();
  query.compare("topicid", "=", topicId);
  Topic.setQuery(query).find().then(res => {
    // success
    cb(res)
  }, err => {
    // err
  })
}
//新增
let addReadtopic = function (obj, cb) {
  let Topic = new wx.BaaS.TableObject(48088);
  let Record = Topic.create();
  Record.set(obj).save().then(res => {
    // success
    cb(res)
  }, err => {
    // err
  })
}
//删除单个
let deleteReadtopic = function (ID, cb) {
  let Topic = new wx.BaaS.TableObject(48088);

  Topic.delete(ID).then(res => {
    // success
    cb(res)
  }, err => {
    // err
  })
}

//电影表
//查询
let  getSearchMovies = function(keyWord,cb){
  let MyTableObject = new wx.BaaS.TableObject(48592);
  let query = new wx.BaaS.Query();
  query.compare('title', '=', keyWord);
  MyTableObject.setQuery(query).find().then(res => {
    // success
    cb(res);
  }, err => {
    // err
  })
}


module.exports = {
  getfilmByCategory,
  getfilmByCategoryList,
  getfilmContentList,
  getAllCollectionTopic,
  getquery,
  getTopicByUid,
  addtopic,
  deletetopic,
  getAllReadTopic,
  getReadquery,
  addReadtopic,
  deleteReadtopic,
  getReadTopicByUid,
  getSearchContentList,
  getAllContent,
  getSearchMovies
  
}