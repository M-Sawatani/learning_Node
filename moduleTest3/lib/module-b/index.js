var messageA = require('../module-a/index');

console.log('Initialize module-b index.js');

var messageB = () => {
  messageA();
  console.log('Hello from B');
};

module.exports = messageB;