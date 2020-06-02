// サーバーへGETリクエストする
var http = require('http');

var url = 'http://localhost:3000';
var options = {
  method: 'GET'
};

var req = http.request(url, options, (res) => {
  // process.stdout: これもstream。標準出力。consoleに表示する。
  res.pipe(process.stdout);
});

req.end();