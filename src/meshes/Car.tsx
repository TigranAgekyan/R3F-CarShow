import React from 'react'
import {useFrame, useLoader} from '@react-three/fiber'
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh, Object3D } from 'three';

export default function Car() {

    const gltf = useLoader(GLTFLoader, [
        process.env.PUBLIC_URL + 'models/Chevrolet/scene.gltf'
    ]);

    React.useEffect(() => {
        console.log(gltf);
        gltf[0].scene.scale.set(.005,.005,.005);
        gltf[0].scene.position.set(0,0,0);
        gltf[0].scene.traverse((object) => {
            if(object instanceof Mesh){
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    },[gltf]);

    const wheelsArray:Object3D[] = [];
    const [rotateSpeed] = React.useState(1.8);
    gltf[0].scene.children[0].children[0].children[0].children.forEach((el) => {
        if(el.name.includes("Rim")){
            wheelsArray.push(el);
        }
    });

    useFrame((state, delta) => {
        wheelsArray.forEach((wheel) => {
            wheel.rotation.x += delta*rotateSpeed;
        });
    });

    return (
        <primitive object={gltf[0].scene}/>
    )
}
