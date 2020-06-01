# HTTPについて
## ○URL文字列

URLの分解方法は2種類
- WHATWG URL　※　こちらが推奨
- Legacy URL



## ○HTTPサーバー
```JavaScript
var http = require("http");
// http.reateServer()でサーバーインスタンスの生成
var server = http.createServer((request, response) => {
  response.end("Hello World");
});
server.listen(3000); // .listen()でサーバーが起動

  /*
  * server: 
    サーバーの実態は、http.Serverというオブジェクト
  * request: 
    リクエストの実態は、http.IncommingMessage
  * response: 
    レスポンスの実態は、http.ServerResponsetというオブジェクト
    (Streamを継承しているので、書込んだデータがそのままレスポンスとなる)
  */
```

## ○HTTPクライアント

### 【GETリクエスト】
```JavaScript
var http = require("http");
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