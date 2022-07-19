import { useEffect } from 'react'
import * as THREE from 'three'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { Vector3 } from 'three'
import {  SpotLight, useDepthBuffer } from '@react-three/drei'
import Penlight from '../components/Penlight';



export default function Spotlight({segment}) {
    // useDepthBuffer：物理的に見えない部分を消す
    // レンダリング回数を一回にframes:1
    const depthBuffer = useDepthBuffer({ frames: 1 })
    // const { nodes, materials } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/dragon/model.gltf')
    return (
      <>
      {/* 横、縦、奥 */}
        <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[-9, -1, 1]} attenuation={10} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="#42ff00" position={[-6, -1, 1]} attenuation={7} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[-3, -1, 1]} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[3, -1, 1]} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="#42ff00" position={[6, -1, 1]} attenuation={7} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[9, -1, 1]} attenuation={10} segment={segment}/>
  
  
        {/* <mesh position={[0, -1.03, 0]} castShadow receiveShadow geometry={nodes.dragon.geometry} material={materials['Default OBJ.001']} dispose={null} /> */}
        {/* <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[50, 50]} />
          <meshPhongMaterial />
        </mesh> */}
      </>
    )
  }

  function MovingSpot({ vec = new Vector3(),segment,...props }) {
    const [light, set] = useState()
    const [intensity, setIntensity] = useState(0)
    // console.log(segment);
    useFrame((state) => {
      const t = state.clock.elapsedTime      
      // サビ
      if(segment){
        light.target.position.lerp(vec.set(0,(Math.sin(t)*3)**2, 0), 1)
        setIntensity(100)
      }else{
        light.target.position.lerp(vec.set(0,10, 0), 0.1)
        setIntensity(50)
      }
    })
    // castShadow:光源の影を有効にする
    // penumbra:半影。影の輪郭のぼやけた部分
    // attenuation:減衰
    return (
        <group>
            <SpotLight ref={set} castShadow penumbra={5} distance={10} 
            angle={0.2}  anglePower={6} intensity={intensity} {...props} />
            {light && <primitive object={light.target}  />}
        </group>
    )

}
