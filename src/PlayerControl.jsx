import React, { useCallback, useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { PlayerSeekbar } from "textalive-react-api";


export const PlayerControl = ({ disabled, player,setStop}) => {
  const [status, setStatus] = useState("stop");
  const [songlist,setList] = useState("");

  //playerが変化したとき 
  useEffect(() => {
    // 状態を保存
    const listener = {
        onPlay: () => setStatus("play"),
        onPause: () => setStatus("pause"),
        onStop: () => setStatus("stop"),
    };

    player.addListener(listener);
    return () => player.removeListener(listener);
  }, [player]);

// playerが変化したとき
  const handlePlay = useCallback(() => {
    player && player.requestPlay()
    setStop(true);
  }, [
    player,
  ]);
  

  const handlePause = useCallback(() => {
    player && player.requestPause();
    setStop(false);
  }, [
    player,
  ]);
  const handleStop = useCallback(() =>{
    player && player.requestStop();
    setStop(false);
  }, [
    player,
  ]);

  // 曲を変える
  useEffect(()=>{    
    handleStop();
        let beat = 4086301;
        let chord = 2221797;
        let repetitiveSegment =  2247682;
        let lyric = 53718;
        let lyricDiff = 7076;
      switch(songlist){
        // Loading Memories
        case "https://piapro.jp/t/RoPB/20220122172830":
            beat = 4086301;
            chord = 2221797;
            repetitiveSegment =  2247682;
            lyric = 53718;
            lyricDiff = 7076;
            break;
        // 青に溶けた風船
        case "https://piapro.jp/t/9cSd/20220205030039":
            beat = 4083452;
            chord = 2221996;
            repetitiveSegment =  2247861;
            lyric = 53745;
            lyricDiff = 7080;
            break;
        // 歌の欠片と
        case "https://piapro.jp/t/Yvi-/20220207132910":
            beat = 4086832;
            chord = 2222074;
            repetitiveSegment =  2247935;
            lyric = 53746;
            lyricDiff = 7082;
            break;
        // 未完のストーリー
        case "https://piapro.jp/t/ehtN/20220207101534":
            beat = 4083459;
            chord = 2222147;
            repetitiveSegment =  2248008;
            lyric = 53747;
            lyricDiff = 7083;
            break;
        // みはるかす
        case "https://piapro.jp/t/QtjE/20220207164031":
            beat = 4083470;
            chord = 2222187;
            repetitiveSegment =  2248075;
            lyric = 53748;
            lyricDiff = 7084;
            break;
        // fear
        case "https://piapro.jp/t/GqT2/20220129182012":
            beat = 4083475;
            chord = 2222294;
            repetitiveSegment =  2248170;
            lyric = 53749;
            lyricDiff = 7085;
            break;
      }

      player.createFromSongUrl(songlist,{
        video: {
          // 音楽地図訂正履歴: https://songle.jp/songs/2243651/history
          beatId: beat,
          chordId: chord,
          repetitiveSegmentId: repetitiveSegment,
          // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FRoPB%2F20220122172830
          lyricId: lyric,
          lyricDiffId: lyricDiff
        }
      });    
  },[songlist])
  
  const handleChange = (e) =>{
    setList(e.target.value)
  }

  return (
    <>
      <div className="control">
        <Button
          content={status !== "play" ? "再生" : "一時停止"}
          onClick={status !== "play" ? handlePlay : handlePause}
          size="small"
          disabled={disabled}
          color="red"
          basic
        />

        <Button
          content="停止"
          onClick={handleStop}
          size="small"
          disabled={disabled || status === "stop"}
        />

        <select id="song_list" onChange={(e) => handleChange(e)}>
          <option value={"https://piapro.jp/t/RoPB/20220122172830"}>Loading Memories</option>
          <option value={"https://piapro.jp/t/9cSd/20220205030039"}>青に溶けた風船</option>
          <option value={"https://piapro.jp/t/Yvi-/20220207132910"}>歌の欠片と</option>
          <option value={"https://piapro.jp/t/ehtN/20220207101534"}>未完のストーリー</option>
          <option value={"https://piapro.jp/t/QtjE/20220207164031"}>みはるかす</option>
          <option value={"https://piapro.jp/t/GqT2/20220129182012"}>fear</option>
        </select>
        
        <div className="seekbar">
          <PlayerSeekbar player={!disabled && player} />
        </div>
        
      </div>
      </>
        )}
