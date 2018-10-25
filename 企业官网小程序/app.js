App({
  onLaunch: function () {
     
    require('./utils/sdk-v1.5.0.js')
    let clientID = 'd4f53473715dbe482188'
    wx.BaaS.init(clientID)
  }
})