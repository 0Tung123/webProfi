"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useScroll } from "framer-motion";
import * as THREE from "three";

function FloatingShape() {
  const { viewport } = useThree();
  const ref = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    if (ref.current) {
      const scroll = scrollYProgress.get();
      
      const targetY = THREE.MathUtils.lerp(-viewport.height, viewport.height * 0.2, scroll * 1.5);
      ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 4, state.delta);
      
      ref.current.rotation.x = THREE.MathUtils.lerp(0.2, -0.1, scroll) + state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float floatIntensity={2} rotationIntensity={1} speed={2}>
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
    </Float>
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
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    if (pointsRef.current) {
      const scroll = scrollYProgress.get();
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scroll * Math.PI;
      pointsRef.current.position.y = scroll * 2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
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
