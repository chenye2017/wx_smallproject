var util = require('../../../utils/star.js');
var globalData = getApp();
// pages/movies/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount:0,
    movies:[],
    url : '',
    category: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    var numCategory = options.numCategory;
    switch (numCategory) {
      case '正在热映':
        var url = globalData.globalData.doubanApi + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        var url = globalData.globalData.doubanApi + '/v2/movie/coming_soon';
        break;
      case 'top250':
        var url = globalData.globalData.doubanApi + '/v2/movie/top250';
        break;
    }
    util.http(url, this.handleData);
    this.setData({
      category: numCategory
    })
  },
  handleData(res) {
    var Movies = [];
    for (var index in res.data.subjects) {
      var movie = new Object();
      movie.image = res.data.subjects[index].images.large;
      if (res.data.subjects[index].title.length > 6) {
        movie.title = res.data.subjects[index].title.substring(0,6)+'...';
      } else {
        movie.title = res.data.subjects[index].title;
      }
      movie.score = res.data.subjects[index].rating.average;
      movie.scoreArr = util.countStar(movie.score);
      Movies.push(movie);
    }
    this.data.totalCount += 20;
    Movies = this.data.movies.concat(Movies);
  
    this.setData({
      movies:Movies});
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
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
  onReachBottom: function() {
    wx.showNavigationBarLoading();
    var totalCount = this.data.totalCount;
    switch (this.data.category) {
      case '正在热映':
        var url = globalData.globalData.doubanApi + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        var url = globalData.globalData.doubanApi + '/v2/movie/coming_soon';
        break;
      case 'top250':
        var url = globalData.globalData.doubanApi + '/v2/movie/top250';
        break;
    }
    url += '?start='+totalCount+'&count=20';
    //console.log(url);
    util.http(url, this.handleData);
  },
  onPullDownRefresh:function () {
    var movies = [];
    var numCategory = this.data.category;
    switch (numCategory) {
      case '正在热映':
        var url = globalData.globalData.doubanApi + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        var url = globalData.globalData.doubanApi + '/v2/movie/coming_soon';
        break;
      case 'top250':
        var url = globalData.globalData.doubanApi + '/v2/movie/top250';
        break;
    }
    util.http(url,this.onRefreshData);
  },
  onRefreshData: function(res) {
    var Movies = [];
    for (var index in res.data.subjects) {
      var movie = new Object();
      movie.image = res.data.subjects[index].images.large;
      if (res.data.subjects[index].title.length > 6) {
        movie.title = res.data.subjects[index].title.substring(0, 6) + '...';
      } else {
        movie.title = res.data.subjects[index].title;
      }
      movie.score = res.data.subjects[index].rating.average;
      movie.scoreArr = util.countStar(movie.score);
      Movies.push(movie);
    }
    

    this.setData({
      movies: Movies,
      totalCount : 20
    });
    wx.stopPullDownRefresh();
  } 
})