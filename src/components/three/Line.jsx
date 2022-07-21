/**
 * 線が動くアニメーション
 */
import React from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'

export default function LineAnimation({startlylic,segment}) {
    const [v, setV] = React.useState(1)

    useFrame(({ clock }) => {
        setV(Math.abs(Math.sin(clock.elapsedTime*2)))
    })

    if(startlylic){
    return(
    <>
    {/* 歌詞背景 */}
        <Line
            points={[
                [-15, 2, -4],
                [15, 2, -4],
            ]} 
            color="#000" scale={1} lineWidth={70}
        />

        {/* 1 */}
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
                ]} 
            color={segment?"rgb(247,2,145)":"rgb(6,219,217)"} dashed dashSize={v * 3} gapSize={9 - v * 9} 
            scale={2} position={[-14,0,-5]} lineWidth={3} rotation={[0,Math.PI,0]}
        />
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
            ]}
           color={segment?"rgb(6,219,217)":"rgb(247,2,145)"} dashed dashSize={v*3} gapSize={9 - v * 9} 
            scale={3} position={[-14,-1,-5]} lineWidth={2}
        />

        {/* 2 */}
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
                ]} 
           color={segment?"rgb(6,219,217)":"rgb(247,2,145)"} dashed dashSize={v * 3} gapSize={9 - v * 9} 
            scale={2} position={[-7,0,-5]} lineWidth={3} rotation={[0,Math.PI,0]}
        />
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
            ]}
           color={segment?"rgb(247,2,145)":"rgb(6,219,217)"} dashed dashSize={v*3} gapSize={9 - v * 9} 
            scale={3} position={[-7,-1,-5]} lineWidth={2}
        />



        {/* 真ん中 3*/}
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
                ]} 
           color={segment?"rgb(247,2,145)":"rgb(6,219,217)"} dashed dashSize={v * 3} gapSize={9 - v * 9} 
            scale={2} position={[0,0,-5]} lineWidth={3} rotation={[0,Math.PI,0]}
        />
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
            ]}
           color={segment?"rgb(6,219,217)":"rgb(247,2,145)"} dashed dashSize={v*3} gapSize={9 - v * 9} 
            scale={3} position={[0,-1,-5]} lineWidth={2}
        />

        {/* 4 */}
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
                ]} 
           color={segment?"rgb(6,219,217)":"rgb(247,2,145)"} dashed dashSize={v * 3} gapSize={9 - v * 9} 
            scale={2} position={[7,0,-5]} lineWidth={3} rotation={[0,Math.PI,0]}
        />
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
            ]}
           color={segment?"rgb(247,2,145)":"rgb(6,219,217)"} dashed dashSize={v*3} gapSize={9 - v * 9} 
            scale={3} position={[7,-1,-5]} lineWidth={2}
        />

        {/* 5 */}
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
                ]} 
           color={segment?"rgb(247,2,145)":"rgb(6,219,217)"} dashed dashSize={v * 3} gapSize={9 - v * 9} 
            scale={2} position={[14,0,-5]} lineWidth={3} rotation={[0,Math.PI,0]}
        />
        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
            ]}
           color={segment?"rgb(6,219,217)":"rgb(247,2,145)"} dashed dashSize={v*3} gapSize={9 - v * 9} 
            scale={3} position={[14,-1,-5]} lineWidth={2}
        />
    </>
    )
    }else{
        return(<></>)
    }
}

