var app = getApp();
import film from "../../utils/film";
import service from "../../utils/service";
import utils from "../../utils/utils";
  Page({

  data:{
      key:'',
      information:''
  },

  input:function(e){
    let key = e.detail.value;
    // console.log(key);
    this.setData({key})
  },

  searchTap:function(e){
    var that = this;
    let key = this.data.key;
    

    film.getSearchContentList(key,res=>{
      // console.log(res);
      let objects = res.data.objects ;
      let information = [];
      objects.forEach(value=>{
        // console.log(value.id);
        service.getServiceById(value.id,(res)=>{
          console.log(res);
          res.data.created_at = utils.formatTime(res.data.created_at, "Y年M月D日");

           information = information.concat(res.data);
          this.setData({
            information 
          })
        },
          err => {
              console.log("请求失败");
          })

      })
      //  console.log(this.data.information);

    
      // this.setData({
      //   information:res.data.objects
      // })
    })
     
    
  },


onLoad: function (options) {
    
},
    
  })
