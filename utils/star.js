function countStar(score) {
  var newScore = score/2;
  var scoreArr = [];
  for (var j=1; j<6; j++) {
    if (newScore >= j) {
      scoreArr.push(1);
    } else {
      scoreArr.push(0);
    }
  }
  return scoreArr
}

function http(url, callback) {
  wx.request({
    url: url,
    header: {
      "Content-Type": "json"
    },
    method: 'GET',
    success: function (res) {
      //console.log(res);
      //that.handleMovieInfo(res, key, category, numCategory);
      callback(res);
    },
    fail: function (res) {
      console.log(res);
    }
  })
}



module.exports = {
  countStar: countStar,
  http : http,
  
}