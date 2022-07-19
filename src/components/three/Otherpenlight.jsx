/**
 * 周りのペンライト
 */
import "../../index.css"
import { useRef } from "react"
import {useFrame} from "@react-three/fiber"
import { Vector3 } from 'three'

export default function Otherpenlight({vec = new Vector3(),segment}){
    const ref = useRef()

    useFrame((state) => {
        const t = state.clock.elapsedTime      
        // サビ
        if(segment){
            ref.current.position.lerp(vec.set((Math.cos(t*5.0)),(Math.sin(t*5.0))**2,0), 1)
        }else{
            ref.current.position.lerp(vec.set(0,(Math.sin(t*2.85))**2,0), 1)
        }
    })

return(
    <group ref={ref}> 
        <mesh scale={0.06} position={[20,-7,-12]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[15,-7,-12]} rotation={[-0.3,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[10,-7,-12]} rotation={[-0.2,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[5,-7,-12]} rotation={[-0.1,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-5,-7,-12]} rotation={[-0.1,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>

        <mesh scale={0.06} position={[-10,-7,-12]} rotation={[-0.2,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-15,-7,-12]} rotation={[-0.3,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-20,-7,-12]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        
        {/* 二列目 */}
        <mesh scale={0.06} position={[30,-7,-20]} rotation={[-0.6,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[25,-7,-20]} rotation={[-0.5,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[20,-7,-20]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[15,-7,-20]} rotation={[-0.3,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[10,-7,-20]} rotation={[-0.2,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[5,-7,-20]} rotation={[-0.1,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-5,-7,-20]} rotation={[-0.1,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-10,-7,-20]} rotation={[-0.2,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-15,-7,-20]} rotation={[-0.3,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-20,-7,-20]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh> 
        <mesh scale={0.06} position={[-25,-7,-20]} rotation={[-0.5,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh> 
        <mesh scale={0.06} position={[-30,-7,-20]} rotation={[-0.6,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh> 

        {/* 三列目 */}
        <mesh scale={0.06} position={[40,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[35,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[30,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[25,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[20,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[15,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[10,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[5,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-5,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-10,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-15,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-20,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh> 
        <mesh scale={0.06} position={[-25,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-30,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh> 
        <mesh scale={0.06} position={[-35,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
        <mesh scale={0.06} position={[-40,-7,-30]} rotation={[-0.4,0,0]}>
            <meshBasicMaterial color={"rgb(7,242,90)"} toneMapped={false} />
            <cylinderBufferGeometry  args={[5,5,53]}/>
        </mesh>
    </group>
)
}