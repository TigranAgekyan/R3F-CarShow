import React from 'react'
import {useFrame, useLoader} from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three';

export default function FloatingGrid() {
    const diffuse = useLoader(TextureLoader,
        process.env.PUBLIC_URL + 'textures/grid-texture.png'
        );

    React.useEffect(() => {
        diffuse.anisotropy = 4;
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.repeat.set(50,50);
        diffuse.offset.set(0,0);
    },[diffuse]);
    
    useFrame((state) => {
        const elapsed = state.clock.getElapsedTime();
        let z = -elapsed * 0.68;
        diffuse.offset.set(0,z);
    });

  return (
    <mesh position={[0,0.15,0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[50,50]}/>
        <meshBasicMaterial
        color={[1,1,1]}
        opacity={0.5}
        map={diffuse}
        alphaMap={diffuse}
        transparent={true}
        />
    </mesh>
  )
}
