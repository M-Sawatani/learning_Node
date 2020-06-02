// サーバーへHello World!!をPOSTリクエストして、レスポンスをコンソール表示
// エラー処理を実装、エラー内容をコンソール表示

var http = require('http');
var data = 'Hello World!!';
var url = 'http://localhost:3000';
var options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // formでPOSTしたように動作させる
    'Content-Length': Buffer.byteLength(data) // Bufferクラスにこういうものもあります。
  }
};
var req = http.request(url, options, (res) => {
  res.pipe(process.stdout);
});

// エラー処理は、リクエストのエラーイベントで記述すればOK
req.on('error', (err) => {
  console.log(err.message);
});
req.end(data);