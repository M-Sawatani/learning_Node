var msgA = require('./lib/module-a/index');
var msgB = require('./lib/module-b/index');

msgA();
msgB();
// module-aがキャッシュされているので、「Initialize module-a index.js」が一度しか表示されていない！