var util = require('../../utils/star.js');
var globalData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheater : {},
    comingSoon: {},
    top250: {},
    issearch : false,
    isMovie: true,
    searchMovie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheaterUrl = globalData.globalData.doubanApi + '/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = globalData.globalData.doubanApi + '/v2/movie/coming_soon?start=0&count=3';
    var top250Url = globalData.globalData.doubanApi + '/v2/movie/top250?start=0&count=3';
    this.getMovieInfo(inTheaterUrl, 'inTheater', '正在热映', 1);
    this.getMovieInfo(comingSoonUrl, 'comingSoon', '即将上映', 2);
    this.getMovieInfo(top250Url, 'top250', 'top250', 3);
  },

  getMovieInfo: function(url, key, category, numCategory) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "json"
      },
      method: 'GET',
      success: function (res) {
        //console.log(res);
        that.handleMovieInfo(res, key, category, numCategory);
        //callback(res);
      },
      fail: function (res) {
        //console.log(res);
      }
    })
  },
  handleMovieInfo: function(movieInfo, key, category, numCategory) {
      var Movies = [];
      for (var index in movieInfo.data.subjects) {
        var movie = new Object(); //console.log(movieInfo.data.subjects[index]);
        movie.image = movieInfo.data.subjects[index].images.large;
        if (movieInfo.data.subjects[index].title.length > 6) {
          movie.title = movieInfo.data.subjects[index].title.substring(0, 6) + '...';
        } else {
          movie.title = movieInfo.data.subjects[index].title;
        }
        movie.score = movieInfo.data.subjects[index].rating.average;
        movie.scoreArr = util.countStar(movie.score);
        //console.log(util.countStar(movie.score));
        Movies.push(movie);
      }
      var allMovie = {};
      allMovie[key] = {movies:Movies, category:category, numCategory:numCategory};
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
    
  },
  onMore: function(event) {
    //console.log(event);
    var numCategory = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more/more?numCategory='+numCategory,
    })
  },
  onFocus: function() {
      this.setData({
        issearch: true,
        isMovie : false
      })
  },
  onCancel: function() {
    this.setData({
      issearch: false,
      isMovie:true,
      searchMovie: {}
    })
  },
  bindConfirm: function(res) {
    var content = res.detail.value;
    var url = globalData.globalData.doubanApi + '/v2/movie/search?q='+content;
    util.http(url, this.searchMovie)
  },
  searchMovie:function(res) {
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
  
    var searchMovie = {movies : Movies};
    this.setData({
      searchMovie: searchMovie
    });
  }
})