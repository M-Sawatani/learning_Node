1. 以下の2メソッドを含むモジュール 「methods.js」 を作成する
    - echo(message)         引数にとった文字列をコンソール出力する
    - area(width, height)   引数で指定された大きさの面積を求める
  ※ index.js で読み込んでそれぞれ実行してみる
1. 以下のクラスをそれぞれモジュール
  「car.js」 および 「lamborgini.js」 として作成する
    - Car             基本クラス
      - name          名称を保存するプロパティ
      - drive()       "zoom zoom ..."をコンソール表示
    - Lamborgini      Carクラスを継承
      - echo()        Carクラスのdrive()を呼び出し
      - drive()       `fire ${this.name}`をコンソール表示
1. 以下のようなオブジェクトを持つ
   モジュール 「config.js」 を作成する
    - url             接続先文字列
    - retry           リトライ回数