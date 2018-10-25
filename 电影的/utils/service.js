
let getServices = function(cb,num=10){
  let tableID = 46989;
  let ServiceTable = new wx.BaaS.TableObject(tableID)
  let query = new wx.BaaS.Query()
  query.compare("status", "=", 1);
  ServiceTable.setQuery(query).limit(num).orderBy('sort').find().then(res=>{
     console.log(res);
     cb(res)
  },
  err=>{

  })
}

let getServiceById = function(id,cb){
  let contentGroupID = 1534124783095268;
  let richTextID = id;
  let Service = new wx.BaaS.ContentGroup(contentGroupID);
  Service.getContent(richTextID).then(res=>{
      cb(res)
  },
  err=>{

  })
}

let getLetterById = function (id, cb) {
  let tableID = 47000;
  let Service = new wx.BaaS.TableObject(tableID)
  Service.get(id).then(res => {
    cb(res)
  },
    err => {

    })
}

module.exports={
  getServices,
  getServiceById,
  getLetterById
}