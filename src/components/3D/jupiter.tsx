import { useFrame } from "@react-three/fiber";
import { useTexture } from '@react-three/drei'
import { Group } from "three";
import { useRef, useEffect } from "react";
import { useMainStore } from "../../statemanagement/store";
import * as THREE from "three"
import {  commonColor, vs, fs } from "./assets/constants";

export default function Jupiter() {
  const jupiter = useRef<Group>(null);
  const targetX = useRef(-4)
  const currentPage = useMainStore((state)=> state.currentPage)

  const uniform = {
        color1: { value: new THREE.Color("#EEDBB2") },
        color2: { value: new THREE.Color(commonColor) },
        fresnelBias: { value: 0.1 },
        fresnelScale: { value: 1.0 },
        fresnelPower: { value: 4.0 },
  };

  const [jupiter_normal, jupiter_2k] = useTexture([
    "../three assets/Jupiter/jupitermap.jpg",
    '../three assets/Jupiter/jupiter2_1k.jpg',
  ])

  useEffect(()=>{
  if (currentPage === "header-page") targetX.current = -10;
  else if (currentPage === "about-page") targetX.current = -10
  else if(currentPage === "skills-page") targetX.current = -4
  else targetX.current = -4
  }, [currentPage])

   useFrame((state, delta) => {
      if (jupiter.current !== null) jupiter.current.rotation.y += delta * 0.08;
      if(!jupiter.current) return;

      jupiter.current.position.x = THREE.MathUtils.lerp(
      jupiter.current.position.x, 
      targetX.current, 
      0.05
);
    });

  return (
    <group 
    ref={jupiter} scale={1}
     rotateZ={(-23.4 * Math.PI) / 180}
     position={[-4, 0, 0]}
     >
    
    <mesh >
        <icosahedronGeometry args={[1, 13]} />
        <meshStandardMaterial 
        map={jupiter_normal}
        />

        <mesh>
        <icosahedronGeometry args={[1, 13]} />
        
        <meshStandardMaterial 
        map={jupiter_2k} 
        blending={THREE.AdditiveBlending}
        transparent={true}
        opacity={0.1}
        />
               
        </mesh>
         
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1, 13]} />
        <shaderMaterial 
        uniforms={uniform}
        vertexShader={vs}
        fragmentShader={fs}
        transparent={true}
        blending={THREE.AdditiveBlending}
        />
        </mesh>
    </group>
  );
}
