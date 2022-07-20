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
            color="rgb(6,219,217)" dashed dashSize={v * 3} gapSize={9 - v * 9} 
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
            color="rgb(247,2,145)" dashed dashSize={v*3} gapSize={9 - v * 9} 
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
            color="rgb(247,2,145)" dashed dashSize={v * 3} gapSize={9 - v * 9} 
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
            color="rgb(6,219,217)" dashed dashSize={v*3} gapSize={9 - v * 9} 
            scale={3} position={[-7,-1,-5]} lineWidth={2}
        />



                {/* 真ん中 */}
                <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
                ]} 
            color="rgb(6,219,217)" dashed dashSize={v * 3} gapSize={9 - v * 9} 
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
            color="rgb(247,2,145)" dashed dashSize={v*3} gapSize={9 - v * 9} 
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
            color="rgb(247,2,145)" dashed dashSize={v * 3} gapSize={9 - v * 9} 
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
            color="rgb(6,219,217)" dashed dashSize={v*3} gapSize={9 - v * 9} 
            scale={3} position={[7,-1,-5]} lineWidth={2}
        />

        <Line
            points={[
                [-1, 0, 0],
                [-1, 2, 0],
                [1, 2, 0],
                [1, 0, 0],
                [-1, 0, 0],
                ]} 
            color="rgb(6,219,217)" dashed dashSize={v * 3} gapSize={9 - v * 9} 
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
            color="rgb(247,2,145)" dashed dashSize={v*3} gapSize={9 - v * 9} 
            scale={3} position={[14,-1,-5]} lineWidth={2}
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

