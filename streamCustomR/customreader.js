const { Readable } = require('stream');
const randomstring = require('./randomstring.js');
const data = randomstring();

var CustomReader = class extends Readable {
  constructor(options) {
    super(options || { encoding: 'utf8' }); // 何も指定されていない場合、エンコーディングを渡してあげるとよいでしょう。
    this._current = 0;
  }

  _read(size) {
    var start = this._current;
    var end = start + size < data.length ? start + size : data.length;
    var chunk;

    try {
      chunk = data.slice(start, end);
    } catch (error) {
      process.nextTick(() => {
        this.emit('error', error);
      });
      return;
    }
    this.push(chunk);
    if (start + size < data.length) {
      this._current = end;
    } else {
      this.push(null); // nullを渡してあげることは、終了判定になる
    }
  }
};

module.exports = CustomReader;