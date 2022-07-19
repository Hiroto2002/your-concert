/**
 * ポストプロセッシングによるエフェクト
 */
import { EffectComposer, Bloom} from '@react-three/postprocessing'
import { DotScreen } from '@react-three/postprocessing'

import { Suspense } from 'react'

export default function Effects(){
    return(
    <Suspense fallback={null}>
        <EffectComposer multisampling={8} autoclear={false}>
            <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={1.0} />
            {/* <DotScreen angle={Math.PI * 0.25} scale={1.0}/> */}
        </EffectComposer>
    </Suspense>
    )
}