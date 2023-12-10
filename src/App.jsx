import { Canvas, useThree} from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Stats } from '@react-three/drei'
import './App.css'
import { useEffect, useState } from 'react'
import {Anim} from "./anim"
import { ampDesc, freqDesc, lacunarityDesc, octavesDesc, persistenceDesc, scaleDesc } from './noiseDescriptions'

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


function App() {
  const [noiseParameters, setNoiseParameters] = useState(
    {
      scale: 1/8, 
      octaves: 10,
      persistence: 0.6,
      lacunarity: 2,
      amp: 1,
      freq: 1
    })

  const handleNoiseChange = (prop, value) => {
    setNoiseParameters({
      ...noiseParameters,
      [prop]: value
    })
  }

  return (
    <div className='app'>
      <div className='anim'>
        <Canvas
          camera = {{position: [0,2,10], fov: 75}} 
        >
          <CameraOrbitController />
          <ambientLight />
          <Anim noiseParameters={noiseParameters} />
          <Stats />
        </Canvas>
      </div>
      <div className='controls'>
        <form className='form-parameters'>
          <label htmlFor="scale" title={scaleDesc} >Scale: </label>
          <input type="number" name="scale" id="scale"
            value={noiseParameters.scale}
            onChange={(e) => handleNoiseChange('scale', e.target.value)}
          />
          <label htmlFor="octaves" title={octavesDesc} >Octaves: </label>
          <input type="number" name="octaves" id="octaves"
            value={noiseParameters.octaves}
            onChange={(e) => handleNoiseChange('octaves', e.target.value)}
          />
          <label htmlFor="persistence" title={persistenceDesc} >Persistence: </label>
          <input type="number" name="persistence" id="persistence"
            value={noiseParameters.persistence}
            onChange={(e) => handleNoiseChange('persistence', e.target.value)}
          />
          <label htmlFor="lacunarity" title={lacunarityDesc} >Lacunarity: </label>
          <input type="number" name="lacunarity" id="lacunarity"
            value={noiseParameters.lacunarity}
            onChange={(e) => handleNoiseChange('lacunarity', e.target.value)}
          />
          <label htmlFor="amp" title={ampDesc} >Amp: </label>
          <input type="number" name="amp" id="amp"
            value={noiseParameters.amp}
            onChange={(e) => handleNoiseChange('amp', e.target.value)}
          />
          <label htmlFor="freq" title={freqDesc} >Frequency: </label>
          <input type="number" name="freq" id="freq"
            value={noiseParameters.freq}
            onChange={(e) => handleNoiseChange('freq', e.target.value)}

          />
        </form>
      </div>
    </div>
  )
}

export default App
