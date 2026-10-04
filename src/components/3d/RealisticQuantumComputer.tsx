import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RealisticQuantumComputerProps {
  reducedMotion?: boolean;
  scale?: number;
  position?: [number, number, number];
  opacity?: number;
}

export function RealisticQuantumComputer({
  scale = 1.0,
  position = [0, 0, 0],
  opacity = 1.0
}: RealisticQuantumComputerProps) {
  const { theme, activeAnalysisStep, latestRiskTier } = useTheme();
  const reducedMotion = useReducedMotion();

  const mainGroupRef = useRef<THREE.Group>(null);
  const qpuCoreGlowRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  // Determine signal color based on current analysis state & risk tier
  const signalColor = useMemo(() => {
    if (activeAnalysisStep === 'complete' && latestRiskTier) {
      if (latestRiskTier === 'CRITICAL' || latestRiskTier === 'HIGH') return '#EF4444';
      if (latestRiskTier === 'MEDIUM') return '#F59E0B';
      return '#10B981';
    }
    if (activeAnalysisStep !== 'idle') return '#06B6D4';
    return '#38BDF8';
  }, [activeAnalysisStep, latestRiskTier]);

  // =========================================================================
  // 1. GEOMETRY & CURVE PRE-COMPUTATIONS (MATCHING THE REFERENCE CHANDELIER)
  // =========================================================================

  // 5 Stacked Golden Cryogenic Flange Plates
  const goldenPlates = useMemo(() => {
    return [
      { y: 2.35, r: 2.05, h: 0.08, holes: 10 },
      { y: 1.45, r: 1.95, h: 0.08, holes: 10 },
      { y: 0.55, r: 1.85, h: 0.08, holes: 10 },
      { y: -0.35, r: 1.75, h: 0.08, holes: 10 },
      { y: -1.25, r: 1.75, h: 0.09, holes: 12 } // Lower main distribution plate
    ];
  }, []);

  // Dense S-curving inter-stage dark coaxial cable bundles
  // Each tier has 10 bundles distributed radially around the central mast
  const cableTiers = useMemo(() => {
    const tiers: THREE.Vector3[][][] = [];
    const tierHeights = [
      { topY: 3.25, btmY: 2.35, rTop: 1.8, rBtm: 1.85, bulge: 0.22 },
      { topY: 2.35, btmY: 1.45, rTop: 1.75, rBtm: 1.70, bulge: 0.28 },
      { topY: 1.45, btmY: 0.55, rTop: 1.65, rBtm: 1.60, bulge: 0.32 },
      { topY: 0.55, btmY: -0.35, rTop: 1.55, rBtm: 1.50, bulge: 0.30 },
      { topY: -0.35, btmY: -1.25, rTop: 1.50, rBtm: 1.45, bulge: 0.26 }
    ];

    tierHeights.forEach((th) => {
      const tierCables: THREE.Vector3[][] = [];
      const bundleCount = 10;
      for (let i = 0; i < bundleCount; i++) {
        const baseAngle = (i / bundleCount) * Math.PI * 2;
        // 3 individual cables per bundle for rich layered density
        for (let sub = -1; sub <= 1; sub++) {
          const angle = baseAngle + sub * 0.045;
          const p1 = new THREE.Vector3(Math.cos(angle) * th.rTop, th.topY, Math.sin(angle) * th.rTop);
          const midY = (th.topY + th.btmY) * 0.5;
          const midR = ((th.rTop + th.rBtm) * 0.5) + th.bulge;
          const midAngle = angle + 0.12; // S-twist
          const pMid = new THREE.Vector3(Math.cos(midAngle) * midR, midY, Math.sin(midAngle) * midR);
          const p2 = new THREE.Vector3(Math.cos(angle) * th.rBtm, th.btmY, Math.sin(angle) * th.rBtm);

          const curve = new THREE.CatmullRomCurve3([p1, pMid, p2]);
          tierCables.push(curve.getPoints(14));
        }
      }
      tiers.push(tierCables);
    });

    return tiers;
  }, []);

  // Ring of 14 Lower Microwave Attenuator Cans under the bottom plate
  const attenuators = useMemo(() => {
    const list: { pos: [number, number, number]; angle: number }[] = [];
    const count = 14;
    const r = 1.35;
    const y = -1.62;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      list.push({
        pos: [Math.cos(angle) * r, y, Math.sin(angle) * r],
        angle
      });
    }
    return list;
  }, []);

  // Braided Silver Flexible RF Coaxial Cables (Looping wide outwards & down into QPU)
  const silverLoopCurves = useMemo(() => {
    const curves: THREE.Vector3[][] = [];
    const count = 14;
    const attY = -1.82;
    const attR = 1.35;
    const qpuY = -2.25;
    const qpuR = 0.58;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      // 2 braided lines per attenuator can
      for (let sub = -1; sub <= 1; sub += 2) {
        const a = angle + sub * 0.05;
        const pStart = new THREE.Vector3(Math.cos(a) * attR, attY, Math.sin(a) * attR);
        // Wide outward loop
        const loopR = attR + 0.38;
        const loopY = (attY + qpuY) * 0.5 - 0.12;
        const pLoop = new THREE.Vector3(Math.cos(a) * loopR, loopY, Math.sin(a) * loopR);
        const pEnd = new THREE.Vector3(Math.cos(a) * qpuR, qpuY + (sub * 0.08), Math.sin(a) * qpuR);

        const curve = new THREE.CatmullRomCurve3([pStart, pLoop, pEnd]);
        curves.push(curve.getPoints(20));
      }
    }
    return curves;
  }, []);

  // Bottom Golden Cold-Finger Pins (36 pins in circular grid)
  const bottomPins = useMemo(() => {
    const list: [number, number, number][] = [];
    const rings = [
      { r: 0.12, count: 6 },
      { r: 0.24, count: 12 },
      { r: 0.36, count: 18 }
    ];
    rings.forEach((ring) => {
      for (let i = 0; i < ring.count; i++) {
        const a = (i / ring.count) * Math.PI * 2;
        list.push([Math.cos(a) * ring.r, -2.62, Math.sin(a) * ring.r]);
      }
    });
    return list;
  }, []);

  // Active Transaction Data Signals flowing along the structure
  const dataParticles = useMemo(() => {
    const list: { offset: number; speed: number; tierIdx: number; cableIdx: number }[] = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        offset: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        tierIdx: Math.floor(Math.random() * 5),
        cableIdx: Math.floor(Math.random() * 20)
      });
    }
    return list;
  }, []);

  // =========================================================================
  // 2. ANIMATION & RENDER LOOP
  // =========================================================================
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!reducedMotion && mainGroupRef.current) {
      // Extremely slow, dignified cinematic rotation (matching real physics)
      mainGroupRef.current.rotation.y = t * 0.04;
      mainGroupRef.current.position.y = position[1] + Math.sin(t * 0.4) * 0.03; // Gentle floating breathing
    }

    if (qpuCoreGlowRef.current) {
      const mat = qpuCoreGlowRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const pulseSpeed = activeAnalysisStep !== 'idle' ? 5.0 : 1.8;
        mat.emissiveIntensity = 0.6 + Math.sin(t * pulseSpeed) * 0.35;
      }
    }

    if (pulseRingRef.current && !reducedMotion) {
      const cycleTime = activeAnalysisStep !== 'idle' ? 0.8 : 2.5;
      const progress = (t % cycleTime) / cycleTime;
      const s = 0.8 + progress * 0.9;
      pulseRingRef.current.scale.set(s, s, s);
      const ringMat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
      if (ringMat) {
        ringMat.opacity = Math.max(0, (1 - progress) * 0.45);
      }
    }
  });

  // Materials tuned to Theme (Photorealistic PBR Metals)
  const isLight = theme === 'light';

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        emissive: isLight ? '#785A14' : '#1F1705',
        emissiveIntensity: 0.15,
        metalness: 0.94,
        roughness: isLight ? 0.22 : 0.28
      }),
    [isLight]
  );

  const polishedSteelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isLight ? '#E2E8F0' : '#CBD5E1',
        metalness: 0.96,
        roughness: isLight ? 0.18 : 0.24
      }),
    [isLight]
  );

  const copperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#B45309',
        metalness: 0.92,
        roughness: 0.32
      }),
    []
  );

  const darkCableMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#151312',
        metalness: 0.82,
        roughness: 0.4
      }),
    []
  );

  return (
    <group ref={mainGroupRef} position={position} scale={scale}>
      
      {/* =====================================================================
          1. LARGE CIRCULAR TOP CEILING FLANGE PLATE (Matching Reference)
         ===================================================================== */}
      <group position={[0, 3.45, 0]}>
        {/* Main Polished Steel Ceiling Flange */}
        <mesh material={polishedSteelMaterial}>
          <cylinderGeometry args={[2.55, 2.55, 0.2, 54]} />
        </mesh>

        {/* Outer Counterbored Chamfer Ring */}
        <mesh position={[0, -0.09, 0]} material={polishedSteelMaterial}>
          <torusGeometry args={[2.52, 0.04, 16, 54]} />
        </mesh>

        {/* Concentric Bolt Hole Ring around Top Plate */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r = 2.38;
          return (
            <mesh key={`top-bolt-${i}`} position={[Math.cos(a) * r, 0.1, Math.sin(a) * r]}>
              <cylinderGeometry args={[0.03, 0.03, 0.02, 10]} />
              <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
            </mesh>
          );
        })}

        {/* Underside Golden Mounting Collar Plate */}
        <mesh position={[0, -0.12, 0]} material={goldMaterial}>
          <cylinderGeometry args={[2.15, 2.15, 0.08, 48]} />
        </mesh>
      </group>

      {/* =====================================================================
          2. CENTRAL STRUCTURAL MAST / CRYOGENIC COLUMN
         ===================================================================== */}
      <mesh position={[0, 0.75, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.15, 0.15, 5.2, 32]} />
      </mesh>

      {/* Three Outer Polished Titanium Structural Load Struts */}
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => (
        <group key={`strut-${idx}`}>
          <mesh position={[Math.cos(angle) * 1.5, 0.85, Math.sin(angle) * 1.5]} material={polishedSteelMaterial}>
            <cylinderGeometry args={[0.035, 0.035, 5.0, 16]} />
          </mesh>
          {/* Clamp Brackets at Each Flange Junction */}
          {goldenPlates.map((gp, gIdx) => (
            <mesh
              key={`bracket-${idx}-${gIdx}`}
              position={[Math.cos(angle) * 1.5, gp.y, Math.sin(angle) * 1.5]}
              material={copperMaterial}
            >
              <boxGeometry args={[0.11, 0.09, 0.11]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* =====================================================================
          3. FIVE HORIZONTAL GOLDEN CRYOGENIC FLANGE PLATES
         ===================================================================== */}
      {goldenPlates.map((plate, pIdx) => (
        <group key={`gold-plate-${pIdx}`} position={[0, plate.y, 0]}>
          {/* Main Gold Disc */}
          <mesh material={goldMaterial}>
            <cylinderGeometry args={[plate.r, plate.r, plate.h, 54]} />
          </mesh>

          {/* Raised Perimeter Stiffener Rim */}
          <mesh position={[0, plate.h * 0.45, 0]} material={goldMaterial}>
            <torusGeometry args={[plate.r - 0.03, 0.025, 16, 54]} />
          </mesh>

          {/* Circular Weight-Reduction / Routing Perforations */}
          {Array.from({ length: plate.holes }).map((_, hIdx) => {
            const ha = (hIdx / plate.holes) * Math.PI * 2;
            const hr = plate.r * 0.62;
            return (
              <mesh key={`hole-${pIdx}-${hIdx}`} position={[Math.cos(ha) * hr, 0, Math.sin(ha) * hr]}>
                <cylinderGeometry args={[0.14, 0.14, plate.h + 0.02, 16]} />
                <meshStandardMaterial color="#0A0E18" roughness={0.9} />
              </mesh>
            );
          })}

          {/* Precision Perimeter Screws */}
          {Array.from({ length: 18 }).map((_, sIdx) => {
            const sa = (sIdx / 18) * Math.PI * 2;
            const sr = plate.r - 0.08;
            return (
              <mesh key={`screw-${pIdx}-${sIdx}`} position={[Math.cos(sa) * sr, plate.h * 0.52, Math.sin(sa) * sr]}>
                <cylinderGeometry args={[0.018, 0.018, 0.025, 8]} />
                <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.2} />
              </mesh>
            );
          })}

          {/* Radial Copper Cable Connector Collars underneath each plate */}
          {Array.from({ length: 10 }).map((_, cIdx) => {
            const ca = (cIdx / 10) * Math.PI * 2;
            const cr = plate.r - 0.35;
            return (
              <mesh
                key={`collar-${pIdx}-${cIdx}`}
                position={[Math.cos(ca) * cr, -plate.h * 0.8, Math.sin(ca) * cr]}
                material={copperMaterial}
              >
                <cylinderGeometry args={[0.065, 0.065, 0.1, 16]} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* =====================================================================
          4. DENSE S-CURVING INTER-STAGE COAXIAL CABLE BUNDLES (REFERENCE SILHOUETTE)
         ===================================================================== */}
      {cableTiers.map((tierCables, tIdx) => (
        <group key={`tier-${tIdx}`}>
          {tierCables.map((cablePoints, cIdx) => (
            <line key={`tier-${tIdx}-cable-${cIdx}`}>
              <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(cablePoints)} />
              <lineBasicMaterial
                attach="material"
                color={cIdx % 2 === 0 ? '#1C1917' : '#292524'}
                linewidth={1.5}
                transparent
                opacity={0.88}
              />
            </line>
          ))}
        </group>
      ))}

      {/* =====================================================================
          5. LOWER RING OF MICROWAVE ATTENUATOR CANS (DUAL-TONE COPPER/SILVER)
         ===================================================================== */}
      {attenuators.map((att, aIdx) => (
        <group key={`att-${aIdx}`} position={att.pos}>
          {/* Upper Copper Stage of Attenuator */}
          <mesh position={[0, 0.08, 0]} material={copperMaterial}>
            <cylinderGeometry args={[0.075, 0.075, 0.16, 20]} />
          </mesh>
          {/* Lower Polished Titanium Stage */}
          <mesh position={[0, -0.08, 0]} material={polishedSteelMaterial}>
            <cylinderGeometry args={[0.07, 0.07, 0.16, 20]} />
          </mesh>
          {/* SMA Golden Coaxial Jack */}
          <mesh position={[0, -0.18, 0]} material={goldMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 0.06, 12]} />
          </mesh>
        </group>
      ))}

      {/* =====================================================================
          6. BRAIDED SILVER FLEXIBLE RF COAXIAL CABLE LOOPS (LOWER SECTION)
         ===================================================================== */}
      {silverLoopCurves.map((pts, sIdx) => (
        <line key={`silver-loop-${sIdx}`}>
          <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(pts)} />
          <lineBasicMaterial
            attach="material"
            color={isLight ? '#94A3B8' : '#CBD5E1'}
            linewidth={1.8}
            transparent
            opacity={0.92}
          />
        </line>
      ))}

      {/* =====================================================================
          7. CENTRAL OCTAGONAL GOLD QPU SHIELDING HOUSING (THE QUANTUM CORE)
         ===================================================================== */}
      <group position={[0, -2.15, 0]}>
        {/* Main Octagonal Gold Chamber Canister */}
        <mesh material={goldMaterial}>
          <cylinderGeometry args={[0.62, 0.62, 0.95, 8]} />
        </mesh>

        {/* Faceted RF Shielding Component Blocks on 4 Flanks */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, fIdx) => (
          <group key={`facet-${fIdx}`} position={[Math.cos(angle) * 0.6, 0, Math.sin(angle) * 0.6]} rotation={[0, -angle, 0]}>
            <mesh material={goldMaterial}>
              <boxGeometry args={[0.12, 0.72, 0.38]} />
            </mesh>
            {/* Array of Micro Microwave Feedthrough Pins on Each Facet */}
            {Array.from({ length: 8 }).map((_, p) => (
              <mesh key={`feed-${p}`} position={[0.07, (p - 3.5) * 0.08, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.04, 8]} />
                <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Active Quantum Josephson-Junction Core (Internal Glow Window) */}
        <mesh ref={qpuCoreGlowRef} position={[0, 0, 0.58]}>
          <boxGeometry args={[0.34, 0.34, 0.04]} />
          <meshStandardMaterial
            color={signalColor}
            emissive={signalColor}
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Electromagnetic Quantum Coherence Shockwave Pulse */}
        <mesh ref={pulseRingRef} position={[0, 0, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.25, 0.45, 36]} />
          <meshBasicMaterial color={signalColor} transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* =====================================================================
          8. BOTTOM GOLDEN COLD-FINGER PINS (DOWNWARD PROBE ARRAY)
         ===================================================================== */}
      {bottomPins.map((pos, bIdx) => (
        <mesh key={`pin-${bIdx}`} position={pos} material={goldMaterial}>
          <cylinderGeometry args={[0.012, 0.008, 0.32, 8]} />
        </mesh>
      ))}

      {/* =====================================================================
          9. REALISTIC TRANSACTION DATA CONDUITS (PURPOSEFUL SIGNAL PACKETS)
         ===================================================================== */}
      {dataParticles.map((dp, idx) => {
        const tier = cableTiers[dp.tierIdx];
        if (!tier || !tier[dp.cableIdx % tier.length]) return null;
        const pts = tier[dp.cableIdx % tier.length];
        const ptIdx = Math.floor(dp.offset * (pts.length - 1));
        const pt = pts[ptIdx] || pts[0];

        return (
          <mesh key={`data-pt-${idx}`} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[0.032, 8, 8]} />
            <meshBasicMaterial color={signalColor} />
          </mesh>
        );
      })}

    </group>
  );
}

// =========================================================================
// LABORATORY SURROUNDING CHAMBER & AMBIENT DEPTH
// =========================================================================
export function LaboratoryChamber() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <group position={[0, 0, -3]}>
      {/* Cylindrical Glass Cleanroom Enclosure Behind Processor */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[4.2, 4.2, 8.5, 36, 1, true]} />
        <meshPhysicalMaterial
          color={isLight ? '#F1F5F9' : '#0B1422'}
          transparent
          opacity={isLight ? 0.35 : 0.22}
          roughness={0.08}
          metalness={0.2}
          transmission={0.85}
          ior={1.45}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Top Circular Cleanroom Track Ring */}
      <mesh position={[0, 4.8, 0]}>
        <torusGeometry args={[4.2, 0.08, 16, 48]} />
        <meshStandardMaterial color={isLight ? '#CBD5E1' : '#1E293B'} metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Bottom Cleanroom Floor Ring with LED Accent Line */}
      <mesh position={[0, -3.2, 0]}>
        <torusGeometry args={[4.2, 0.08, 16, 48]} />
        <meshStandardMaterial color={isLight ? '#94A3B8' : '#0F172A'} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, -3.15, 0]}>
        <torusGeometry args={[4.15, 0.02, 16, 48]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={isLight ? 0.4 : 0.6} />
      </mesh>

      {/* Distant Cleanroom Framing Pillars in Depth */}
      {[-7, 7].map((x, idx) => (
        <mesh key={`lab-pillar-${idx}`} position={[x, 0, -4]}>
          <cylinderGeometry args={[0.25, 0.28, 12, 16]} />
          <meshStandardMaterial color={isLight ? '#E2E8F0' : '#080E18'} metalness={0.8} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
