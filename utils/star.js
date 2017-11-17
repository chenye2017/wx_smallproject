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
module.exports = {
  countStar: countStar
}