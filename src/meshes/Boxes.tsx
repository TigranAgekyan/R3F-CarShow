import { useFrame } from '@react-three/fiber';
import React from 'react'
import {Color, Mesh, Vector3} from 'three'

interface IBox{
    color: Color;
}

function Box(props: IBox){
    const box = React.useRef<Mesh>(null);
    const [scale,setScale] = React.useState(() => (Math.pow(Math.random(), 2.0) * 0.5 + 0.05));
    const [xRotationSpeed] = React.useState(() => Math.random());
    const [yRotationSpeed] = React.useState(() => Math.random());
    const [travelSpeed] = React.useState(1.5);
    const [position, setPosition] = React.useState(startPosition);

    function startPosition(){
        let v = new Vector3((Math.random() * 2 - 1) * 3, (Math.random() * 2.5 - 0.1), ((Math.random() * 2 - 1) * 30));
        if (v.x < 0) v.x -= 1.75;
        if (v.x > 0) v.x += 1.75;

        return(v);
    }

    function resetPosition(){
        let v = new Vector3((Math.random() * 2 - 1) * 3, (Math.random() * 2.5 - 0.1), ((Math.random() * 4) * 15));
        if (v.x < 0) v.x -= 1.75;
        if (v.x > 0) v.x += 1.75;
        setPosition(v);
    }

    useFrame((state, delta) => {
        const elapsed = state.clock.getElapsedTime();

        let distFromStart = Math.min((position.z - box.current!.position.z)*.5, 1);
        let distFromEnd = Math.min((box.current!.position.z - (-15))*0.5, 1);
        //console.log("Distance From Start: "+distFromStart+"\nDistance From End: "+distFromEnd);
        box.current!.scale.setScalar(scale*distFromStart*distFromEnd);

        box.current!.position.z -= delta*travelSpeed;

        box.current!.rotation.x += delta*xRotationSpeed;
        box.current!.rotation.y += delta*yRotationSpeed;

        if(box.current!.position.z < -15){
            resetPosition();
        }
    });

  return (
    <mesh ref={box} scale={scale} castShadow position={position}>
        <boxGeometry args={[1,1,1]}/>
        <meshStandardMaterial color={props.color} envMapIntensity={0.15}/>
    </mesh>
  )
}

export default function Boxes() {
    const [arr] = React.useState(() => {
        let a = [];
        for (let i = 0; i< 100; i++){
            a.push(0);
        }
        return a;
    });

    return <>
        {arr.map((e, i)=> <Box key={i} color={i % 2 == 0 ? new Color(0.4,0.1,0.1):new Color(0.05,0.15,0.4)}/>)}
    </>
}
