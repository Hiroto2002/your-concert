/**
 * 自分用のペンライト
 */
import { useRef} from 'react'
import { useThree, useFrame,} from '@react-three/fiber'
import { useEffect } from 'react'

export default function Penlights({penlight,penlight_color,}){

  return(
    <>
        { penlight === 1 ? 
        <Penlight color={penlight_color} scale={0.04} rotation={[0, 0, 0]} position={[0, 1.5, 0]}/>
        : penlight === 2 ?
        <>
          <Penlight color={penlight_color} scale={0.04} rotation={[0, 0, 0]} position={[-4, 2, 0]} />
          <Penlight color={penlight_color} scale={0.04} rotation={[0, 0, 0]} position={[4, 2, 0]} />
        </>
        :
        <></>
        }     
    </>
  )
}

function Penlight({ color,...props }) {
  const ref = useRef()
  const { viewport } = useThree()

  useFrame(({ mouse }) => {
    const x = (mouse.y * viewport.width) / 12
    ref.current.rotation.x = -x
  })
    
  useEffect(()=>{
    ref.current.position.set(0, -5, 0)    
  },[])
  
  return (
    <>
      <group ref={ref}>
        <mesh  {...props}>
          <meshBasicMaterial color={color} toneMapped={false}/>
          <cylinderBufferGeometry args={[10,10,100]}/>
        </mesh>
      </group>
    </>
  )
}