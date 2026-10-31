import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, RoundedBox, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCard({ position, rotation, color, scale = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      mesh.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <RoundedBox ref={mesh} args={[1.6 * scale, 1.0 * scale, 0.05 * scale]} radius={0.08} position={position} rotation={rotation}>
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.2} />
      </RoundedBox>
    </Float>
  );
}

function FloatingOrb({ position, color, size = 0.3 }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <Sphere args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function FloatingDocument({ position }) {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.15;
    }
  });
  return (
    <group ref={group} position={position}>
      <RoundedBox args={[1.2, 1.6, 0.04]} radius={0.06}>
        <meshStandardMaterial color="#ffffff" metalness={0.0} roughness={0.4} />
      </RoundedBox>
      {[...Array(5)].map((_, i) => (
        <Box key={i} args={[0.8, 0.04, 0.01]} position={[0, 0.5 - i * 0.2, 0.025]}>
          <meshStandardMaterial color={i === 0 ? '#2563EB' : '#E2E8F0'} />
        </Box>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-5, 3, -5]} color="#8B5CF6" intensity={0.8} />
      <pointLight position={[5, -2, 3]} color="#06B6D4" intensity={0.6} />

      {/* Main floating cards */}
      <FloatingCard position={[0, 0, 0]} rotation={[0.1, -0.2, 0.05]} color="#2563EB" scale={1.2} />
      <FloatingCard position={[-1.8, -0.8, -0.8]} rotation={[-0.05, 0.3, -0.1]} color="#ffffff" />
      <FloatingCard position={[1.6, 0.9, -1]} rotation={[0.05, -0.15, 0.08]} color="#8B5CF6" scale={0.85} />

      {/* Document */}
      <FloatingDocument position={[2.2, -0.5, 0.5]} />

      {/* Orbs */}
      <FloatingOrb position={[-2.5, 1.2, 0]} color="#06B6D4" size={0.35} />
      <FloatingOrb position={[2.8, -1.5, -0.5]} color="#8B5CF6" size={0.25} />
      <FloatingOrb position={[-1.5, -1.8, 0.5]} color="#2563EB" size={0.2} />
    </>
  );
}

export function WorkspaceScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
}
