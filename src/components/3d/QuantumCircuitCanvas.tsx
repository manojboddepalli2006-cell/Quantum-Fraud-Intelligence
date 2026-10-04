import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function CircuitTracks({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const packetRef1 = useRef<THREE.Mesh>(null);
  const packetRef2 = useRef<THREE.Mesh>(null);
  const packetRef3 = useRef<THREE.Mesh>(null);
  const packetRef4 = useRef<THREE.Mesh>(null);

  const wires = [1.5, 0.5, -0.5, -1.5]; // 4 Qubit rail positions (q0, q1, q2, q3)

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const cycle = (speed: number, offset: number) => {
      // range -5.5 to +5.5
      return ((t * speed + offset) % 11) - 5.5;
    };

    if (packetRef1.current) packetRef1.current.position.x = cycle(3.2, 0);
    if (packetRef2.current) packetRef2.current.position.x = cycle(3.0, 2.2);
    if (packetRef3.current) packetRef3.current.position.x = cycle(3.4, 4.4);
    if (packetRef4.current) packetRef4.current.position.x = cycle(2.9, 6.6);
  });

  return (
    <group>
      {/* 4 Qubit Rails across full width (-5.5 to +5.5) */}
      {wires.map((y, idx) => (
        <group key={idx}>
          <line>
            <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(-5.5, y, 0),
              new THREE.Vector3(5.5, y, 0)
            ])} />
            <lineBasicMaterial attach="material" color="#1E293B" linewidth={2} />
          </line>

          {/* Rail glow line */}
          <line>
            <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(-5.5, y, 0),
              new THREE.Vector3(5.5, y, 0)
            ])} />
            <lineBasicMaterial attach="material" color="#06B6D4" transparent opacity={0.3} />
          </line>
        </group>
      ))}

      {/* -------------------------------------------------------------------------
          PHASE 1: INPUT FEATURES (-4.5)
         ------------------------------------------------------------------------- */}
      {wires.map((y, i) => (
        <mesh key={`in-${i}`} position={[-4.5, y, 0]}>
          <boxGeometry args={[0.35, 0.35, 0.1]} />
          <meshStandardMaterial color="#0A2234" emissive="#06B6D4" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* -------------------------------------------------------------------------
          PHASE 2: QUANTUM ENCODING (-2.2) -> Hadamard & Rz(x)
         ------------------------------------------------------------------------- */}
      {wires.map((y, i) => (
        <group key={`enc-${i}`}>
          <mesh position={[-2.6, y, 0]}>
            <boxGeometry args={[0.42, 0.42, 0.1]} />
            <meshStandardMaterial color="#0C2038" roughness={0.3} />
          </mesh>
          <mesh position={[-1.9, y, 0]}>
            <boxGeometry args={[0.42, 0.42, 0.1]} />
            <meshStandardMaterial color="#161B3D" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* -------------------------------------------------------------------------
          PHASE 3: VARIATIONAL CIRCUIT (0.0 to 1.5) -> CNOT Bridges & Ry(theta)
         ------------------------------------------------------------------------- */}
      {/* CNOT 0 -> 1 at x = -0.5 */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.5, 1.5, 0),
          new THREE.Vector3(-0.5, 0.5, 0)
        ])} />
        <lineBasicMaterial attach="material" color="#8B5CF6" transparent opacity={0.8} />
      </line>
      <mesh position={[-0.5, 1.5, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>
      <mesh position={[-0.5, 0.5, 0]}>
        <ringGeometry args={[0.1, 0.14, 16]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>

      {/* CNOT 1 -> 2 at x = 0.5 */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0.5, 0.5, 0),
          new THREE.Vector3(0.5, -0.5, 0)
        ])} />
        <lineBasicMaterial attach="material" color="#8B5CF6" transparent opacity={0.8} />
      </line>
      <mesh position={[0.5, 0.5, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>
      <mesh position={[0.5, -0.5, 0]}>
        <ringGeometry args={[0.1, 0.14, 16]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>

      {/* CNOT 2 -> 3 at x = 1.4 */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(1.4, -0.5, 0),
          new THREE.Vector3(1.4, -1.5, 0)
        ])} />
        <lineBasicMaterial attach="material" color="#8B5CF6" transparent opacity={0.8} />
      </line>
      <mesh position={[1.4, -0.5, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>
      <mesh position={[1.4, -1.5, 0]}>
        <ringGeometry args={[0.1, 0.14, 16]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>

      {/* Parameterized Ry(theta) gate boxes */}
      {wires.map((y, i) => (
        <mesh key={`var-${i}`} position={[0.9, y, 0]}>
          <boxGeometry args={[0.38, 0.38, 0.1]} />
          <meshStandardMaterial color="#2E1065" emissive="#8B5CF6" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* -------------------------------------------------------------------------
          PHASE 4: MEASUREMENT (+3.0) -> Pauli-Z Meters
         ------------------------------------------------------------------------- */}
      {wires.map((y, i) => (
        <mesh key={`m-${i}`} position={[3.0, y, 0]}>
          <boxGeometry args={[0.45, 0.45, 0.1]} />
          <meshStandardMaterial color="#06281E" emissive="#10B981" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* -------------------------------------------------------------------------
          PHASE 5: RISK CLASSIFICATION (+4.8) -> Consolidated Verdict Core
         ------------------------------------------------------------------------- */}
      <mesh position={[4.8, 0, 0]}>
        <boxGeometry args={[0.7, 3.4, 0.1]} />
        <meshStandardMaterial color="#2E0A10" emissive="#EF4444" emissiveIntensity={0.5} roughness={0.2} />
      </mesh>

      {/* -------------------------------------------------------------------------
          ANIMATED FLOWING PARTICLES (Photons)
         ------------------------------------------------------------------------- */}
      <mesh ref={packetRef1} position={[-5, 1.5, 0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshBasicMaterial color="#38BDF8" />
      </mesh>
      <mesh ref={packetRef2} position={[-5, 0.5, 0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>
      <mesh ref={packetRef3} position={[-5, -0.5, 0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshBasicMaterial color="#A855F7" />
      </mesh>
      <mesh ref={packetRef4} position={[-5, -1.5, 0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshBasicMaterial color="#38BDF8" />
      </mesh>
    </group>
  );
}

export function QuantumCircuitCanvas({ className = "w-full h-72 sm:h-80" }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className} select-none bg-[#070B12] rounded-2xl border border-white/10 overflow-hidden`}>
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 6, 5]} intensity={1.2} color="#38BDF8" />
        <CircuitTracks reducedMotion={reducedMotion} />
      </Canvas>

      {/* Five Pipeline Phase Headers Across Top */}
      <div className="absolute top-3 inset-x-3 grid grid-cols-5 text-center text-[10px] sm:text-xs font-mono border-b border-white/10 pb-2 bg-black/60 backdrop-blur-md rounded-lg p-2 pointer-events-none">
        <div>
          <span className="text-cyan-400 font-bold block">Input Features</span>
          <span className="text-slate-500 text-[9px] hidden sm:block">x ∈ ℝ⁹ vectors</span>
        </div>
        <div>
          <span className="text-sky-400 font-bold block">Quantum Encoding</span>
          <span className="text-slate-500 text-[9px] hidden sm:block">|Ψ(x)⟩ = U_Φ(x)|0⟩</span>
        </div>
        <div>
          <span className="text-violet-400 font-bold block">Variational Circuit</span>
          <span className="text-slate-500 text-[9px] hidden sm:block">Ansatz U(θ) depth 3</span>
        </div>
        <div>
          <span className="text-emerald-400 font-bold block">Measurement</span>
          <span className="text-slate-500 text-[9px] hidden sm:block">⟨Z⟩ Pauli-Z collapse</span>
        </div>
        <div>
          <span className="text-rose-400 font-bold block">Risk Classification</span>
          <span className="text-slate-500 text-[9px] hidden sm:block">R(x) Decision score</span>
        </div>
      </div>

      {/* Qubit labels on bottom left */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] font-mono text-slate-400 bg-black/70 px-3 py-1 rounded-md border border-white/5 pointer-events-none">
        <span>q[0]: Behavior</span>
        <span>q[1]: Device</span>
        <span>q[2]: IP Risk</span>
        <span>q[3]: Velocity</span>
      </div>

      {/* Particle flow indicator */}
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-cyan-400 bg-black/70 px-2.5 py-1 rounded-md border border-white/5 pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        Photon Stream: 10,000 QPU shots
      </div>
    </div>
  );
}
