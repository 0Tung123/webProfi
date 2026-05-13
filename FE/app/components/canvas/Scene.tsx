"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Helper function to get exact scroll progress directly from the window
// which is already perfectly smoothed by Lenis.
function getScrollProgress() {
  if (typeof window === "undefined") return 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return maxScroll > 0 ? window.scrollY / maxScroll : 0;
}

function FloatingShape() {
  const { viewport } = useThree();
  const ref = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (ref.current) {
      time.current += delta;
      const scroll = getScrollProgress();
      
      const baseTargetY = THREE.MathUtils.lerp(-viewport.height, viewport.height * 0.2, scroll * 1.5);
      const floatY = Math.sin(time.current * 2) * 0.1;
      
      // Sử dụng damp với speed = 20 để khử lỗi "răng cưa" (giật) do window.scrollY bị làm tròn thành số nguyên
      ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, baseTargetY + floatY, 20, delta);
      
      const targetRotX = THREE.MathUtils.lerp(0.2, -0.1, scroll) + time.current * 0.1;
      ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetRotX, 20, delta);
      
      ref.current.rotation.y = Math.sin(time.current * 0.5) * 0.1 + time.current * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[viewport.width * 0.2, -viewport.height, 0]}>
      <icosahedronGeometry args={[1.5, 16]} />
      <MeshDistortMaterial 
        color="#d5af34"
        distort={0.3} 
        speed={2} 
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </mesh>
  );
}

function Particles() {
  const count = 300;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      time.current += delta;
      const scroll = getScrollProgress();
      
      const targetRotY = time.current * 0.05 + scroll * Math.PI;
      pointsRef.current.rotation.y = THREE.MathUtils.damp(pointsRef.current.rotation.y, targetRotY, 20, delta);
      
      const targetY = scroll * 2;
      pointsRef.current.position.y = THREE.MathUtils.damp(pointsRef.current.position.y, targetY, 20, delta);
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
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <React.Suspense fallback={null}>
          <FloatingShape />
          <Particles />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
