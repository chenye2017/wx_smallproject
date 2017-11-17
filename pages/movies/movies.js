var util = require('../../utils/star.js');
var globalData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheater : {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheaterUrl = globalData.globalData.doubanApi + '/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = globalData.globalData.doubanApi + '/v2/movie/coming_soon?start=0&count=3';
    var top250Url = globalData.globalData.doubanApi + '/v2/movie/top250?start=0&count=3';
    this.getMovieInfo(inTheaterUrl, 'inTheater', '正在热映');
    this.getMovieInfo(comingSoonUrl, 'comingSoon', '即将上映');
    this.getMovieInfo(top250Url, 'top250', 'top250');
  },

  getMovieInfo: function(url, key, category) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type":"json"
      },
      method: 'GET',
      success: function(res) {
        //console.log(res);
        that.handleMovieInfo(res, key, category);
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },
  handleMovieInfo: function(movieInfo, key, category) {
      var Movies = [];
      for (var index in movieInfo.data.subjects) {
        var movie = new Object(); console.log(movieInfo.data.subjects[index]);
        movie.image = movieInfo.data.subjects[index].images.large;
        movie.title = movieInfo.data.subjects[index].title;
        movie.score = movieInfo.data.subjects[index].rating.average;
        movie.scoreArr = util.countStar(movie.score);
        console.log(util.countStar(movie.score));
        Movies.push(movie);
      }
      var allMovie = {};
      allMovie[key] = {movies:Movies, category:category};
      this.setData(allMovie);
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
    
  }
})