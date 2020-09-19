//app.js
App({
  globalData: {
    userInfo: null,
    constApiUrl: 'http://localhost:55501/kechang/',
    constContentType: 'application/json',
    globalVipId: null,
    globalIsVip: false,
    globalWeappUserInfo: {}
  },
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  checkError: function (res, errorMessage, redirectPage) {
    console.log("checkError------: " + redirectPage);
    console.log(res);
    if (res.statusCode == '401'){
      wx.setStorageSync('redirectPage', redirectPage)
      wx.switchTab({
        url: '../index/index',
      })
      return true;
    }
    if (errorMessage) {
      wx.showModal({
        title: '错误',
        content: errorMessage,
        showCancel: false
      });
    }
    return true;
  },
})