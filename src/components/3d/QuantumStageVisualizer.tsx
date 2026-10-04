import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AnalysisStep } from '../../types';

interface QuantumStageVisualizerProps {
  stage: AnalysisStep;
  riskScore?: number;
  className?: string;
}

function StageScene({ stage, riskScore = 87 }: { stage: AnalysisStep; riskScore?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // Nodes for features
  const nodes = useMemo(() => [
    { name: 'Amount', pos: new THREE.Vector3(-1.8, 1.2, 0.4) },
    { name: 'Velocity', pos: new THREE.Vector3(1.9, 1.4, -0.5) },
    { name: 'IP Risk', pos: new THREE.Vector3(1.6, -1.3, 0.6) },
    { name: 'Device Risk', pos: new THREE.Vector3(-1.7, -1.2, -0.4) },
    { name: 'Behavior', pos: new THREE.Vector3(0, 2.0, 0.2) },
    { name: 'Geo Anomaly', pos: new THREE.Vector3(0, -2.0, -0.3) }
  ], []);

  // Compute collapsed Z position for measurement stage
  // if high risk -> snap downward to South pole y = -1.8; if low risk -> snap upward to North pole y = +1.8
  const collapseTargetY = riskScore > 50 ? -1.8 : 1.8;
  const isHighRisk = riskScore > 50;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (stage === 'variational') {
        // rapid multi-axis spin during variational ansatz
        groupRef.current.rotation.y = t * 1.4;
        groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.3;
      } else if (stage === 'encoding') {
        // moderate rotation
        groupRef.current.rotation.y = t * 0.6;
        groupRef.current.rotation.x = 0;
      } else {
        // calm idle rotation
        groupRef.current.rotation.y = t * 0.25;
        groupRef.current.rotation.x = 0;
      }
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * (stage === 'variational' ? 2.5 : 0.8);
      ring1Ref.current.rotation.y = t * (stage === 'variational' ? 3.0 : 1.0);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * (stage === 'variational' ? 2.2 : 0.7);
      ring2Ref.current.rotation.z = t * (stage === 'variational' ? 1.8 : 0.5);
    }

    // Pulse animation during risk engine
    if (pulseRef.current && (stage === 'risk_engine' || stage === 'complete')) {
      const scale = 1 + (t * 2 % 2.5);
      pulseRef.current.scale.set(scale, scale, scale);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - scale / 2.5);
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* =================================================================
          STAGE 01: FEATURE PREPROCESSING (Floating structured data nodes)
         ================================================================= */}
      {stage === 'preprocessing' && (
        <group>
          {/* Coordinate grid plane */}
          <gridHelper args={[6, 8, '#06B6D4', '#1E293B']} position={[0, -1.8, 0]} />

          {nodes.map((n, i) => (
            <group key={i} position={n.pos}>
              <mesh>
                <boxGeometry args={[0.28, 0.28, 0.28]} />
                <meshStandardMaterial color="#06B6D4" roughness={0.2} metalness={0.8} />
              </mesh>
              <mesh>
                <boxGeometry args={[0.34, 0.34, 0.34]} />
                <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.4} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* =================================================================
          STAGE 02: QUANTUM ENCODING (Nodes transform into quantum states)
         ================================================================= */}
      {stage === 'encoding' && (
        <group>
          {/* Inner core Hilbert state */}
          <mesh>
            <sphereGeometry args={[0.8, 24, 24]} />
            <meshStandardMaterial color="#0B192C" roughness={0.3} metalness={0.9} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.82, 16, 16]} />
            <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.3} />
          </mesh>

          {nodes.map((n, i) => (
            <group key={i} position={n.pos}>
              {/* Fuzzy quantum probability superposition sphere */}
              <mesh>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.6} />
              </mesh>
              {/* Equatorial phase ring */}
              <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[0.32, 0.015, 12, 32]} />
                <meshBasicMaterial color="#06B6D4" transparent opacity={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* =================================================================
          STAGE 03: VARIATIONAL ANALYSIS (Fast orbital paths & entangling CNOT lines)
         ================================================================= */}
      {stage === 'variational' && (
        <group>
          {/* Central QPU Core */}
          <mesh>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial color="#061E2E" emissive="#06B6D4" emissiveIntensity={0.8} />
          </mesh>

          {/* High speed orbital rings */}
          <group ref={ring1Ref}>
            <mesh>
              <torusGeometry args={[2.0, 0.025, 16, 64]} />
              <meshBasicMaterial color="#06B6D4" />
            </mesh>
          </group>

          <group ref={ring2Ref}>
            <mesh>
              <torusGeometry args={[2.5, 0.02, 16, 64]} />
              <meshBasicMaterial color="#8B5CF6" />
            </mesh>
          </group>

          {/* Entangling CNOT laser lines between nodes */}
          {nodes.map((n, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            return (
              <line key={i}>
                <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([n.pos, nextNode.pos])} />
                <lineBasicMaterial attach="material" color="#A855F7" transparent opacity={0.8} />
              </line>
            );
          })}
        </group>
      )}

      {/* =================================================================
          STAGE 04: MEASUREMENT (Wavefunction collapse into measurable eigenvalues)
         ================================================================= */}
      {stage === 'measurement' && (
        <group>
          {/* North pole |0> (Green) & South pole |1> (Red) */}
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
          <mesh position={[0, -1.8, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>

          {/* Measurement axis wire */}
          <line>
            <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(0, -2.2, 0),
              new THREE.Vector3(0, 2.2, 0)
            ])} />
            <lineBasicMaterial attach="material" color="#64748B" />
          </line>

          {/* State vectors collapsing toward target pole */}
          {nodes.map((n, i) => {
            const currentY = THREE.MathUtils.lerp(n.pos.y, collapseTargetY, 0.75);
            const currentX = THREE.MathUtils.lerp(n.pos.x, 0, 0.7);
            const currentZ = THREE.MathUtils.lerp(n.pos.z, 0, 0.7);

            return (
              <group key={i} position={[currentX, currentY, currentZ]}>
                <mesh>
                  <sphereGeometry args={[0.14, 16, 16]} />
                  <meshStandardMaterial
                    color={isHighRisk ? '#EF4444' : '#10B981'}
                    emissive={isHighRisk ? '#EF4444' : '#10B981'}
                    emissiveIntensity={0.8}
                  />
                </mesh>
                <line>
                  <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, collapseTargetY - currentY, 0)
                  ])} />
                  <lineBasicMaterial attach="material" color={isHighRisk ? '#EF4444' : '#10B981'} transparent opacity={0.6} />
                </line>
              </group>
            );
          })}
        </group>
      )}

      {/* =================================================================
          STAGE 05: RISK ENGINE (Final risk signal radiating outward)
         ================================================================= */}
      {(stage === 'risk_engine' || stage === 'complete') && (
        <group>
          {/* Central Verdict Node */}
          <mesh>
            <sphereGeometry args={[1.0, 32, 32]} />
            <meshStandardMaterial
              color={isHighRisk ? '#3B0D11' : '#062B24'}
              emissive={isHighRisk ? '#EF4444' : '#10B981'}
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>

          {/* Radiating Decision Shockwave Ring */}
          <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.1, 1.25, 48]} />
            <meshBasicMaterial
              color={isHighRisk ? '#EF4444' : '#10B981'}
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Decision Boundary Grid */}
          <gridHelper
            args={[5, 10, isHighRisk ? '#EF4444' : '#10B981', '#1E293B']}
            position={[0, -0.6, 0]}
          />
        </group>
      )}

    </group>
  );
}

