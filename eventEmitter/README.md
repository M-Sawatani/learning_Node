# ○EventEmitterの基本機能

## ・イベント処理の設定
```
    EventEmitter.on(name, listener)
    EventEmitter.once(name, listener)
```

## ・イベント処理の削除
```
    EventEmitter.off(name, listener)
```

## ・イベントの発火
```
    EventEmitter.emit(name, args)
```


# ○EventEmitter利用上の注意

- 1度発火したイベントはoffで止めることはできない ＝ ロジックで止めないといけない
- function関数とアロー関数で this が変わる
- emit()で呼び出される処理はon()で設定された処理の順に同期的に呼び出される

# 演習
1. 2秒ごとに "tick"イベント を発火する「Clock」クラスを作成
    - clock.js を作成
      - construcrot() intervalとtimerのメンバ変数を初期化
      - start()       タイマーを開始
      - stop()        タイマーを停止
2. 実際に「Clock」クラスを使って2秒ごとにカウントアップしてみる