import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const HUBS = [
  { name: 'New York', lat: 40.71, lon: -74.0, color: '#06B6D4' },
  { name: 'London', lat: 51.5, lon: -0.12, color: '#38BDF8' },
  { name: 'Zurich', lat: 47.37, lon: 8.54, color: '#F59E0B' },
  { name: 'Singapore', lat: 1.35, lon: 103.81, color: '#EF4444' },
  { name: 'Tokyo', lat: 35.67, lon: 139.65, color: '#10B981' },
  { name: 'Nicosia', lat: 35.18, lon: 33.38, color: '#EF4444' }
];

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const radius = 2.4;

  // Pre-calculate positions of cities
  const hubPositions = useMemo(() => {
    return HUBS.map(h => ({
      ...h,
      pos: latLonToVector3(h.lat, h.lon, radius)
    }));
  }, [radius]);

  // Generate geodesic arcs between hubs
  const arcCurves = useMemo(() => {
    const curves: THREE.Vector3[][] = [];
    for (let i = 0; i < hubPositions.length; i++) {
      for (let j = i + 1; j < hubPositions.length; j++) {
        const v1 = hubPositions[i].pos;
        const v2 = hubPositions[j].pos;
        
        // Midpoint pushed outward for parabolic arc
        const mid = v1.clone().add(v2).multiplyScalar(0.5);
        const distance = v1.distanceTo(v2);
        mid.normalize().multiplyScalar(radius + distance * 0.25);

        const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
        curves.push(curve.getPoints(24));
      }
    }
    return curves;
  }, [hubPositions, radius]);

  useFrame((state) => {
    if (reducedMotion) return;
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Wireframe Globe Sphere */}
      <mesh>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial color="#0A2234" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Subtle Dark Inner Core */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 32, 32]} />
        <meshStandardMaterial color="#05070B" roughness={0.8} />
      </mesh>

      {/* Latitudinal Rings */}
      {[-1.5, -0.7, 0, 0.7, 1.5].map((y, i) => {
        const r = Math.sqrt(Math.max(0, radius * radius - y * y));
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r - 0.01, r + 0.01, 48]} />
            <meshBasicMaterial color="#06B6D4" transparent opacity={0.15} side={THREE.DoubleSide} />
          </mesh>
        );
      })}

      {/* Geographic Hub Nodes */}
      {hubPositions.map((hub, idx) => (
        <group key={idx} position={hub.pos}>
          <mesh>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={hub.color} emissive={hub.color} emissiveIntensity={0.8} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.09, 0.14, 16]} />
            <meshBasicMaterial color={hub.color} transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Transaction Connection Arcs */}
      {arcCurves.map((pts, idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(pts)} />
          <lineBasicMaterial attach="material" color="#8B5CF6" transparent opacity={0.25} />
        </line>
      ))}
    </group>
  );
}

export function InteractiveGlobeNetwork({ className = "w-full h-72" }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className} select-none`}>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#38BDF8" />
        <GlobeScene reducedMotion={reducedMotion} />
      </Canvas>

      <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-white/5 pointer-events-none">
        Global Quantum Interception Grid
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-white/5 pointer-events-none">
        6 Active Global Hubs · 3.4ms Cross-Border Sync
      </div>
    </div>
  );
}
