var { fork } = require('child_process');
var path = require('path');

var child = fork(path.join(__dirname, 'child.js'), { execArgv: [] });
child.on('close', (code) => {
  console.log(`Child process exit with ${code}`);
});