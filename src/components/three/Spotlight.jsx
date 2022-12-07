/**
 * スポットライトを表示
 */
import { useState} from 'react'
import { useFrame} from '@react-three/fiber'
import { Vector3 } from 'three'
import {  SpotLight, useDepthBuffer } from '@react-three/drei'

export default function Spotlight({segment}) {
    const depthBuffer = useDepthBuffer({ frames: 1 })

    return (
      <>
        <MovingSpot depthBuffer={depthBuffer} color="rgb(97,245,200)" position={[-9, -1, 1]} attenuation={10} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="rgb(243,98,238)" position={[-6, -1, 1]} attenuation={7} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="rgb(97,245,200)" position={[-3, -1, 1]} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="rgb(97,245,200)" position={[3, -1, 1]} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="rgb(243,98,238)" position={[6, -1, 1]} attenuation={7} segment={segment}/>
        <MovingSpot depthBuffer={depthBuffer} color="rgb(97,245,200)" position={[9, -1, 1]} attenuation={10} segment={segment}/>
      </>
    )
}

function MovingSpot({ vec = new Vector3(),segment,...props }) {
    const [light, set] = useState()
    const [intensity, setIntensity] = useState(0)
    useFrame((state) => {
      const t = state.clock.elapsedTime      
      if(segment){
        light.target.position.lerp(vec.set(0,(Math.sin(t)*3)**2, 0), 1)
        setIntensity(100)
      }else{
        light.target.position.lerp(vec.set(0,10, 0), 0.1)
        setIntensity(30)
      }
    })
    return (
        <group>
            <SpotLight ref={set} castShadow penumbra={5} distance={10}
            angle={0.2}  anglePower={6} intensity={intensity} {...props} />
            {light && <primitive object={light.target}/>}
        </group>
    )
}
