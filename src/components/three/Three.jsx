/**
 * React-three-fiber等を使った3Dデザイン
 */
import {useRef} from 'react'
import { Canvas,useFrame} from '@react-three/fiber'
import Penlights from './Penlights'
import Spotlight from './Spotlight';
import Models from '../Models'
import Otherpenlight from './Otherpenlight'
import LineAnimation from './Line'
import Screen from './Screen'
import Effects from './Effects'

export default function Three({char,segment,penlight,penlight_color,startlylic}) {
  
  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: 50, position: [0, 0, 10] }} >
        <color attach="background" args={['black']} />
        <directionalLight position={[0, 0, 5]} intensity={0.23} />
        <Spotlight segment={segment}/>
        <Screen   position={[0,1.5,-1]} scale={[15, 3, -1]} char={char}/>
        <Models segment={segment}/>
        <Otherpenlight segment={segment}/>
        <LineAnimation startlylic={startlylic} segment={segment}/>
        <Penlights penlight={penlight} penlight_color={penlight_color} />
        {/* <Cube position={[-10,5,-4]}/>
        <Cube position={[5,5,-4]} rotation={[0, 1, 0]}/>
        <Cube position={[-4,0,1]} rotation={[0, 1, 0]}/>
        <Cube position={[5,-5,-10]}/> */}
        <Effects/>
      </Canvas>
    </div>
  )
};

function Cube({...props}) {
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
