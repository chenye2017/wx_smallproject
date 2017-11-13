var post_data = require('../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "Sep 12 2016"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      post_content : post_data.postList
    });
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
  onInfo: function (event) {
    wx.navigateTo({
      url: 'post-des/post-des?id=' + event.currentTarget.dataset.postid
    })
    
  },
  onDirect: function(event) {
    var id = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-des/post-des?id=' + id
    })
  }
})