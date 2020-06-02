# マルチスレッド処理

## ○Child Process を利用したマルチスレッドマルチスレッド処理実装方法

- 親プロセス（index.js）
```JavaScript
var { fork } = require("child_process");
var path = require("path");
 
var subproc = fork(path.join(__dirname, "sub.js"), { execArgv: [] });
subproc.on("message", (msg) => {
  console.log(`PARENT recived message: [${JSON.stringify(msg)}]`);
});
subproc.on("close", (code) => {
  console.log(`Child process exited with code [${code}]`);
});
subproc.send({ hello: "child from parent." });
```

- 子プロセス（child.js）
```JavaScript
process.on("message", (msg) => {
  console.log(`CHILD recived message: [${JSON.stringify(msg)}]`);
});
 
setTimeout(() => {
  process.send({ hello: "parent from child." });
  process.exit();
}, 3000);
```

## ○マルチスレッド処理を実装する際の注意点
- 小さく軽い処理はマルチスレッド化しない
- ファイルI/Oをマルチスレッド化しない



## ○プロセス間通信を行う方法
- `.send(<object>)`でメッセージ送信
- `.on("message", (<object>) => { })`でメッセージ受信