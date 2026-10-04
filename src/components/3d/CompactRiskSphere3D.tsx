import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CompactRiskSphere3DProps {
  riskScore: number;
  className?: string;
}

const SIGNALS = [
  { name: 'Device', color: '#06B6D4', radius: 1.5, speed: 1.2, y: 0.3 },
  { name: 'IP', color: '#38BDF8', radius: 1.8, speed: -0.9, y: -0.4 },
  { name: 'Behavior', color: '#8B5CF6', radius: 2.1, speed: 1.5, y: 0.6 },
  { name: 'Velocity', color: '#F59E0B', radius: 2.4, speed: -1.1, y: -0.2 },
  { name: 'Location', color: '#10B981', radius: 2.7, speed: 0.8, y: 0.1 }
];

function CompactScene({ riskScore, reducedMotion = false }: { riskScore: number; reducedMotion?: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const orbitalGroup = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  const coreColor = riskScore >= 75 ? '#EF4444' : riskScore >= 35 ? '#F59E0B' : '#10B981';

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.3;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (orbitalGroup.current) {
      orbitalGroup.current.rotation.y = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.4;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group>
      {/* Central Risk Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshStandardMaterial
          color="#06121D"
          emissive={coreColor}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe Envelope */}
      <mesh>
        <sphereGeometry args={[0.92, 16, 16]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Multi-Axis Orbital Rings */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[1.6, 0.015, 12, 48]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.0, 0.012, 12, 48]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Orbiting Signals: Device, IP, Behavior, Velocity, Location */}
      <group ref={orbitalGroup}>
        {SIGNALS.map((sig, idx) => {
          return (
            <group key={idx}>
              {/* Orbital trajectory circle */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[sig.radius - 0.01, sig.radius + 0.01, 32]} />
                <meshBasicMaterial color={sig.color} transparent opacity={0.15} side={THREE.DoubleSide} />
              </mesh>

              {/* Orbiting signal node */}
              <mesh position={[Math.cos(idx * 1.3) * sig.radius, sig.y, Math.sin(idx * 1.3) * sig.radius]}>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshStandardMaterial color={sig.color} emissive={sig.color} emissiveIntensity={0.9} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export function CompactRiskSphere3D({ riskScore, className = "w-full h-44" }: CompactRiskSphere3DProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className} select-none bg-[#070B12] rounded-xl border border-white/10 overflow-hidden`}>
      <Canvas
        camera={{ position: [0, 1.2, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 4]} intensity={1.2} color="#38BDF8" />
        <CompactScene riskScore={riskScore} reducedMotion={reducedMotion} />
      </Canvas>

      {/* Mini Legend overlay */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-black/70 px-2.5 py-1 rounded-md border border-white/5 pointer-events-none">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Dev
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> IP
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Beh
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Vel
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Loc
        </span>
      </div>
    </div>
  );
}
