import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Group } from "three";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { commonColor, vs, fs } from "./assets/constants";
import { useMainStore } from "../../statemanagement/store";
import { publicAsset } from "../../assets/publicAsset";

export default function Earth() {
  // store solid state
  const currentPage = useMainStore((state) => state.currentPage);

  const earth = useRef<Group>(null);
  const targetY = useRef(-1);

  const uniform = {
    color1: { value: new THREE.Color("skyblue") },
    color2: { value: new THREE.Color(commonColor) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  // const earth_normal = useTexture('../three assets/Earth/earthmap1k.jpg')
  const [earth_normal, earthLights, earthClouds] = useTexture([
    publicAsset("three assets/Earth/earthmap1k.jpg"),
    publicAsset("three assets/Earth/earthlights1k.jpg"),
    publicAsset("three assets/Earth/earthcloudmap.jpg"),
  ]);

  useEffect(() => {
    if (currentPage === "header-page") targetY.current = -1;
    else if (currentPage === "about-page") targetY.current = 0;
    else {
      targetY.current = 0;
    }
  }, [currentPage]);

  useFrame((state, delta) => {
    if (earth.current !== null) earth.current.rotation.y += delta * 0.08;
    if (!earth.current) return;

    earth.current.position.y = THREE.MathUtils.lerp(
      earth.current.position.y,
      targetY.current,
      0.05,
    );
  });

  return (
    <group
      ref={earth}
      scale={1}
      rotateZ={(-23.4 * Math.PI) / 180}
      position={[0, -1, 0]}
    >
      <mesh>
        <icosahedronGeometry args={[1, 16]} />
        <meshStandardMaterial map={earth_normal} />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1, 16]} />
        <meshBasicMaterial
          map={earthLights}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1, 16]} />

        <meshStandardMaterial
          map={earthClouds}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.5}
        />
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
