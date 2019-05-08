let Mock  = require('mockjs');
let Random = Mock.Random;
module.exports = function() {
  var data = { 
      news: [],
      leaders: []
  };
  var images = [1,2,3].map(x=>Random.image('100x100', Random.color(), Random.word(1,10)));
  for (var i = 0; i < 100; i++) {
    var content = Random.cparagraph(0,10);
    data.news.push({
         id: i, 
         type: Random.integer(0,4),
         title: Random.cword(8,20),
         desc: content.substr(0,40),
         tag: Random.cword(2,6),
         views: Random.integer(100,5000),
         images: images.slice(0,Random.integer(1,3))
    })
    if(i<=10){
      data.leaders.push({ // 根据数据模板生成模拟数据
        id: i, // 随机生成一个id
        name: Mock.Random.cname(), // 随机生成一个常见的中文姓名。
        addr: Mock.mock('@county(true)'), // @county(true)为数据模板
        'age|18-60': 1, // 'age|18-60': 1 为数据模板
        birth: Mock.Random.date(), // 随机生成日期
        sex: Mock.Random.integer(0, 1), // 随机生成整数, min:0, max1,
        images: images.slice(0,Random.integer(1,3))
      })
    }
  }
  return data
}