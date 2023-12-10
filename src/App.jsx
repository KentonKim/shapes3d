import { Canvas, useThree} from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Stats } from '@react-three/drei'
import './App.css'
import { useEffect } from 'react'
import {Anim} from "./anim"

const CameraOrbitController = () => {
  const { camera, gl } = useThree()

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)
    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null;
}

function AnimationCanvas() {
  return(
    <Canvas
      // camera = {{position: [0,2,10], fov: 75}} 
    >
      <CameraOrbitController />
      <ambientLight />
      <Anim />
      <Stats />
    </Canvas>
  )
}

function App() {
  return (
    <div className='app'>
      <div className='anim'>
        <AnimationCanvas />
      </div>
      <div className='controls'>
        {/* add parameters for perlin noise */}
      </div>
    </div>
  )
}

export default App
