import { Canvas } from '@react-three/fiber'
import { useState, useRef, Suspense, useMemo } from 'react'
import Model from '../Miku'
import "../index.css"
import { useFrame } from '@react-three/fiber'

export default function Models({segment}) {
    // return (
    //     <div id="model_container">
    //         <Canvas>
    //         <ambientLight args={[0xff0000]} intensity={0.1} />
    //         <directionalLight position={[0, 0, 5]} intensity={0.5} />
    //         <Suspense fallback={null}>
    //             <Model position={[0,-2,0]} rotation={[0,Math.PI,0]}/>       
    //         </Suspense>
    //         </Canvas>
    //     </div>
    //     )


    const ref = useRef(null); 
    useFrame((state) => {
        const t = state.clock.elapsedTime   
        // サビ
        if(segment){

        }else{
            // ref.current.position.z = Math.sin(t)*5 ;

        }
      },[]);
    return (
        <>
            <Suspense fallback={null}>
                <mesh ref={ref}>
                <Model position={[0,-0.13,9]} rotation={[0,0,0]} scale={0.02}/>     
                </mesh>  
            </Suspense>
        </>
        )   
}
