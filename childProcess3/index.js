// 親から子へメッセージ（オブジェクト）を渡して子プロセスで表示して終わる
var { fork } = require('child_process');
var path = require('path');

var child = fork(path.join(__dirname, 'child.js'), { execArgv: [] });
child.send({ hello: 'message from parent.' });
child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
})