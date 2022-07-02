import { Canvas} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { DoubleSide } from 'three'
import { Sky } from '@react-three/drei/core'
export default function Three() {

  
  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: 50, position: [10, 5, 10] }}>
        <Contents />
        <Sky distance={450000} sunPosition={[0, 1, 5]} inclination={0} azimuth={0.25} />
        

      </Canvas>
      
    </div>
  )
};

const Contents = () => {
  return (
      <>
          {/* control */}
          {/* マウスで動かせるようになる */}
          <OrbitControls />

          {/* light */}
          <directionalLight position={[5, 5, 5]} />

          {/* box 1 */}
          <mesh position={[0, 2, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshPhongMaterial color="blue" />
          </mesh>

          {/* box 2 */}
          <mesh position={[1, 3, 2]} scale={0.5}>
              <boxGeometry args={[1, 1, 1]} />
              <meshPhongMaterial color="red" />
          </mesh>

          {/* floor */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color="#E5E5E5" side={DoubleSide} />
          </mesh>
      </>
  )
}



