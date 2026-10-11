import { Canvas, useFrame } from "@react-three/fiber";
import { Component, Suspense, useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Stars from "./stars";
import Earth from "./earth";
import Jupiter from "./jupiter";
import Mars from "./mars";
import Pluto from "./pluto";
import { useMainStore } from "../../statemanagement/store";
import * as THREE from "three";

class ThreeSceneBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function CameraController() {
  const currentPage = useMainStore((state) => state.currentPage);
  const fovRef = useRef(6);
  const targetX = useRef(4);

  useEffect(() => {
    if (currentPage === "header-page") {
      fovRef.current = 6;
      targetX.current = 4;
    } else if (currentPage === "about-page") {
      fovRef.current = 15;
      targetX.current = 4;
    } else if (currentPage === "skills-page") {
      fovRef.current = 45;
      targetX.current = 4;
    } else if (currentPage === "contact-page") {
      targetX.current = -6.1;
      fovRef.current = 15;
    }
  }, [currentPage]);

  useFrame((state, delta) => {
    if (state.camera instanceof THREE.PerspectiveCamera) {
      state.camera.fov = THREE.MathUtils.damp(
        state.camera.fov,
        fovRef.current,
        4,
        delta,
      );
      state.camera.updateProjectionMatrix();

      // --- Animate Position X ---
      state.camera.position.x = THREE.MathUtils.damp(
        state.camera.position.x,
        targetX.current,
        4, // Speed (Keep matching for perfectly synchronized animation)
        delta,
      );
    }
  });
  return null;
}

export default function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateDeviceSize = () => setIsMobile(mobileQuery.matches);

    mobileQuery.addEventListener("change", updateDeviceSize);
    return () => mobileQuery.removeEventListener("change", updateDeviceSize);
  }, []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black -z-40"
      style={{ width: "100%", height: "100dvh" }}
    >
      <ThreeSceneBoundary>
        <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          powerPreference: isMobile ? "low-power" : "high-performance",
          antialias: false,
        }}
          camera={{
            fov: 6,
            near: 0.1,
            far: 2000,
            position: [4, 0, 8],
          }}
        >
          <Suspense fallback={null}>
            <CameraController />
            <Stars count={isMobile ? 1600 : 5000} />
            <directionalLight position={[-2, 0.2, 1.5]} color={"white"} />
            <Mars />
            <Earth />
            <Jupiter />
            <Pluto />
          </Suspense>
        </Canvas>
      </ThreeSceneBoundary>
    </div>
  );
}
