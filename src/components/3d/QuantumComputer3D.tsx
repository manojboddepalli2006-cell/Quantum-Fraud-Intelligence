import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function DilutionRefrigerator({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const qpuCoreRef = useRef<THREE.Mesh>(null);

  // Coaxial helical cables spiraling down
  const cableCurves = useMemo(() => {
    const list: THREE.Vector3[][] = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      const rStart = 1.4;
      const rEnd = 0.55;
      for (let s = 0; s <= 28; s++) {
        const t = s / 28;
        const curY = 2.2 - t * 3.4;
        const curR = rStart + (rEnd - rStart) * t;
        const curAngle = angle + Math.sin(t * Math.PI * 1.4) * 0.35;
        pts.push(new THREE.Vector3(Math.cos(curAngle) * curR, curY, Math.sin(curAngle) * curR));
      }
      list.push(pts);
    }
    return list;
  }, []);

  // Flange stages specifications
  const stages = [
    { y: 2.2, r: 2.1, h: 0.12, color: '#A1A1AA', metal: 0.95, rough: 0.28, name: '300K Flange' },
    { y: 1.4, r: 1.8, h: 0.10, color: '#D4AF37', metal: 0.92, rough: 0.30, name: '50K Stage' },
    { y: 0.6, r: 1.5, h: 0.09, color: '#E5C158', metal: 0.94, rough: 0.26, name: '4K Stage' },
    { y: -0.2, r: 1.25, h: 0.08, color: '#F3E5AB', metal: 0.90, rough: 0.34, name: '0.8K Still' },
    { y: -1.0, r: 0.95, h: 0.08, color: '#C59B27', metal: 0.95, rough: 0.22, name: '15mK Mixing Chamber' }
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!reducedMotion && groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
    }
    if (pulseRef.current && !reducedMotion) {
      const s = 1 + (t * 0.9 % 1.4);
      pulseRef.current.scale.set(s, s, s);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.45 - (s - 1) / 1.4);
    }
    if (qpuCoreRef.current) {
      const mat = qpuCoreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = 0.5 + Math.sin(t * 2.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Central Structural Cryogenic Cold Finger Core */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 3.6, 24]} />
        <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.28} />
      </mesh>

      {/* Titanium Vertical Support Struts */}
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
        <group key={`strut-${i}`}>
          <mesh position={[Math.cos(angle) * 1.35, 0.6, Math.sin(angle) * 1.35]}>
            <cylinderGeometry args={[0.035, 0.035, 3.6, 16]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.25} />
          </mesh>
          <mesh position={[Math.cos(angle) * 1.35, 2.1, Math.sin(angle) * 1.35]}>
            <boxGeometry args={[0.1, 0.08, 0.1]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[Math.cos(angle) * 1.35, -0.95, Math.sin(angle) * 1.35]}>
            <boxGeometry args={[0.1, 0.08, 0.1]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Flange Stages with Hexagonal Bolt Rings */}
      {stages.map((st, idx) => (
        <group key={idx} position={[0, st.y, 0]}>
          <mesh>
            <cylinderGeometry args={[st.r, st.r, st.h, 48]} />
            <meshStandardMaterial color={st.color} metalness={st.metal} roughness={st.rough} />
          </mesh>
          {/* Micro bolt pattern around rim */}
          {Array.from({ length: 12 }).map((_, bIdx) => {
            const bAngle = (bIdx / 12) * Math.PI * 2;
            const bDist = st.r - 0.1;
            return (
              <mesh
                key={bIdx}
                position={[Math.cos(bAngle) * bDist, st.h * 0.52, Math.sin(bAngle) * bDist]}
              >
                <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
                <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.2} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Realistic Coaxial Helical Cables */}
      {cableCurves.map((pts, cIdx) => (
        <line key={`cable-${cIdx}`}>
          <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(pts)} />
          <lineBasicMaterial
            attach="material"
            color={cIdx % 2 === 0 ? '#B45309' : '#CBD5E1'}
            linewidth={1}
            transparent
            opacity={0.75}
          />
        </line>
      ))}

      {/* Bottom Superconducting Vacuum Chamber Can */}
      <group position={[0, -1.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.62, 0.62, 0.88, 32]} />
          <meshStandardMaterial color="#0A121E" metalness={0.92} roughness={0.26} />
        </mesh>

        {/* Polished Glass Inspection Port */}
        <mesh position={[0, 0, 0.58]}>
          <boxGeometry args={[0.38, 0.38, 0.08]} />
          <meshPhysicalMaterial
            color="#081420"
            transparent
            opacity={0.85}
            roughness={0.08}
            metalness={0.1}
            transmission={0.8}
            ior={1.45}
          />
        </mesh>

        {/* Superconducting QPU Micro-Die Inside Can */}
        <mesh ref={qpuCoreRef} position={[0, 0, 0.52]}>
          <boxGeometry args={[0.3, 0.3, 0.04]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>

        {/* Quantum Wavefront Ring */}
        <mesh ref={pulseRef} position={[0, 0, 0.55]} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.22, 0.38, 32]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export function QuantumComputer3D({ className = "w-full h-80 sm:h-96" }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className} select-none bg-[#070B12] rounded-2xl border border-white/10 overflow-hidden`}>
      <Canvas
        camera={{ position: [0, 0.2, 6.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={['#070B12', 6, 20]} />
        <ambientLight intensity={0.4} color="#0E1E2E" />
        <directionalLight position={[4, 8, 5]} intensity={1.4} color="#E2E8F0" />
        <pointLight position={[0, -1.4, 2]} intensity={1.2} color="#06B6D4" distance={5} />
        <pointLight position={[-4, -2, -2]} intensity={0.6} color="#7C3AED" distance={6} />
        <DilutionRefrigerator reducedMotion={reducedMotion} />
      </Canvas>

      {/* Badges */}
      <div className="absolute top-3 left-3 text-[11px] font-mono text-cyan-400 bg-black/80 px-3 py-1 rounded-md border border-white/10 pointer-events-none">
        Superconducting Dilution Refrigerator (15 mK)
      </div>

      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-black/80 px-2.5 py-1 rounded-md border border-white/10 pointer-events-none">
        Sub-Kelvin Cryostat Array #01
      </div>
    </div>
  );
}
