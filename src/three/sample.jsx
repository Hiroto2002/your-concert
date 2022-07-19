// import { OrbitControls } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { EffectComposer, Bloom, Selection, Select } from '@react-three/postprocessing'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { BoxGeometry, PlaneGeometry, Vector3 } from 'three'
import {  SpotLight, useDepthBuffer } from '@react-three/drei'
import { Html, RoundedBox } from '@react-three/drei/web'
import Penlight from '../components/Penlight';
import Spotlight from '../components/Spotlight';
import { TextureLoader } from 'three'
import Models from '../components/Models'
import { useCubeTexture } from '@react-three/drei/web'
import { useMatcapTexture } from '@react-three/drei/web' 
import Otherpenlight from '../components/Otherpenlight'
import LineAnimation from '../components/Line'
// import { Vector3 } from 'three';


// Vector3:ベクトル




function Miku({ color, ...props }) {
  const ref = useRef()
  const [r] = useState(() => Math.random() * 10000)
  useFrame((_) => (ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 10))
  const { paths: [path] } = useLoader(SVGLoader, './img/miku.svg') // prettier-ignore



  // let geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style );
  
  const geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths[1].getPoints(), path.userData.style), [])
    // let geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths.getPoints(), path.userData.style), [])
  
  return (
    <group ref={ref}>
      <mesh geometry={geom} {...props}>
        <meshBasicMaterial color={"#42ff00"} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Plane({ color,char,...props}) {

  const createCanvasForTexture = (canvasWidth, canvasHeight, text, fontSize) => {
    // 貼り付けるcanvasを作成。
    const canvasForText = document.createElement('canvas');
    // 2dグラフィックを描画
    const ctx = canvasForText.getContext('2d');
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;
  
    // 透過率50%の青背景を描く
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    // fillRect:塗りつぶしに使う、(x,y,w,h)
    // xy:左上の座標wh:四角形の幅と高さ
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    //  文字色
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillText(
      text,
      // x方向の余白/2をx方向開始時の始点とすることで、横方向の中央揃えをしている。
      (canvasWidth - ctx.measureText(text).width) / 2,
      // y方向のcanvasの中央に文字の高さの半分を加えることで、縦方向の中央揃えをしている。
      canvasHeight / 2 + ctx.measureText(text).actualBoundingBoxAscent/2 
    );
    return canvasForText;
  };
  // canvasをtextureに載せ、さらにmaterialに載せる。
  const canvasTexture = new THREE.CanvasTexture(
    createCanvasForTexture(500, 100,`${char}`, 25)
  );

  return (
    <Suspense fallback={null}>
      {/* smoothness:滑らかさ */}
      <RoundedBox receiveShadow  smoothness={1.0} radius={0.02} {...props} rotation={[0,0,0]} >
      {/* <meshStandardMaterial color={color} envMapIntensity={0.5} transparent={true}/> */}
        <meshStandardMaterial   transparent={true} map={canvasTexture} />
      </RoundedBox>


      {/* <EffectComposer> */}
          {/* <DotScreen */}
            {/* // angle={Math.PI * 0.25} // angle of the dot pattern */}
            {/* scale={1.0} // scale of the dot pattern */}
          {/* /> */}
        {/* </EffectComposer> */}

    </Suspense>
    
  )
}


export default function Three({vec = new Vector3(),char,segment,penlight,penlight_color,startlylic}) {


  // const [time, updateTime] = useState(Date.now());
  // const [other_color,setOther] = useState("rgb(0,199,157)"); 
  // const [other_color,setOther] = useState(0); 
  // const [flg,setFlg] = useState(false)

    // useEffect(()=>{
    //   const timeoutId = setTimeout(() => updateTime(Date.now()), 300);
    //   return () => {
    //     if(flg){
    //       setOther(-1.0)
    //       setFlg(false)
    //     }else{
    //       setOther(0)
    //       setFlg(true)
    //     }
    //     clearTimeout(timeoutId);
    // };
    // },[time])  


// const Rig = ({ v = new Vector3() }) => {
  // return useFrame((state) => {
    // lerp:線形補間
    // 今回はヌルヌルとした座標変化を表現するために使われています。第2引数として渡しているアルファ値(上記では0.05)を変えてあげると、
    // より慣性のかかったような動きの表現もできます。ぜひ色々遊んでみてください。
//     state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
//   })
// };
  
  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: 50, position: [0, 0, 10] }} >
        <color attach="background" args={['black']} />
        <Spotlight segment={segment}/>
        <directionalLight position={[0, 0, 5]} intensity={0.23} />
        <Plane   position={[0,1.5,-1]} scale={[15, 3, -1]} char={char}/>
        <Models segment={segment}/>
        <PenEffect penlight={penlight} penlight_color={penlight_color} />
        <Thing position={[5,5,-4]} rotation={[0, 1, 0]}/>
        <Thing position={[-4,0,1]} rotation={[0, 1, 2]}/>
        <Thing position={[5,-5,-10]}/>
        <Thing position={[-10,5,-4]}/>
        <Otherpenlight segment={segment}/>
        <LineAnimation startlylic={startlylic} segment={segment}/>
      </Canvas>
    </div>
  )
};


