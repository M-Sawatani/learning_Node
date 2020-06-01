var path = require('path');
var fs = require('fs');
var data = ""; // 一時的なデータを入れておく変数を準備しておく

var reader = fs.createReadStream(path.join(__dirname, 'sample.txt'), 'utf8');
reader.on('data', (chunk) => { // 部分的なデータ
  data += chunk;
});

reader.on('end', () => { //すべて読み込まれたら
  console.log(data);
});

reader.resume();