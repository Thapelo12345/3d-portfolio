import { useFrame } from "@react-three/fiber";
import { useTexture } from '@react-three/drei'
import { Group } from "three";
import { useRef } from "react";
import * as THREE from "three"
import { commonColor, vs, fs } from "./assets/constants";

export default function Mars(){
 const mars = useRef<Group>(null);

  const uniform = {
        color1: { value: new THREE.Color("hsl(18°, 45%, 47%)") },
        color2: { value: new THREE.Color(commonColor) },
        fresnelBias: { value: 0.1 },
        fresnelScale: { value: 1.0 },
        fresnelPower: { value: 4.0 },
      };

  const [mars_normal, jupiter_1k_topo] = useTexture([
    "../three assets/mars/marsmap1k.jpg",
    '../three assets/mars/mars_1k_topo.jpg',
  ])

   useFrame((state, delta) => {
      if (mars.current !== null) mars.current.rotation.y += delta * 0.08;
    });

  return (
    <group 
    ref={mars}
    scale={1}
     rotateZ={(-23.4 * Math.PI) / 180}
     position={[5, 0, 0]}
     >
    
    <mesh >
        <icosahedronGeometry args={[1, 16]} />
        <meshStandardMaterial 
        map={mars_normal}
        />

        <mesh>
        <icosahedronGeometry args={[1, 16]} />
        
        <meshStandardMaterial 
        map={jupiter_1k_topo} 
        blending={THREE.AdditiveBlending}
        transparent={true}
        opacity={0.1}
        />
               
        </mesh>
         
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1, 16]} />
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