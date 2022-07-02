import React, { useEffect, useState, useMemo, useRef } from "react";
import { Player } from "textalive-app-api";
import "./index.css"
import { PlayerControl } from "./PlayerControl";
import Three from "./three/sample";

// 歌詞サイズ
const defaultFontSize = 30;
// 歌詞色
const defaultColor = "#000";
// 歌詞フォント
const sansSerif = `"Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic, Meiryo, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif`;
const serif = `"Times New Roman", YuMincho, "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif`;

export const Body = () => {
    const [player, setPlayer] = useState(null);
    const [app, setApp] = useState(null);
    const [char, setChar] = useState("");
    const [fontFamily, setFontFamily] = useState(sansSerif);
    const [fontSize, setFontSize] = useState(defaultFontSize);
    const [color, setColor] = useState(defaultColor);
    const [darkMode, setDarkMode] = useState(false);
    const [mediaElement, setMediaElement] = useState(null);
    const [visible,setVisible] = useState(false);
    const[stopsong,setStop] = useState(false);
//   同じ結果を返す処理はメモ化してパフォーマンスを上げる
  const div = useMemo(() => <div className="media" ref={setMediaElement} />, []);

// mediaElement変更時にはしる
  useEffect(() => {
    if (typeof window === "undefined" || !mediaElement) {
      return;
    }
    
    console.log("--- [app] create Player instance ---");
    // TextAlive Player を作る
    const p = new Player({
      app: {
        // トークンは https://developer.textalive.jp/profile で取得したものを使う
        token: "gToYZLXch4mgq81a",
        parameters: [
          {
            title: "フォントの種類",
            name: "fontFamily",
            className: "Select",
            params: [
              [serif, "明朝体"],
              [sansSerif, "ゴシック体"],
            ],
            initialValue: sansSerif,
          },
          {
            title: "フォントサイズ",
            name: "fontSize",
            className: "Slider",
            params: [0, 100],
            initialValue: defaultFontSize,
          },
          {
            title: "テキスト色",
            name: "color",
            className: "Color",
            initialValue: defaultColor,
          },
          {
            title: "ダークモード",
            name: "darkMode",
            className: "Check",
            initialValue: false,
          },
        ],
      },
      mediaElement,
    });

// TextAlive Player のイベントリスナを登録する
//  そのイベント（onAppReady , onVideoReadyなど）になった際に対応する関数を実行。
    const playerListener = {
        // onAppReady:初期化されたプレイヤーが最初に呼ぶイベント
           
        onAppReady: (app) => {
          console.log("--- [app] initialized as TextAlive app ---");
          console.log("managed:", app.managed);
          console.log("host:", app.host);
          console.log("song url:", app.songUrl);
          if (!app.managed) {
            // Loading Memories / せきこみごはん feat. 初音ミク
            p.createFromSongUrl("https://piapro.jp/t/RoPB/20220122172830", {
              video: {
                // 音楽地図訂正履歴: https://songle.jp/songs/2243651/history
                beatId: 4086301,
                chordId: 2221797,
                repetitiveSegmentId: 2247682,
                // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FRoPB%2F20220122172830
                lyricId: 53718,
                lyricDiffId: 7076
              },
            });
          };

        setApp(app);
        },
      onAppParameterUpdate: (name, value) => {
        console.log(`[app] parameters.${name} update:`, value);
        if (name === "fontFamily") {
          setFontFamily(value);
        }
        if (name === "fontSize") {
          setFontSize(value);
        }
        if (name === "color") {
          const color = value;
          setColor(`rgb(${color.r}, ${color.g}, ${color.b})`);
        }
        if (name === "darkMode") {
          setDarkMode(!!value);
        }
      },
      // 楽曲情報読み込み完了
      onVideoReady: () => {
        console.log("--- [app] video is ready ---");
        console.log("player:", p);
        console.log("player.data.song:", p.data.song);
        console.log("player.data.song.name:", p.data.song.name);
        console.log("player.data.song.artist.name:", p.data.song.artist.name);
        console.log("player.data.songMap:", p.data.songMap);
        let c = p.video.firstChar;
        // テキストを表示し続ける
        while (c && c.next) {
          c.animate = (now, u) => {
            if (u.startTime <= now && u.endTime > now) {
              setChar(u.text);
            }
          };
          c = c.next;
        }
      },
      // データリセット
      onPlay: () =>{
        setChar("")
      }
    };
    // イベントリスナを登録する
    p.addListener(playerListener);

    setPlayer(p);
    return () => {
      console.log("--- [app] shutdown ---");
      p.removeListener(playerListener);
      p.dispose();
    };
  }, [mediaElement]);

  return (
    <>    
      {player && app && visible &&(
        
        <div className="controls">
          <PlayerControl disabled={app.managed} player={player} setStop={setStop}/>
        </div>
      )}
      <button className="panel" onClick={()=>{setVisible(!visible)}}>Panel</button>
      <div
        className="wrapper"
        style={{
          background: darkMode ? "#333" : "#fff",
        }}
      >
        { stopsong ? 
        <div
          className="char"
          style={{
            fontFamily,
            fontSize: `${fontSize}vh`,
            color,
          }}
        >
          {char}
        </div>
        :
        <div className="stop">
          Stop...
        </div>
        }
      </div>
      {div}
      <Three/>
    </>
  );
};