export function QuantumStageVisualizer({
  stage,
  riskScore = 87,
  className = "w-full h-64 sm:h-72"
}: QuantumStageVisualizerProps) {
  return (
    <div className={`relative ${className} select-none bg-[#070B12] rounded-xl border border-white/10 overflow-hidden`}>
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={1.2} color="#38BDF8" />
        <pointLight position={[-4, -4, -3]} intensity={0.8} color="#8B5CF6" />
        <StageScene stage={stage} riskScore={riskScore} />
      </Canvas>

      {/* Stage Badge Overlay */}
      <div className="absolute top-3 left-3 text-[11px] font-mono px-2.5 py-1 rounded bg-[#0A0F18]/85 border border-white/10 text-slate-300 pointer-events-none">
        {stage === 'preprocessing' && 'Stage 01: Transaction Data Nodes'}
        {stage === 'encoding' && 'Stage 02: 8-Qubit State Superposition'}
        {stage === 'variational' && 'Stage 03: Parameterized CNOT Entanglement'}
        {stage === 'measurement' && 'Stage 04: Pauli-Z Wavefunction Collapse'}
        {(stage === 'risk_engine' || stage === 'complete') && 'Stage 05: Quantum Decision Engine Convergence'}
      </div>

      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-white/5 pointer-events-none">
        Hardware QPU Register: Online
      </div>
    </div>
  );
}
