import { useFrame } from "@react-three/fiber"
import React, { useMemo, useRef } from "react"
import * as THREE from 'three'
import noise from './noise'

function MeshAnim({
    position,
    rotation,
    grid: {
        width,
        height,
        sep
    },
    colorOfXYZT,
    zOfXYT,
    anim: {
        init,
        update
    }
}) {
    let t = init // time
    let {positions, colors, normals} = useMemo(() => {
        let positions = []
        let colors = []
        let normals = []
        for (let yi = 0; yi < height; yi++) {
            for (let xi = 0; xi < width; xi++) {
                let x = sep * ( xi - ( width - 1 ) / 2. )
                let y = sep * ( yi - ( height - 1 ) / 2. )
                let z = zOfXYT(x,y,t)
                positions.push( x, y, z )

                let color = colorOfXYZT(x,y,z,t)
                colors.push( color.r, color.g, color.b )
                normals.push( 0, 0, 1 )
            }
        }

        return {
            positions: new Float32Array(positions),
            colors: new Float32Array(colors),
            normals: new Float32Array(normals),
        }
    }, [width, height, sep, zOfXYT, colorOfXYZT, t])

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

    // animation
    let posRef = useRef()
    let colorRef = useRef()
    useFrame(() => {
        t = update(t)
        const positions = posRef.current.array
        const colors = colorRef.current.array
        let i = 0
        for (let yi = 0; yi < height; yi++) {
            for (let xi = 0; xi < width; xi++) {
                // positions[i+2] = zOfXYT(positions[i], positions[i+1], t)
                // const zValue = zOfXYT(positions[i], positions[i+1], t)
                const zValue = zOfXYT(positions[i]+3*t, positions[i+1]+3*t, 1)
                positions[i+2] = zValue > 0 ? zValue : zValue/ 5
                let c = colorOfXYZT(positions[i], positions[i+1], positions[i+2], t)
                colors[i] = c.r    
                colors[i+1] = c.g
                colors[i+2] = c.b
                i += 3
            }
        }

        posRef.current.needsUpdate = true
        colorRef.current.needsUpdate = true
    })

    return (
        <mesh
            position={position}
            rotation={rotation}
        >
            <bufferGeometry>
                <bufferAttribute
                    ref={posRef}
                    attach ='attributes-position'
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    ref={colorRef}
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
                wireframe={false}
            />
        </mesh>
    )
}

export function Anim({noiseParameters}) {
    const seed = Math.floor(Math.random() * (2**16))
    noise.seed(seed)
    const sampleNoise = (x, y, z) => {
        let scale = noiseParameters.scale
        let octaves = noiseParameters.octaves
        let persistence = noiseParameters.persistence
        let lacunarity = noiseParameters.lacunarity
        let amp = noiseParameters.amp
        let freq = noiseParameters.freq

        let value = 0
        for (let i = 0; i < octaves; i++) {
            value += amp*noise.perlin3(x*freq*scale, y*freq*scale, z)
            amp *= persistence
            freq *= lacunarity
        }

        return value
    }

    const zOfXYT = (x,y,t) => {
        return sampleNoise(x,y,t)
    }

    const colorOfXYZT = (x,y,z,t) => {
        return {
            r: z,
            g: z/5,
            b: Math.sqrt(x**2 + y** 2)/75,
        }
    }
    return (
        <MeshAnim 
            position={[0,0,0]}
            rotation={[-Math.PI/2, 0, 0]}
            grid={{
                width: 100,
                height: 100,
                sep: 0.2
            }}
            zOfXYT={zOfXYT}
            colorOfXYZT={colorOfXYZT}
            anim={{
                init: 0,
                update: (t) => t + 0.002
            }}
        />
    )
}  