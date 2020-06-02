# HTTPについて
## ○URL文字列

URLの分解方法は2種類
- WHATWG URL　※　こちらが推奨
- Legacy URL



## ○HTTPサーバー
サーバーの起動
  ```JavaScript
  var http = require("http");
  // http.createServer()でサーバーインスタンスの生成
  var server = http.createServer((request, response) => {
    response.end("Hello World");
  });
  server.listen(3000); // .listen()でサーバーが起動
  ```

###  server: 
  サーバーの実態は、http.Serverというオブジェクト
### request: 
  リクエストの実態は、http.IncommingMessage
  - headers
  キーバリュー方式(キーは全て小文字)
  - method
  リクエストメソッド
  - url
  リクエストURL文字列
### response: 
  レスポンスの実態は、http.ServerResponsetというオブジェクト
  (Streamを継承しているので、書込んだデータがそのままレスポンスとなる)
  - write()
  本文データの書込み  
  `res.write(chunk[, encoding])`
    | 引数と戻り値| 説明|
    |:---|:---|
    |chunk|レスポンス本文|
    |encoding|文字エンコード|
    |return|true: streamへ書込み済み</br>false: キューへ保存(未反映)|
  - end()
  本文データの書き込み(完了)
  何も書込む内容が無くても、必ず呼ばなくてはクライアントにレスポンスが戻らないので注意！
  `res.end([chunk][, encoding])`
     | 引数と戻り値| 説明|
    |:---|:---|
    |chunk|レスポンス本文|
    |encoding|文字エンコード|
    |return|this|

  - setHeader()
  指定したヘッダーを追加または変更
  `res.setHeader(name, value)`
     | 引数と戻り値| 説明|
    |:---|:---|
    |name|ヘッダー名|
    |value|ヘッダー値|
    |return|なし|
  - removeHeader()
  不要なレスポンスヘッダーを削除
  `res.removeHeader(name)`
     | 引数と戻り値| 説明|
    |:---|:---|
    |name|ヘッダー名|
    |return|なし|

  - statusCode
  プロパティ。
  `res.statusCode`

## ○HTTPクライアント

### 【GETリクエスト】
```JavaScript
var http = require("http");
// http.request(url, options, callback)でクライアントリクエストインスタンスの生成
var request = http.request(
  "http://localhost:3000/",
  { method: "GET" },
  (response) => {
    response.pipe(process.stdout);
  });
request.end();
```
### 【POSTリクエスト】
```JavaScript
var http = require("http");
var data = "Hello World !";
var url = "http://localhost:3000/";
var options = {
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
    "Content-Length": Buffer.byteLength(data)
  }
};
var request = http.request(url, options, (response) => {
  response.pipe(process.stdout);
});
request.end(data);
```