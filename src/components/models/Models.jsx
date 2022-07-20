import { useRef, Suspense} from 'react'
import Model from './Miku'
import "../../index.css"
import { useFrame } from '@react-three/fiber'

export default function Models({segment,cheerstart}) {

    const ref = useRef(null); 
    useFrame(() => {
        // サビ
        if(segment){

        }else{

        }
      },[]);
     
    return (
        <>
            <Suspense fallback={null}>
                <mesh ref={ref}>
                    <Model position={[0,-0.13,9]} rotation={[0,cheerstart ? 0:Math.PI,0]} scale={0.02}/>     
                </mesh>
            </Suspense>
        </>
        )   
}
