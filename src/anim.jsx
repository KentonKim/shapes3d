import React, { useMemo, useRef } from "react"
import * as THREE from 'three'

function MeshAnim({
    position,
    rotation,
    grid: {
        width,
        height,
        sep
    }
}) {
    let {positions, colors, normals} = useMemo(() => {
        let positions = []
        let colors = []
        let normals = []
        for (let yi = 0; yi < height; yi++) {
            for (let xi = 0; xi < width; xi++) {
                let x = sep * ( xi - ( width - 1 ) / 2. )
                let y = sep * ( yi - ( height - 1 ) / 2. )
                let z = 0 // hard coded for now
                positions.push( x, y, z )

                let color = {
                    r: 1,
                    g: 1,
                    b: 1 
                }
                colors.push( color.r, color.g, color.b )
                normals.push( 0, 0, 1 )
            }
        }

        return {
            positions: new Float32Array(positions),
            colors: new Float32Array(colors),
            normals: new Float32Array(normals),
        }
    }, [width, height, sep])

    // index buffer
    let indices = useMemo(() => {
        let indices = []
        let i = 0;
        for (let yi = 0; yi < height - 1; yi++) {
            for (let xi = 0; xi < width - 1; xi++) {
                indices.push( i, i+1, i+width+1 ) // bottom right tri
                indices.push( i+width+1, i+width, i ) // top left tri
                i++ 
            }
            i++
        }

        return new Uint16Array(indices)
    }, [width, height])


    return (
        <mesh
            position={position}
            rotation={rotation}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach ='attributes-position'
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach ='attributes-color'
                    array={colors}
                    count={colors.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach ='attributes-normal'
                    array={normals}
                    count={normals.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={indices}
                    count={indices.length}
                />
            </bufferGeometry>
            <meshStandardMaterial
                attach='material'
                vertexColors
                side={THREE.DoubleSide}
                wireframe={true}
            />
        </mesh>
    )
}

export function Anim() {
    return (
        <MeshAnim 
            position={[0,0,0]}
            rotation={[Math.PI/2, 0, 0]}
            grid={{
                width: 100,
                height: 100,
                sep: 0.2
            }}
        />
    )
}  