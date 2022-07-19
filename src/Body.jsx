import React, { useEffect, useState, useMemo, useRef } from "react";
import { Player } from "textalive-app-api";
import Models from "./components/Models";
import "./index.css"
import { PlayerControl } from "./PlayerControl";
import Three from "./three/sample";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

// 歌詞サイズ
const defaultFontSize = 30;
// 歌詞色
const defaultColor = "#fff";
// 歌詞フォント
const sansSerif = `"Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic, Meiryo, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif`;
const serif = `"Times New Roman", YuMincho, "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif`;

export const Body = () => {
    const [player, setPlayer] = useState(null);
    const [app, setApp] = useState(null);
    const [char, setChar] = useState("");
    const [mediaElement, setMediaElement] = useState(null);
    const [visible,setVisible] = useState(false);
    const[stopsong,setStop] = useState(false);
    const[segment,setSegment] = useState(false);
    const[loading,setLoading] = useState(false);
    const[penlight,setPenlight] = useState(1);
    const[penlight_color,setColor]=useState("#42ff00");
    const[startlylic,setStart]=useState(false);
    
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
        // parameters: [
        //   {
        //     title: "フォントの種類",
        //     name: "fontFamily",
        //     className: "Select",
        //     params: [
        //       [serif, "明朝体"],
        //       [sansSerif, "ゴシック体"],
        //     ],
        //     initialValue: sansSerif,
        //   },
        //   {
        //     title: "フォントサイズ",
        //     name: "fontSize",
        //     className: "Slider",
        //     params: [0, 100],
        //     initialValue: defaultFontSize,
        //   },
        //   {
        //     title: "テキスト色",
        //     name: "color",
        //     className: "Color",
        //     initialValue: defaultColor,
        //   },
        //   {
        //     title: "ダークモード",
        //     name: "darkMode",
        //     className: "Check",
        //     initialValue: false,
        //   },
        // ],
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
          console.log("song url:", app.songUrl)

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
      // onAppParameterUpdate: (name, value) => {
      //   console.log(`[app] parameters.${name} update:`, value);
      //   if (name === "fontFamily") {
      //     setFontFamily(value);
      //   }
      //   if (name === "fontSize") {
      //     setFontSize(value);
      //   }
      //   if (name === "color") {
      //     const color = value;
      //     setColor(`rgb(${color.r}, ${color.g}, ${color.b})`);
      //   }
      //   if (name === "darkMode") {
      //     setDarkMode(!!value);
      //   }
      // },
      // 楽曲情報読み込み完了
      onVideoReady: () => {
        console.log("--- [app] video is ready ---");
        console.log("player:", p);
        console.log("player.data.song:", p.data.song);
        console.log("player.data.song.name:", p.data.song.name);
        console.log("player.data.song.artist.name:", p.data.song.artist.name);
        console.log("player.data.songMap:", p.data.songMap);
        let c = p.video.firstPhrase;
        
        // setTimeout(()=>setLoading(true),6000); 
        setTimeout(()=>setLoading(true),500); 
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
      },
      // シークバーをユーザーが触ったとき
      onSeek:()=>{
        const position = p.timer.position;
        const chorus = p.findChorus(position);
        if(chorus){
            setSegment(true)
            console.log("b");
        }else{
          setSegment(false)
        }
      },

      onThrottledTimeUpdate:()=>{
        const position = p.timer.position;
        const chorus = p.findChorus(position);
      // サビかどうか
        if(chorus){
            setSegment(true)
        }else{
          setSegment(false)
        }
      // 歌詞かどうか
        if(position >= p.video.firstPhrase.startTime){
          setStart(true)
        }else{
          setStart(false)
        }
      },

      
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


  const ChangePenlight = () =>{
    setPenlight(penlight + 1)
    
    if(penlight===2){
      setPenlight(0)
    }
  }


  const Change_color=(e)=>{
    setColor(e.target.value)
  } 
  
  return (
    <>
        {/* ロード中 */}
      {loading||(
        <div style={{width:"100%",position:"fixed",zIndex:"999",background:"black"}}>
        <video autoPlay={true} muted={true} style={{width:"100%",transform: "translate(0%, -18%)"}}>

        <source src="/img/loading.mp4"
          type="video/mp4"/>

        Sorry, your browser doesn't support embedded videos.
        </video>
        </div>
      )}

        {/* ロード後 */}
      {player && app && (
        
        <div className={visible ? "controls visible":"controls invisible"} >
            <PlayerControl disabled={app.managed} player={player} setStop={setStop}/>
        </div>
      )}
      <Button className="panel" onClick={()=>{setVisible(!visible)} } icon={visible ? "angle up":"angle down"} size="tiny"></Button>
      <Button icon="magic"size="small" className="penlight" onClick={ChangePenlight}/>
      {penlight >= 1 ?
        <div className="palette_design" style={{background:penlight_color}}>
          <input type="color" style={{opacity:"0"}} id="color_palette" onChange={(e) => Change_color(e)}/>
        </div>
        :
        <>
        </>
      }
      <div
        className="wrapper"
      >
        { stopsong ||( 
          <div className="stop">
            Stop...
          </div>
          )
        }
      </div>
      
      {div}
      {/* <img src="./img/miku.png" className="miku"/> */}
      <Three char={char} segment={segment} penlight={penlight} penlight_color={penlight_color} startlylic={startlylic}/>

      {/* <Models/> */}
      {/* <Screen/> */}
    </>
  );
};