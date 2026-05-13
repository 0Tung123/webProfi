"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      time.current += delta;
      pointsRef.current.rotation.y = time.current * 0.05;
      pointsRef.current.rotation.x = Math.sin(time.current * 0.3) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffd700" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene() {
  return (
    <div
      className="fixed inset-0 -z-10 bg-black"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <React.Suspense fallback={null}>
          <Particles />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
