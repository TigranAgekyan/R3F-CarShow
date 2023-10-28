import React, {Suspense} from 'react';
import {Canvas, Vector3} from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera, Environment, CubeCamera} from '@react-three/drei';
import Ground from '../meshes/Ground';
import { MeshBasicMaterial, Vector2 } from 'three';
import Car from '../meshes/Car';
import Rings from '../meshes/Rings';
import Boxes from '../meshes/Boxes';
import { Autofocus, Bloom, ChromaticAberration, DepthOfField, EffectComposer, LensFlare, Noise, Pixelation, SMAA, SSAO, Vignette } from '@react-three/postprocessing';
import {BlendFunction, KernelSize, KawaseBlurPass} from 'postprocessing'
import FloatingGrid from '../meshes/FloatingGrid';

function CarShow() {
    const cam_dist_mult = 4;
    const cam_height_mult = 2;
    const [cameraPos, setCameraPos] = React.useState<Vector3>([3 * cam_dist_mult,4 * cam_height_mult,5 * cam_dist_mult]);
  
    return (
      <>
        <OrbitControls target={[0,0.35,0]}/>
        <PerspectiveCamera makeDefault fov={10} position={cameraPos}/>
        <color args={[0, 0, 0]} attach="background" />
  
        <CubeCamera resolution={256} frames={Infinity}>
          {(texture) => (
            <>
              <Environment map={texture}/>
              <Car/>
            </>
          )}
        </CubeCamera>
  
        <Rings/>
        <Boxes/>
  
        <spotLight
          color={[1, 0.25, 0.7]}
          intensity={300}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <spotLight
          color={[0.14, 0.5, 1]}
          intensity={400}
          angle={0.6}
          penumbra={0.5}
          position={[-5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <Ground/>
        <FloatingGrid/>
  
        <EffectComposer multisampling={25}>
          <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={.25}
          width={300}
          height={300}
          kernelSize={KernelSize.HUGE}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.025}
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL}
            offset={new Vector2(0.001, 0.001)}
            radialModulation={false}
            modulationOffset={0}/>
          <Vignette
          darkness={.75}
          offset={.25}
          />
        </EffectComposer>
  
      </>
    );
  }

export default function Index() {
  return (
    <>
    <Suspense fallback={null}>
      <Canvas className='z-0' shadows style={{width: '100vw', height: '100vh'}}>
        <CarShow/>
      </Canvas>
    </Suspense>
    </>
  )
}
