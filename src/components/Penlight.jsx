import { useRef} from 'react'
import { useThree, useFrame,} from '@react-three/fiber'
import { useEffect } from 'react'


export default function Penlight({ color,...props }) {
    const ref = useRef()
    const { viewport } = useThree()

    // viewport = canvas in 3d units (meters)
    useFrame(({ mouse }) => {
      // const x = (mouse.x * viewport.width) /10
      const x = (mouse.y * viewport.width) / 12
      // ref.current.rotation.set(-1.5, 0, -x)
      ref.current.rotation.x = -x
    })
    

    useEffect(()=>{
    //   document.addEventListener('keydown', keypress_ivent);
      
      ref.current.position.set(0, -5, 0)    
    //   function keypress_ivent(e) {
    //     // 1つ持ちの場合
    //     if(penlight === 1){
    //     if(e.code === 'ArrowRight' ){
    //       ref.current.rotation.z -= 0.2
    //     }
    //     if(e.code === 'ArrowLeft' ){
    //       ref.current.rotation.z += 0.2
    //     }  
    //   }
    // }
    },[])
  
    return (
      <>
      <group ref={ref}>
        <mesh  {...props}>
          <meshBasicMaterial color={color} toneMapped={false} />
          <cylinderBufferGeometry args={[10,10,100]}/>
        </mesh>
      </group>
    </>
    )
  }