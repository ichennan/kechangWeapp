//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello Nan',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    _code: null,
    _sessionKey: null,
    _unionId: null,
    _openId: null,
    _userInfo: {},
    _isVip: false,
    _vipId: null,
    _weappUserInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        console.log("wx.login");
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.data._code = res.code;
        // 获取sessionKey, openId
        var ff = 'login/fromWeapp1st';
        var postData = {};
        postData.code = that.data._code;
        console.log(ff + "------------postData");
        console.log(postData);
        wx.request({
          url: app.globalData.constApiUrl + ff,
          method: 'POST',
          data: postData,
          header: {
            'content-type': app.globalData.constContentType
          },
          success: function (rs) {
            console.log(ff + "------------rs");
            console.log(rs);
            if (rs.data.isOk) {
              that.setData({
                _openId: rs.data.openId,
                _sessionKey: rs.data.sessionKey,
                _isVip: rs.data.isVip,
                _vipId: rs.data.vipId,
                _unionId: rs.data.unionId,
                _weappUserInfo: rs.data.weappUserInfo
              })
              app.globalData.globalIsVip = that.data._isVip;
              app.globalData.globalVipId = that.data._vipId;
            }
            console.log(ff + "------------globalData");
            console.log(app.globalData);
            console.log(ff + "------------this.data");
            console.log(that.data);
          }
        })
      }
    })
  },
  getUserInfo: function (e) {
    var that = this;
    console.log("getUserInfo");
    console.log(e);
    var getUserInfoRes = e.detail;
    // 可以将 res 发送给后台解码出 unionId
    that.setData({
      _weappUserInfo: getUserInfoRes.userInfo,
      userInfo: getUserInfoRes.userInfo,
      hasUserInfo: true
    })
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    if (app.userInfoReadyCallback) {
      app.userInfoReadyCallback(getUserInfoRes)
    }
    // 获取unionId
    var ff = 'login/fromWeapp2nd';
    //do something special
    var postData = {};
    postData.encryptedData = getUserInfoRes.encryptedData;
    postData.iv = getUserInfoRes.iv;
    postData.sessionKey = that.data._sessionKey;
    console.log(ff + "------------postData");
    console.log(postData);
    wx.request({
      url: app.globalData.constApiUrl + ff,
      method: 'POST',
      data: postData,
      header: {
        'content-type': app.globalData.constContentType
      },
      success: function (rs) {
        console.log(ff + "------------rs");
        console.log(rs);
        if (rs.data.isOk) {
          that.setData({
            _isVip: rs.data.isVip,
            _vipId: rs.data.vipId,
            _unionId: rs.data.unionId
          })
          app.globalData.globalIsVip = that.data._isVip;
          app.globalData.globalVipId = that.data._vipId;
          console.log(ff + "------------globalData");
          console.log(app.globalData);
          console.log(ff + "------------this.data");
          console.log(that.data);
        }
      }
    })
  },
  getPhoneNumber(e) {
    var that = this;
    console.log("getPhoneNumber");
    console.log(e);
    var getPhoneNumberRes = e.detail;
    // 获取phone
    var ff = 'login/fromWeapp3rd';
    var postData = {};
    postData.encryptedData = getPhoneNumberRes.encryptedData;
    postData.iv = getPhoneNumberRes.iv;
    postData.sessionKey = that.data._sessionKey;
    postData.weappUserInfo = that.data._weappUserInfo;
    postData.openId = that.data._openId;
    postData.unionId = that.data._unionId;
    console.log(ff + "------------postData");
    console.log(postData);
    wx.request({
      url: app.globalData.constApiUrl + ff,
      method: 'POST',
      data: postData,
      header: {
        'content-type': app.globalData.constContentType
      },
      success: function (rs) {
        console.log(ff + "------------rs");
        console.log(rs);
        that.setData({
          _openId: rs.data.openId,
          _isVip: rs.data.isVip,
          _vipId: rs.data.vipId,
          _unionId: rs.data.unionId,
          _weappUserInfo: rs.data.weappUserInfo
        })
        app.globalData.globalIsVip = that.data._isVip;
        app.globalData.globalVipId = that.data._vipId;
        console.log(ff + "------------globalData");
        console.log(app.globalData);
        console.log(ff + "------------this.data");
        console.log(that.data);
      }
    })
  }
})