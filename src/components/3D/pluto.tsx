import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Group } from "three";
import { useRef } from "react";
import * as THREE from "three";
import { commonColor, vs, fs } from "./assets/constants";
import { publicAsset } from "../../assets/publicAsset";

export default function Pluto() {
  const pluto = useRef<Group>(null);

  const uniform = {
    color1: { value: new THREE.Color("hsl(18°, 45%, 47%)") },
    color2: { value: new THREE.Color(commonColor) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  const [pluto_normal, pluto_1k_topo] = useTexture([
    publicAsset("three assets/pluto/Pluto_map1.jpg"),
    publicAsset("three assets/pluto/pluto_map.jpg"),
  ]);

  useFrame((state, delta) => {
    if (pluto.current !== null) pluto.current.rotation.y += delta * 0.08;
  });

  return (
    <group
      ref={pluto}
      scale={1}
      rotateZ={(-23.4 * Math.PI) / 180}
      position={[-10, 0, 0]}
    >
      <mesh>
        <icosahedronGeometry args={[1, 16]} />
        <meshStandardMaterial map={pluto_normal} />

        <mesh>
          <icosahedronGeometry args={[1, 16]} />

          <meshStandardMaterial
            map={pluto_1k_topo}
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
