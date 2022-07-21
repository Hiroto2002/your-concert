/**
 * ミクの動き
 */

import { useRef, Suspense} from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useState } from 'react'
import Walkmiku from './Walkmiku'
import Normalmiku from './Normalmiku'
import Stopmiku from './Stopmiku'
import Segmentmiku from './Segmentmiku'

export default function Models({vec = new Vector3(),cheerstart,segment,loading,setModel}) {

    const ref = useRef(null); 
    const[walk,setWalk] = useState(1)
    const[walkend,setEnd] = useState(false)
    const[stop,setStop] = useState(false)


    // 右から歩いてくる
    useFrame(() => {
        if(ref.current.position.x >= 0 && loading==true){
            setWalk(walk - 0.003)
            ref.current.position.lerp(vec.set(walk,0, 0), 1)
        }else if(ref.current.position.x < 0){
            setEnd(true)
        }
    },[]);
    
    // 歩き終わったら
    if(walkend){
        // お辞儀までのアニメーションが終わったら
        if(stop){
            return(
                <Suspense fallback={null}>
                <mesh ref={ref}>
                    {/* サビ */}
                    { segment ?
                    <Segmentmiku position={[0,-0.13,9]} rotation={[0,0,0]} scale={0.02}/> 
                    :
                    <Normalmiku position={[0,-0.13,9]} rotation={[0,cheerstart ? 0:Math.PI,0]} scale={0.02}/>                         
                    }
                </mesh>
                </Suspense>
                )
        }
        else{
            return(      
                <Suspense fallback={null}>
                <mesh ref={ref}>
                    <Stopmiku position={[0,-0.13,9]} rotation={[0.2,0,0]} scale={0.02} setStop={setStop} setModel={setModel}/>                         
                </mesh>
                </Suspense>                  
            )
        }
    }else{
        return(
        <Suspense fallback={null}>
            <mesh ref={ref}>
                <Walkmiku position={[0,-0.13,9]} rotation={[0,-Math.PI/13,0]} scale={0.02}/>
            </mesh>
        </Suspense>)
    }   
}
