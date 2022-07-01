# refについて

## 使い方
### インポートする
import React, {
        useRef, useEffect
    } from 'react';

### 定義
const a = useRef(null); 

## DOMにアクセス
return(
    <div ref={a}>DOM</div>
);

a.currentと指定することでdiv要素にアクセスできるようになる。divの幅、高さを取ってきたり、D3などでDOMにグラフを描画する際に使用する。

## 子コンポーネントのインスタンスにアクセス


# player

state で　pが入る
pはnew Player

## app
textAlive アプリの情報; このプロパティがセットされていると、再生メディアをURLのクエリパラメタから取得したり、アプリのホストとの接続を試みたりします。