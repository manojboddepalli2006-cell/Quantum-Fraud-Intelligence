import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function ChipScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const packetsRef = useRef<THREE.Group>(null);

  // 16-Qubit Grid layout (4x4)
  const qubits = useMemo(() => {
    const list: Array<{ id: number; pos: [number, number, number]; isMeasurementNode: boolean }> = [];
    let count = 0;
    for (let r = -1.5; r <= 1.5; r += 1.0) {
      for (let c = -1.5; c <= 1.5; c += 1.0) {
        list.push({
          id: count++,
          pos: [c * 1.35, 0.08, r * 1.35],
          isMeasurementNode: Math.abs(r) === 1.5 || Math.abs(c) === 1.5
        });
      }
    }
    return list;
  }, []);

  // Transmission line segments (Coplanar waveguides)
  const linesGeom = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < qubits.length; i++) {
      for (let j = i + 1; j < qubits.length; j++) {
        const p1 = new THREE.Vector3(...qubits[i].pos);
        const p2 = new THREE.Vector3(...qubits[j].pos);
        if (p1.distanceTo(p2) <= 1.45) {
          points.push(p1, p2);
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [qubits]);

  // Perimeter Wirebond Arches
  const wirebondCurves = useMemo(() => {
    const curves: THREE.Vector3[][] = [];
    const pads = 24;
    for (let i = 0; i < pads; i++) {
      const angle = (i / pads) * Math.PI * 2;
      const inner = new THREE.Vector3(Math.cos(angle) * 2.3, 0.08, Math.sin(angle) * 2.3);
      const outer = new THREE.Vector3(Math.cos(angle) * 2.65, 0.02, Math.sin(angle) * 2.65);
      const mid = inner.clone().add(outer).multiplyScalar(0.5);
      mid.y += 0.16; // arch height
      const curve = new THREE.QuadraticBezierCurve3(inner, mid, outer);
      curves.push(curve.getPoints(12));
    }
    return curves;
  }, []);

  useFrame((state) => {
    if (reducedMotion) {
      if (groupRef.current) {
        groupRef.current.rotation.x = 0.85;
        groupRef.current.rotation.y = 0.2;
      }
      return;
    }
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer; // mouse coordinates (-1 to 1)

    if (groupRef.current) {
      // Subtle smooth mouse tilting interaction (1-2 degrees max)
      groupRef.current.rotation.x = 0.85 + y * 0.15;
      groupRef.current.rotation.y = t * 0.08 + x * 0.2;
    }

    if (packetsRef.current) {
      packetsRef.current.children.forEach((child, idx) => {
        child.position.x = Math.sin(t * 1.8 + idx) * 1.7;
        child.position.z = Math.cos(t * 1.8 + idx) * 1.7;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* High-purity Silicon Die Substrate (Polished wafer) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5.0, 0.14, 5.0]} />
        <meshStandardMaterial
          color="#060C16"
          roughness={0.18}
          metalness={0.92}
        />
      </mesh>

      {/* Gold-plated Ceramic Chip Carrier Rim */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[5.6, 0.16, 5.6]} />
        <meshStandardMaterial
          color="#1E293B"
          roughness={0.35}
          metalness={0.8}
        />
      </mesh>

      {/* Gold Perimeter Bonding Pads */}
      {wirebondCurves.map((pts, wIdx) => (
        <line key={`wb-${wIdx}`}>
          <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(pts)} />
          <lineBasicMaterial color="#D4AF37" linewidth={1} />
        </line>
      ))}

      {/* Niobium Coplanar Waveguide Transmission Grid */}
      <lineSegments geometry={linesGeom}>
        <lineBasicMaterial color="#0284C7" transparent opacity={0.65} />
      </lineSegments>

      {/* 16 Superconducting Transmon Qubits */}
      {qubits.map((q) => (
        <group key={q.id} position={q.pos}>
          {/* Outer Resonator Pocket */}
          <mesh>
            <boxGeometry args={[0.38, 0.04, 0.38]} />
            <meshStandardMaterial
              color="#0F172A"
              roughness={0.25}
              metalness={0.85}
            />
          </mesh>

          {/* Central Josephson Junction Cross with Controlled Subtle Illumination */}
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 8]} />
            <meshStandardMaterial
              color={q.isMeasurementNode ? '#06B6D4' : '#8B5CF6'}
              emissive={q.isMeasurementNode ? '#06B6D4' : '#8B5CF6'}
              emissiveIntensity={0.5}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Microwave Pulse Packets (Data Streams) */}
      <group ref={packetsRef}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <mesh key={idx} position={[0, 0.14, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#38BDF8' : '#10B981'} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function QuantumLab3D({ className = "w-full h-80 sm:h-96" }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className} select-none bg-[#070B12] rounded-2xl border border-white/10 overflow-hidden`}>
      <Canvas
        camera={{ position: [0, 3.0, 5.0], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={['#070B12', 4, 16]} />
        <ambientLight intensity={0.4} color="#0E1E2E" />
        <directionalLight position={[4, 8, 4]} intensity={1.4} color="#E2E8F0" />
        <pointLight position={[-4, -2, -2]} intensity={0.8} color="#06B6D4" distance={6} />
        <ChipScene reducedMotion={reducedMotion} />
      </Canvas>

      {/* Overlay status tags */}
      <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-mono">
        <span className="px-2.5 py-1 rounded-md bg-black/80 border border-white/10 text-cyan-400 font-semibold">
          16-Qubit Transmon Quantum Processor Die
        </span>
        <span className="text-slate-500 hidden sm:inline">·</span>
        <span className="text-slate-400 text-[11px] hidden sm:inline">Move cursor to tilt wafer (max 2°)</span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-black/80 px-3 py-1.5 rounded-lg border border-white/5 pointer-events-none">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Coplanar Waveguides Active (5.2 GHz)
        </span>
        <span>Josephson Junction: Al/AlOx/Al</span>
        <span className="text-cyan-300">Base: 15 mK</span>
      </div>
    </div>
  );
}
