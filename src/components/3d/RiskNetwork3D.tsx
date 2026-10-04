import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface NetworkNode {
  id: string;
  merchant: string;
  amount: number;
  riskScore: number;
  tier: 'Safe' | 'Review' | 'High Risk';
  pos: [number, number, number];
}

interface RiskNetwork3DProps {
  nodes: NetworkNode[];
  selectedId: string | null;
  onSelectNode: (id: string) => void;
  className?: string;
}

function NetworkGraph({
  nodes,
  selectedId,
  onSelectNode,
  reducedMotion = false
}: {
  nodes: NetworkNode[];
  selectedId: string | null;
  onSelectNode: (id: string) => void;
  reducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  // Edges connecting related transactions
  const { lineSegmentsGeom, activeSegmentsGeom } = useMemo(() => {
    const normalPoints: THREE.Vector3[] = [];
    const activePoints: THREE.Vector3[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const v1 = new THREE.Vector3(...nodes[i].pos);
        const v2 = new THREE.Vector3(...nodes[j].pos);
        const dist = v1.distanceTo(v2);

        // Connect if close or share suspicious vector
        if (dist < 3.2 || (nodes[i].tier === 'High Risk' && nodes[j].tier === 'High Risk')) {
          if (nodes[i].id === selectedId || nodes[j].id === selectedId) {
            activePoints.push(v1, v2);
          } else {
            normalPoints.push(v1, v2);
          }
        }
      }
    }

    return {
      lineSegmentsGeom: new THREE.BufferGeometry().setFromPoints(normalPoints),
      activeSegmentsGeom: new THREE.BufferGeometry().setFromPoints(activePoints)
    };
  }, [nodes, selectedId]);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }
    if (pulseRingRef.current) {
      const s = 1 + (t * 2 % 1.5);
      pulseRingRef.current.scale.set(s, s, s);
      (pulseRingRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (s - 1) / 1.5);
    }
  });

  const selectedNode = nodes.find(n => n.id === selectedId) || null;

  return (
    <group ref={groupRef}>
      {/* Background coordinate grid */}
      <gridHelper args={[8, 12, '#1E293B', '#0A1522']} position={[0, -2.5, 0]} />

      {/* Normal Connection Lines */}
      <lineSegments geometry={lineSegmentsGeom}>
        <lineBasicMaterial color="#334155" transparent opacity={0.25} />
      </lineSegments>

      {/* Active Highlighted Connection Lines */}
      {activeSegmentsGeom && (
        <lineSegments geometry={activeSegmentsGeom}>
          <lineBasicMaterial color="#06B6D4" transparent opacity={0.8} linewidth={2} />
        </lineSegments>
      )}

      {/* Nodes */}
      {nodes.map((node) => {
        const isSelected = node.id === selectedId;
        const color = node.tier === 'High Risk'
          ? '#EF4444'
          : node.tier === 'Review'
          ? '#F59E0B'
          : '#10B981';

        const size = isSelected ? 0.24 : node.tier === 'High Risk' ? 0.2 : 0.16;

        return (
          <group
            key={node.id}
            position={node.pos}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node.id);
            }}
          >
            {/* Core Node Mesh */}
            <mesh>
              <sphereGeometry args={[size, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isSelected ? 1.0 : node.tier === 'High Risk' ? 0.8 : 0.4}
                roughness={0.2}
              />
            </mesh>

            {/* Static Halo Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[size * 1.3, size * 1.5, 24]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={isSelected ? 0.9 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Selected Beacon Ring */}
            {isSelected && (
              <mesh ref={pulseRingRef} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[size * 1.6, size * 1.9, 24]} />
                <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Subtle particle field */}
      <points>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            args={[
              useMemo(() => {
                const arr = new Float32Array(100 * 3);
                for (let i = 0; i < 100 * 3; i += 3) {
                  arr[i] = (Math.random() - 0.5) * 10;
                  arr[i + 1] = (Math.random() - 0.5) * 6;
                  arr[i + 2] = (Math.random() - 0.5) * 8;
                }
                return arr;
              }, []),
              3
            ]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#06B6D4" transparent opacity={0.25} />
      </points>
    </group>
  );
}

export function RiskNetwork3D({
  nodes,
  selectedId,
  onSelectNode,
  className = "w-full h-80 sm:h-96"
}: RiskNetwork3DProps) {
  const selectedNode = nodes.find(n => n.id === selectedId);
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className} select-none bg-[#070B12] rounded-2xl border border-white/10 overflow-hidden`}>
      <Canvas
        camera={{ position: [0, 1.2, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#38BDF8" />
        <pointLight position={[-5, -4, -3]} intensity={0.8} color="#8B5CF6" />
        <NetworkGraph
          nodes={nodes}
          selectedId={selectedId}
          onSelectNode={onSelectNode}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      {/* Top overlay indicators */}
      <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-mono">
        <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10 text-slate-300">
          Real-Time 3D Risk Network
        </span>
        <span className="text-slate-500">·</span>
        <span className="text-slate-400 text-[11px]">Click any node to inspect</span>
      </div>

      {/* Selected Node HUD Banner at bottom of 3D canvas */}
      {selectedNode && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#0A0F18]/90 border border-white/10 backdrop-blur-md text-xs font-mono shadow-xl">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                backgroundColor:
                  selectedNode.tier === 'High Risk'
                    ? '#EF4444'
                    : selectedNode.tier === 'Review'
                    ? '#F59E0B'
                    : '#10B981'
              }}
            />
            <span className="text-white font-bold">{selectedNode.merchant}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">${selectedNode.amount.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">Risk Score:</span>
            <span
              className={`font-bold tabular-nums ${
                selectedNode.tier === 'High Risk'
                  ? 'text-rose-400'
                  : selectedNode.tier === 'Review'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {selectedNode.riskScore}% ({selectedNode.tier.toUpperCase()})
            </span>
          </div>
        </div>
      )}

      {/* Color legend in top right */}
      <div className="absolute top-3 right-3 flex items-center gap-2.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Safe
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Review
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> High Risk
        </span>
      </div>
    </div>
  );
}
