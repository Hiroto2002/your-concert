/**
 * React-three-fiber等を使った3Dデザイン
 */
import { Canvas } from '@react-three/fiber'
import Penlights from './Penlights'
import Spotlight from './Spotlight';
import Models from '../models/Models'
import Otherpenlight from './Otherpenlight'
import LineAnimation from './Line'
import Screen from './Screen'
import Effects from './Effects'

export default function Three({char,segment,penlight,penlight_color,
                              startlylic,cheerstart,loading,setModel}) {
  
  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: 50, position: [0, 0, 10] }} >
        <color attach="background" args={['black']} />
        <directionalLight position={[0, 0, 5]} intensity={0.23} />
        <Spotlight segment={segment}/>
        <Screen   position={[0,1.5,-1]} scale={[15, 3, -1]} char={char}/>
        <Models segment={segment} cheerstart={cheerstart} loading={loading} setModel={setModel}/>
        <Otherpenlight segment={segment}/>
        <LineAnimation startlylic={startlylic} segment={segment}/>
        <Penlights penlight={penlight} penlight_color={penlight_color} />
        <Effects/>
      </Canvas>
    </div>
  )
};

