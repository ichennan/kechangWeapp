// pages/post/post.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _postArticle: 'Test ABC',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  clearPost: function(e) {
    console.log(e)
    this.setData({
      // _postArticle: '',
      _postArticle: ''
    })
  },

  bindinput_postArticle: function (e) {
    this.setData({
      _postArticle: e.detail.value
    })
  },

  uploadImage: function (e) {
    this.setData({
      // _postArticle: '',
      _postArticle: 'aaaaa'
    })
    alert(1);
    console.log("uploadImage ...");
  },

  submitPost: function(e){
    var ff = 'post/findAll'
    wx.request({
      url: app.globalData.__apiUrl + ff,
      method: 'POST',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(rs){
        console.log(rs.data);
      }
    })
  }

})