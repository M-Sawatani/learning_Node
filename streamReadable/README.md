# Streamについて

## ○パス文字列
- ディレクトリ名取得：  `path.dirname(<パス>)`
- ファイル名取得    ：  `path.basename(<パス>)`
- 拡張子名取得      ：  `path.extname(<パス>)`
- パス文字列結合    ：  `path.join(<パス1>, ...)`
- パス文字列正規化  ：  `path.normalize(<パス>)`



## ○ファイル読み書き
### 【同期処理】
  - Node.js の良いところをすべて無に帰するので利用は避ける
  ```JavaScript
  var path = require("path");
  var fs = require("fs");

  var data = fs.readFileSync(__filename, "utf8");
  fs.writeFileSync(path.join(__dirname, "out.txt"), data, "utf8");
  ```
### 【非同期処理（関数）】
  - ファイルサイズが小さく後続処理も簡易な場合に利用
  ```JavaScript
  var path = require("path");
  var fs = require("fs");
  
  fs.readFile(__filename, "utf8", (err, data) => {
    fs.writeFile(path.join(__dirname, "out.txt"), data, "utf8", (err) => {
    });
  });
  ```
### 【非同期処理（ストリーム）】

  - ファイルサイズが大きく後続処理が複雑な場合に利用
  ```JavaScript
  var path = require("path");
  var fs = require("fs");
  
  var reader = fs.createReadStream(__filename, "utf8");
  var writer = fs.createWriteStream(path.join(__dirname, "out.txt"), "utf8");
  reader.pipe(writer);
  reader.resume();
  ```

## ○カスタムストリーム

### 【読み取り】
  ```JavaScript
  const { Readable } = require("stream");
  
  var CustomReader = class extends Readable {
    constructor(options) {
      super(options || { encoding: "utf8" });
    }
    _read(size) {
      var max = this._max;
      var start = this._current;
      var end = start + size < max ? start + size : max;
      
      var chunk = getSomeRandomString(start, end);
  
      this.push(chunk);    
  
      if (start + size < max) {
        this._current = i;
      } else {
        this.push(null);
      }
    }
  }
  ```

### 【書き込み】
  ```JavaScript
  const { Writable } = require("stream");
  
  var CustomWriter = class extends Writable {
    constructor(options) {
      super(options || { decodeStrings: true });
    }
    _write(chunk, encoding, done) { // chunkはバッファで渡されるため変換が必要
      var text;
  
      if (encoding === "buffer") {
        text = chunk.toString(this._writableState.defaultEncoding); // または、options.decodeStrings = true　で文字列に直す
      }
  
    try{
      process.stdout.write(text);
    }catch(error){
      done(error);
      return;
    }  
      done();
    }
  }
  ```

## ○文字コード変換
- Shift_JIS のエンコード、デコードには「iconv-lite」を利用。

### 【関数を使ったエンコード/デコード】
#### iconv-liteを利用した変換
- Node.jsが標準でサポートしていない、日本語、中国語、韓国語、台湾語などに対応しているのが特徴
  ```JavaScript
  const iconv = require("iconv-lite");
  var data = iconv.encode(text, "shiftjis");
  text = iconv.decode(data, "shiftjis");

  // streamを使った変換は下記
  const iconv = require("iconv-lite");
  iconv.encodeStream("shiftjis");
  iconv.decodeStream("shiftjis");
  ```

#### Bufferを利用した変換
- エンコード
  ```JavaScript
  /*
  * @param text
  * @param endoding(default: 'utf8')
  */
  buffer.write(text [,encoding]);
  ```
- デコード
  ```JavaScript
    /*
    * @param endoding(default: 'utf8')
    */
  buffer.toString([encoding])
  ```
- Bufferで利用可能なエンコードの種類

  |encoding |説明  |
  |:---- |:---- |
  |ascii|7bitのアスキーデータ|
  |utf8|UTF-8文字|
  |uth16|2バイトまたは4バイトのリトルエンディアンUnicode文字|
  |ucs2|’utf16le’のエイリアス|
  |base64|Base64エンコード文字|
  |latin1|1バイトのエンコード文字|
  |binary|'latin1'のエイリアス|
  |hex|2組の16進数文字|

shiftj-jisがないことに注意！

- iconv-liteで利用可能なエンコードの種類

  |encoding |説明  |
  |:---- |:---- |
  |uth16be|UTF16-BE ビッグエディアン|
  |uth16|UTF16(BOM付)|
  |cp1252|CP1242|
  |shiftjis|Shift-JIS|
  |eucjp|EUD-JP|