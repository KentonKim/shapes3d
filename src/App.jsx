import { Canvas } from '@react-three/fiber'
import { Anim } from './anim'
import './App.css'

function AnimationCanvas() {
  return(
    <Canvas
      camera = {{position: [0,2,10], fov: 75}} 
    >
      <ambientLight />
      <directionalLight position={[5,5,5]} intensity={0.5} />
      <Anim />
    </Canvas>
  )
}

function App() {
  return (
    <div className='app'>
      <div>hello</div>
      <div className='anim'>
        <AnimationCanvas />
      </div>
    </div>
  )
}

export default App
