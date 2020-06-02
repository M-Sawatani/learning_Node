// 子から親へメッセージ（オブジェクト）を渡して親プロセスで表示する
var { fork } = require('child_process');
var path = require('path');

var child = fork(path.join(__dirname, 'child.js'), { exrcArgv: [] });

// childから受け取ったとき
child.on('message', (data) => {
  console.log(data);
});
// childからprocess.exit()でもらったコードを表示する
child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});