import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTheme } from '../../context/ThemeContext';
import { RealisticQuantumComputer } from './RealisticQuantumComputer';

interface NodeData {
  id: string;
  name: string;
  amount: string;
  status: 'SAFE' | 'REVIEW' | 'HIGH RISK';
  riskScore: number;
  color: string;
}

const INITIAL_NODES: NodeData[] = [
  { id: '1', name: 'NFC Terminal #41', amount: '$42.50', status: 'SAFE', riskScore: 4, color: '#10B981' },
  { id: '2', name: 'SG E-Commerce API', amount: '$842.73', status: 'HIGH RISK', riskScore: 87, color: '#EF4444' },
  { id: '3', name: 'Swiss Bullion Wire', amount: '$3,200', status: 'REVIEW', riskScore: 68, color: '#F59E0B' },
  { id: '4', name: 'Recurring Cloud Sub', amount: '$12.99', status: 'SAFE', riskScore: 2, color: '#10B981' },
  { id: '5', name: 'Crypto Onramp OTC', amount: '$1,980', status: 'HIGH RISK', riskScore: 94, color: '#EF4444' }
];

export function HeroQuantumOrb({ className = "w-full h-[420px] sm:h-[480px]" }: { className?: string }) {
  const [nodes, setNodes] = useState<NodeData[]>(INITIAL_NODES);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Periodic telemetry refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => {
          if (node.id === '2' || node.id === '5') {
            const nextStatus = Math.random() > 0.4 ? 'HIGH RISK' : 'REVIEW';
            const nextScore = nextStatus === 'HIGH RISK' ? Math.floor(78 + Math.random() * 20) : 55;
            const nextColor = nextStatus === 'HIGH RISK' ? '#EF4444' : '#F59E0B';
            return { ...node, status: nextStatus, riskScore: nextScore, color: nextColor };
          }
          return node;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className} select-none overflow-hidden rounded-2xl bg-black/10 dark:bg-black/25 border border-[var(--border-glass)]`}>
      {/* 3D Realistic Quantum Computer Inspection Canvas */}
      <Canvas
        camera={{ position: [0, 0.2, 6.4], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={isLight ? 0.8 : 0.45} color={isLight ? '#FFFFFF' : '#0E1E2E'} />
        <directionalLight position={[3, 8, 4]} intensity={isLight ? 1.5 : 1.3} color={isLight ? '#FFFFFF' : '#E2E8F0'} />
        <pointLight position={[0, -1.8, 1.8]} intensity={1.4} color="#06B6D4" distance={5} />
        <pointLight position={[-3, 2, -2]} intensity={0.7} color="#7C3AED" distance={6} />

        <RealisticQuantumComputer position={[0, 0.15, 0]} scale={0.92} reducedMotion={reducedMotion} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 4} />
      </Canvas>

      {/* Floating HTML HUD Overlay Badges (Decoupled from WebGL render tree) */}
      <div className="absolute inset-0 pointer-events-none p-3 sm:p-5 flex flex-col justify-between">
        
        {/* Top Row: Nodes 1 & 2 */}
        <div className="flex justify-between items-start gap-2">
          {/* Node 1 */}
          <div className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-glass)] backdrop-blur-md shadow-lg text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: nodes[0].color }}
              />
              <span className="font-bold text-[var(--text-primary)]">{nodes[0].amount}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span style={{ color: nodes[0].color }} className="font-semibold">
                {nodes[0].status} ({nodes[0].riskScore}%)
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] block truncate mt-0.5">
              {nodes[0].name}
            </span>
          </div>

          {/* Node 5 (Center-top on large screens) */}
          <div className="hidden sm:block px-2.5 py-1.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-glass)] backdrop-blur-md shadow-lg text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: nodes[4].color }}
              />
              <span className="font-bold text-[var(--text-primary)]">{nodes[4].amount}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span style={{ color: nodes[4].color }} className="font-semibold">
                {nodes[4].status} ({nodes[4].riskScore}%)
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] block truncate mt-0.5">
              {nodes[4].name}
            </span>
          </div>

          {/* Node 2 */}
          <div className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-glass)] backdrop-blur-md shadow-lg text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: nodes[1].color }}
              />
              <span className="font-bold text-[var(--text-primary)]">{nodes[1].amount}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span style={{ color: nodes[1].color }} className="font-semibold">
                {nodes[1].status} ({nodes[1].riskScore}%)
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] block truncate mt-0.5">
              {nodes[1].name}
            </span>
          </div>
        </div>

        {/* Bottom Row: Nodes 4 & 3 and central legend */}
        <div className="flex justify-between items-end gap-2">
          {/* Node 4 */}
          <div className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-glass)] backdrop-blur-md shadow-lg text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: nodes[3].color }}
              />
              <span className="font-bold text-[var(--text-primary)]">{nodes[3].amount}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span style={{ color: nodes[3].color }} className="font-semibold">
                {nodes[3].status} ({nodes[3].riskScore}%)
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] block truncate mt-0.5">
              {nodes[3].name}
            </span>
          </div>

          {/* Drag to inspect tip */}
          <div className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-panel)] px-2.5 py-1 rounded-md border border-[var(--border-glass)] hidden sm:block">
            Drag to Rotate Hardware
          </div>

          {/* Node 3 */}
          <div className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-glass)] backdrop-blur-md shadow-lg text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: nodes[2].color }}
              />
              <span className="font-bold text-[var(--text-primary)]">{nodes[2].amount}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span style={{ color: nodes[2].color }} className="font-semibold">
                {nodes[2].status} ({nodes[2].riskScore}%)
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] block truncate mt-0.5">
              {nodes[2].name}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
