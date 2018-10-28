Page({
  data: {
    inputShowed: false,//默认不获取焦点
    inputVal: ""
  },

  showInput: function () {
    this.setData({
      inputShowed: true  //设置获取焦点
    });
  },

  //点击取消事件
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false  
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  
  //搜索框的输入事件
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
});