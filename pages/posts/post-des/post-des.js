// pages/posts/post-des/post-des.js
var dataContent = require('../../../data/posts-data.js');
var globalData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postid: 0,
    isstart: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.data.postid = id;
    var content = dataContent.postList[id];

    var collects = wx.getStorageSync('collects');
    if (collects) {
      var collect = collects[id];
    } else {
      var collect = false;
      collects = new Object();
      collects[id] = false;
      wx.setStorageSync('collects', collects);
    }
    this.setData({
      content: content,
      collect: collect,
      postid: id
    })

    if (globalData.globalData.isstart && id == globalData.globalData.isstartMusic) {
      this.setData({
        isstart: true
      })
    }

    this.setMusicStatus();


  },

  setMusicStatus: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isstart: true
      })
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isstart: false
      })
    })
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
  onCollect: function () {
    var id = this.data.postid;
    var collects = wx.getStorageSync('collects'); //同步获取缓存


    var collect = collects[id];

    this.showModal(collect, id);
    // this.getStorage('collects', id);  //异步调用
  },
  getStorage: function (key, id) {
    //异步获取缓存
    var that = this;
    wx.getStorage({
      key: 'collects',
      success: function (res) {
        var collects = res.data;
        var collect = collects[id]; //只一块不用考虑res.data存不存在，因为页面加载的时候如果那个对象不存在，就会新的实例化一个对象
        that.showModal(collect, id);
      }

    })
  },
  showToast: function (collect) {
    wx.showToast({
      title: collect ? '收藏成功' : '取消收藏',
      duration: 1000,
      icon: 'success'
    })
  },
  showModal: function (collect, id) {
    var that = this;
    wx.showModal({
      title: collect ? '取消收藏' : '收藏',
      content: '',
      showCancel: true,
      success: function (res) {
        console.log(res);
        if (res.confirm == true) {
          var collects = wx.getStorageSync('collects');
          collects[id] = !collect;
          wx.setStorageSync('collects', collects);
          that.showToast(!collect);
          that.setData({
            collect: !collect
          })
        }
      }
    })
  },
  onShare: function () {
    var itemList = [
      '分享到朋友圈',
      '分享到QQ空间',
      '分享到微博',
      '分享到GitHub'
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#666699",
      success: function (res) {
        console.log(res);
        wx.showModal({
          title: '你点击了' + itemList[res.tapIndex],
          content: '',
        })
      }
    })
  },
  onMusci: function () {
    var id = this.data.postid;
    var content = dataContent.postList[id];
    var start = global.isstart;

    if (!start) {
      this.setData({
        isstart: !start
      })
      wx.playBackgroundAudio({
        dataUrl: content.music.url,
        titel: content.music.title,
        coverImgUrl: content.music.coverImg
      })
      globalData.globalData.isstart = true;
      globalData.globalData.isstartMusic = id;

    } else {
      this.setData({
        isstart: !start
      })
      wx.pauseBackgroundAudio();
      globalData.globalData.isstart = false;
    }


  }


})


