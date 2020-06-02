// リクエスト情報を基に、以下のアクセス情報をコンソール表示
// ( 日時/  メソッド/  URL/ User-Agent)

// POSTリクエストだった場合、リクエストボディを返す
// それ以外の場合、sample.txtを返す

var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer((req, res) => {
  console.log(
    `[${(new Date()).toISOString()}]` +
    `${req.method} ${req.url}` +
    `${req.headers['user-agent']}`
  );

  if (req.method === 'POST') {
    req.pipe(res); // reqもストリームなので、パイプで繋げることが可能
  } else {
    var reader = fs.createReadStream(path.join(__dirname, 'sample.txt'), 'utf8');
    reader.pipe(res);
  }
  // res.end('Hello World!');
});
server.listen(3000);