import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface BlochSphereProps {
  theta?: number; // 0 to PI (0 is |0>, PI is |1>)
  phi?: number;   // 0 to 2PI (phase)
  riskScore?: number; // 0 to 100
  interactive?: boolean;
  reducedMotion?: boolean;
}

function BlochSphereObject({ theta = 0.5, phi = 1.2, riskScore = 15, reducedMotion = false }: BlochSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const arrowRef = useRef<THREE.Group>(null);

  // Compute cartesian coordinates on unit sphere of radius 2.2
  const r = 2.2;
  // If riskScore is given, calculate theta dynamically: 0% risk -> theta=0.15 (near |0>), 100% risk -> theta=3.0 (near |1>)
  const calculatedTheta = (riskScore / 100) * Math.PI * 0.95 + 0.05;
  const targetX = r * Math.sin(calculatedTheta) * Math.cos(phi);
  const targetY = r * Math.cos(calculatedTheta); // z in physics, y in three.js
  const targetZ = r * Math.sin(calculatedTheta) * Math.sin(phi);

  useFrame((state) => {
    if (reducedMotion) return;
    if (groupRef.current) {
      // gentle idle rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  const stateColor = riskScore > 70 ? '#EF4444' : riskScore > 35 ? '#F59E0B' : '#06B6D4';

  return (
    <group ref={groupRef}>
      {/* Semi-transparent Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[r, 24, 24]} />
        <meshBasicMaterial
          color="#06B6D4"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Inner faint translucent core */}
      <mesh>
        <sphereGeometry args={[r * 0.98, 32, 32]} />
        <meshStandardMaterial
          color="#0A0F18"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Equator Ring (Superposition Boundary) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[r - 0.015, r + 0.015, 64]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* Coordinate Axes */}
      {/* Z Axis (|0> to |1>) */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -r * 1.25, 0),
          new THREE.Vector3(0, r * 1.25, 0)
        ])} />
        <lineBasicMaterial attach="material" color="#64748B" transparent opacity={0.6} />
      </line>

      {/* X Axis */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-r * 1.25, 0, 0),
          new THREE.Vector3(r * 1.25, 0, 0)
        ])} />
        <lineBasicMaterial attach="material" color="#64748B" transparent opacity={0.3} />
      </line>

      {/* North Pole |0> Marker (Legitimate state) */}
      <mesh position={[0, r, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>

      {/* South Pole |1> Marker (Fraud state) */}
      <mesh position={[0, -r, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#EF4444" />
      </mesh>

      {/* Qubit State Vector |Ψ⟩ */}
      <group ref={arrowRef}>
        <line>
          <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(targetX, targetY, targetZ)
          ])} />
          <lineBasicMaterial attach="material" color={stateColor} linewidth={2} />
        </line>

        {/* State Vector Tip Node */}
        <mesh position={[targetX, targetY, targetZ]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={stateColor}
            emissive={stateColor}
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}

export function BlochSphereCanvas({
  riskScore = 14,
  interactive = true,
  className = "w-full h-64"
}: {
  riskScore?: number;
  interactive?: boolean;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className} select-none`}>
      <Canvas
        camera={{ position: [3.5, 2.5, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <BlochSphereObject riskScore={riskScore} reducedMotion={reducedMotion} />
        {interactive && <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI - 0.1} minPolarAngle={0.1} />}
      </Canvas>
      
      {/* Coordinate annotations */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 bg-slate-900/70 px-2 py-0.5 rounded border border-white/5 pointer-events-none">
        North: |0⟩ Legitimate · South: |1⟩ Fraud
      </div>
      <div className="absolute bottom-2 right-2 text-[11px] font-mono text-cyan-400 bg-slate-900/70 px-2 py-0.5 rounded border border-cyan-500/20 pointer-events-none">
        |Ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
      </div>
    </div>
  );
}
