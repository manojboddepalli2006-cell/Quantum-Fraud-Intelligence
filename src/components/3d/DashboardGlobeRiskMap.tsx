import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RegionBeacon {
  name: string;
  lat: number;
  lon: number;
  riskPct: number;
  color: string;
}

const REGIONS: RegionBeacon[] = [
  { name: 'North America', lat: 40.7, lon: -74.0, riskPct: 14, color: '#10B981' },
  { name: 'Western Europe', lat: 51.5, lon: 0.1, riskPct: 22, color: '#10B981' },
  { name: 'Asia-Pacific', lat: 1.35, lon: 103.8, riskPct: 84, color: '#EF4444' },
  { name: 'East Asia', lat: 35.6, lon: 139.7, riskPct: 28, color: '#F59E0B' },
  { name: 'Middle East & Cyprus', lat: 35.1, lon: 33.3, riskPct: 91, color: '#EF4444' },
  { name: 'Latin America', lat: -23.5, lon: -46.6, riskPct: 48, color: '#F59E0B' }
];

function latLonToPos(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeRiskScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const globeRef = useRef<THREE.Group>(null);
  const r = 2.4;

  const regionPos = useMemo(() => {
    return REGIONS.map(reg => ({
      ...reg,
      vec: latLonToPos(reg.lat, reg.lon, r)
    }));
  }, [r]);

  // Arcs between regions
  const arcs = useMemo(() => {
    const list: THREE.Vector3[][] = [];
    for (let i = 0; i < regionPos.length; i++) {
      const target = regionPos[(i + 1) % regionPos.length];
      const v1 = regionPos[i].vec;
      const v2 = target.vec;
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const d = v1.distanceTo(v2);
      mid.normalize().multiplyScalar(r + d * 0.28);
      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      list.push(curve.getPoints(24));
    }
    return list;
  }, [regionPos, r]);

  useFrame((state) => {
    if (reducedMotion) return;
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Wireframe Globe Mesh */}
      <mesh>
        <sphereGeometry args={[r, 28, 28]} />
        <meshBasicMaterial color="#0A2438" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Deep dark sphere core */}
      <mesh>
        <sphereGeometry args={[r * 0.98, 32, 32]} />
        <meshStandardMaterial color="#05070B" roughness={0.9} />
      </mesh>

      {/* Latitudinal wire bands */}
      {[-1.5, -0.7, 0, 0.7, 1.5].map((y, idx) => {
        const ringR = Math.sqrt(Math.max(0, r * r - y * y));
        return (
          <mesh key={idx} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[ringR - 0.012, ringR + 0.012, 48]} />
            <meshBasicMaterial color="#06B6D4" transparent opacity={0.18} side={THREE.DoubleSide} />
          </mesh>
        );
      })}

      {/* Region Beacons */}
      {regionPos.map((reg, idx) => (
        <group key={idx} position={reg.vec}>
          <mesh>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color={reg.color} emissive={reg.color} emissiveIntensity={0.9} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.11, 0.16, 16]} />
            <meshBasicMaterial color={reg.color} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Connecting Risk Stream Arcs */}
      {arcs.map((pts, idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(pts)} />
          <lineBasicMaterial attach="material" color="#8B5CF6" transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
}

export function DashboardGlobeRiskMap({ className = "w-full h-80" }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className} select-none bg-[#070B12] rounded-2xl border border-white/10 overflow-hidden`}>
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 4]} intensity={1.2} color="#38BDF8" />
        <GlobeRiskScene reducedMotion={reducedMotion} />
      </Canvas>

      {/* Required Disclaimer Label */}
      <div className="absolute top-3 left-3 text-[11px] font-mono text-cyan-400 bg-black/70 px-2.5 py-1 rounded-md border border-white/10 pointer-events-none">
        Simulated intelligence environment
      </div>

      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-black/70 px-2.5 py-1 rounded-md border border-white/10 pointer-events-none">
        Regional Risk Stream: Multi-Hub ASN
      </div>
    </div>
  );
}
