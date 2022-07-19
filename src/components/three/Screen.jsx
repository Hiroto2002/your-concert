/**
 * 歌詞を表示するスクリーン
 */
import * as THREE from 'three'
import { Suspense,} from 'react'
import { RoundedBox } from '@react-three/drei/web'


export default function Screen({ color,char,...props}) {

    const createCanvasForTexture = (canvasWidth, canvasHeight, text, fontSize) => {
      // 貼り付けるcanvasを作成。
        const canvasForText = document.createElement('canvas');
        // 2dグラフィックを描画
        const ctx = canvasForText.getContext('2d');
        ctx.canvas.width = canvasWidth;
        ctx.canvas.height = canvasHeight;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillText(
            text,
            // x方向の余白/2をx方向開始時の始点とすることで、横方向の中央揃えをしている。
            (canvasWidth - ctx.measureText(text).width) / 2,
            // y方向のcanvasの中央に文字の高さの半分を加えることで、縦方向の中央揃えをしている。
            canvasHeight / 2 + ctx.measureText(text).actualBoundingBoxAscent/2 
        );
        return canvasForText;
    };

    // canvasをtextureに載せ、さらにmaterialに載せる。
    const canvasTexture = new THREE.CanvasTexture(
        createCanvasForTexture(500, 100,`${char}`, 25)
    );

    return (
        <Suspense fallback={null}>
            <RoundedBox   smoothness={1.0} radius={0.02} {...props} rotation={[0,0,0]} >
                <meshStandardMaterial   transparent={true} map={canvasTexture} />
            </RoundedBox>
        </Suspense>
    )
}