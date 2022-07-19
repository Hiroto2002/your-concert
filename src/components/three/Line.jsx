/**
 * 線が動くアニメーション
 */
import React from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'

export default function LineAnimation({startlylic,segment}) {
    const [v, setV] = React.useState(1)
    const [s, setS] = React.useState(1)
    const [c, setC] = React.useState(1)

    useFrame(({ clock }) => {
        setV(Math.abs(Math.sin(clock.elapsedTime*2)))
        // setS(Math.sin(clock.elapsedTime*2 ))
        // setC(Math.cos(clock.elapsedTime*2 ))
    })

    if(startlylic){
    return(
    <>
        <Line
            points={[
                [-10, 2, -4],
                [10, 2, -4],
            ]} 
            color="#000" scale={1} lineWidth={70}
        />
        <Line
            points={[
                [0, 0, 0],
                [-1, 1, 0],
                [0, 2, 0],
                [1, 1, 0],
                [0, 0, 0],
                ]} 
            color="rgb(6,219,217)" dashed dashSize={v * 2} gapSize={9 - v * 9} 
            scale={2} position={[0,0,-5]} lineWidth={3}
        />
        <Line
            points={[
                [0, 0, 0],
                [1, 1, 0],
                [0, 2, 0],
                [-1, 1, 0],
                [0, 0, 0],
            ]}
            color="rgb(247,2,145)" dashed dashSize={v * 2} gapSize={9 - v * 9} 
            scale={3} position={[0,-1,-5]} lineWidth={2}
        />
    {/* サビ演出 */}
        { segment &&(
        <>
            {/* <Line
                points={[
                    [0, 2, -5],
                    [c * 10, s * 10, -5],
                ]}
                color="rgb(6,219,217)" scale={1} dashed dashSize={0.5} gapSize={9-c*10} lineWidth={2}
            />
            <Line
                points={[
                    [0, 2, -5],
                    [c * 5, s * 5, -5],
                ]}
                color="rgb(247,2,145)" scale={1} dashed 
                dashSize={0.5} gapSize={9-c*10}lineWidth={2}
            />
            <Line
                points={[
                    [0, 2, -5],
                    [c * 3, s * 3, -5],
                ]}
                color="rgb(6,219,217)" scale={1} dashed
                dashSize={0.5} gapSize={9-c*10} lineWidth={2}
            />
            <Line
                points={[
                    [0, 2, -5],
                    [-c * 10, -s * 10, -5],
                ]}
                color="rgb(247,2,145)" scale={1} dashed dashSize={0.5} 
                gapSize={9-c*10} lineWidth={2}
            />
            <Line
            points={[
                [0, 2, -5],
                [-c * 5, -s * 5, -5],
            ]}
            color="rgb(6,219,217)" scale={1} dashed dashSize={0.5} 
            gapSize={9-c*10} lineWidth={2}
            />
            <Line
                points={[
                    [0, 2, -5],
                    [-c * 3, -s * 3, -5],
                ]}
                color="rgb(247,2,145)" scale={1} dashed
                dashSize={0.5} gapSize={9-c*10} lineWidth={2}
            /> */}
            {/* <Line
            points={[
                [0, 2, -5],
                [-c , -s , -5],
            ]}
            color="rgb(6,219,217)" scale={1} dashed dashSize={0.5} 
            gapSize={9-c*10} lineWidth={2}
            /> */}
            
        </>
        )}
    </>
    )
    }else{
        return(<></>)
    }
}