function Thing({...props}) {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.02
  })
  return (
    <group>
    <mesh ref={ref}  castShadow {...props}>
      <boxGeometry args={[1,1,1,1]} />
      <meshNormalMaterial />
    </mesh>
    </group>
  )
}



const PenEffect=({penlight,penlight_color,})=>{

  return(
    // Suspense:コンポーネントを「ローディング中なのでまだレンダリングできない」という状態にすることができる
    // try,catch
  <Suspense fallback={null}>
    {/* <Rig> */}
    {/* position:横、縦、深さ */}
        <Miku scale={0.005} rotation={[0, 0, 3]} position={[1.5, 6, -20]} />
        { penlight === 1 ? 
        <Penlight color={penlight_color} scale={0.04} rotation={[0, 0, 0]} position={[0, 2, 0]}/>
        : penlight === 2 ?
        <>
          <Penlight color={penlight_color} scale={0.04} rotation={[0, 0, 0]} position={[-4, 2, 0]} />
          <Penlight color={penlight_color} scale={0.04} rotation={[0, 0, 0]} position={[4, 2, 0]} />
        </>
        :
        <></>
        }
        
      {/* <Ground mirror={1} blur={[500, 100]} mixBlur={12} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-0.8} />
    </Rig> */}

    {/* EffectComposerを使用すると、ポストプロセッシングを簡単に実装できます。 */}
    {/* Post Processing (ポストプロセス) は、画像を画面に表示する前に、
    カメラの画像バッファにフルスクリーンのフィルターとエフェクトを適用する処理です。 
    これによって、設定に時間をほとんどかけずに、アプリケーションの外観を顕著に向上させることができます。 */}

    {/* //multisampring:アンチエイリアス */}
    <EffectComposer multisampling={8} autoclear={false}>
      {/* Bloom:ぼかし */}

      {/* luminanceThreshold:光度の敷居値この値より低いと隠れる */}
      {/*  luminanceSmoothing:輝度しきい値の滑らかさを制御します。範囲は[0、1]です。 */}
      {/* intensity:強度 */}
      <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={1.0} />
      
     </EffectComposer>
  </Suspense>
  //  {/* <CameraShake yawFrequency={0} pitchFrequency={0} rollFrequency={0.1} /> */}
  )
}

// // カメラを動かず
// const Rig = ({ v = new Vector3() }) => {
//   return useFrame((state) => {
    // lerp:線形補間
    // 今回はヌルヌルとした座標変化を表現するために使われています。第2引数として渡しているアルファ値(上記では0.05)を変えてあげると、
    // より慣性のかかったような動きの表現もできます。ぜひ色々遊んでみてください。
//     state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
//   })
// };