import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { RealisticQuantumComputer, LaboratoryChamber } from './RealisticQuantumComputer';

// Page-specific camera poses and hardware positions
interface ScenePose {
  cameraPos: [number, number, number];
  cameraLookAt: [number, number, number];
  hardwarePos: [number, number, number];
  hardwareScale: number;
  lightIntensity: number;
}

const PAGE_SCENE_POSES: Record<string, ScenePose> = {
  // Home: Positioned toward the right side on desktop so Hero text/CTAs breathe on the left
  '/': {
    cameraPos: [0, 0.4, 7.6],
    cameraLookAt: [0.6, 0.2, 0],
    hardwarePos: [1.35, 0.2, 0],
    hardwareScale: 0.95,
    lightIntensity: 1.2
  },
  // Analyzer: Close-up focus on the lower QPU housing and incoming data signals
  '/analyzer': {
    cameraPos: [0, -1.2, 5.6],
    cameraLookAt: [0, -1.5, 0],
    hardwarePos: [0.6, 0.2, 0],
    hardwareScale: 1.05,
    lightIntensity: 1.35
  },
  // Fraud Detection: Panoramic perspective observing transaction constellations
  '/fraud-detection': {
    cameraPos: [-0.6, 0.6, 8.2],
    cameraLookAt: [0, 0.2, 0],
    hardwarePos: [0, 0.2, 0],
    hardwareScale: 0.9,
    lightIntensity: 1.1
  },
  // Dashboard: High-angle telemetry view overlooking the cryogenic stages
  '/dashboard': {
    cameraPos: [0.8, 1.4, 8.0],
    cameraLookAt: [0, 0.4, 0],
    hardwarePos: [0.8, 0.1, 0],
    hardwareScale: 0.92,
    lightIntensity: 1.15
  },
  // Transactions: Centered but slightly reduced contrast so audit tables are 100% readable
  '/transactions': {
    cameraPos: [0, 0.1, 7.8],
    cameraLookAt: [0, 0, 0],
    hardwarePos: [0, 0.1, 0],
    hardwareScale: 0.88,
    lightIntensity: 0.95
  },
  // Explainable AI: Macro inspection angle of the bottom QPU mixing chamber and qubit array
  '/explainable-ai': {
    cameraPos: [0, -1.6, 5.2],
    cameraLookAt: [0, -1.8, 0],
    hardwarePos: [0, 0.2, 0],
    hardwareScale: 1.1,
    lightIntensity: 1.4
  },
  // Technology: Full laboratory cross-sectional view showcasing all stages
  '/technology': {
    cameraPos: [0, 0.6, 8.0],
    cameraLookAt: [0, 0.2, 0],
    hardwarePos: [0, 0.2, 0],
    hardwareScale: 1.0,
    lightIntensity: 1.25
  }
};

// Cinematic Camera Controller with Mouse Parallax and Scroll Adaptation
function CinematicCameraController({ pose, isMobile }: { pose: ScenePose; isMobile: boolean }) {
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const scrollOffset = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollOffset.current = docHeight > 0 ? scrollY / docHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const { pointer, camera } = state;

    // Subtle 1-2 degrees mouse parallax
    const mouseX = pointer.x * 0.25;
    const mouseY = pointer.y * 0.18;
    const scrollZ = scrollOffset.current * 0.6;
    const scrollYMod = scrollOffset.current * -0.4;

    const targetX = (isMobile ? 0 : pose.cameraPos[0]) + mouseX;
    const targetY = pose.cameraPos[1] - mouseY + scrollYMod;
    const targetZ = pose.cameraPos[2] + (isMobile ? 1.4 : 0) + scrollZ;

    camera.position.x += (targetX - camera.position.x) * 0.045;
    camera.position.y += (targetY - camera.position.y) * 0.045;
    camera.position.z += (targetZ - camera.position.z) * 0.045;

    const targetLookAtX = (isMobile ? 0 : pose.cameraLookAt[0]) + mouseX * 0.5;
    const targetLookAtY = pose.cameraLookAt[1] + scrollYMod * 0.5;
    const targetLookAtZ = pose.cameraLookAt[2];

    lookAtRef.current.x += (targetLookAtX - lookAtRef.current.x) * 0.045;
    lookAtRef.current.y += (targetLookAtY - lookAtRef.current.y) * 0.045;
    lookAtRef.current.z += (targetLookAtZ - lookAtRef.current.z) * 0.045;

    camera.lookAt(lookAtRef.current);
  });

  return null;
}

// Suspended cleanroom laboratory particles
function LabMicroAtmosphere({ count = 80, reducedMotion = false }: { count?: number; reducedMotion?: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 8 - 1,
        speedX: (Math.random() - 0.5) * 0.015,
        speedY: (Math.random() - 0.5) * 0.015,
        scale: 0.012 + Math.random() * 0.02
      });
    }
    return list;
  }, [count]);

  useFrame(() => {
    if (reducedMotion || !meshRef.current) return;
    particles.forEach((p, idx) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x > 7) p.x = -7;
      if (p.x < -7) p.x = 7;
      if (p.y > 5) p.y = -5;
      if (p.y < -5) p.y = 5;

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(idx, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#38BDF8" transparent opacity={0.22} />
    </instancedMesh>
  );
}

// Global Export: Cinematic Quantum Lab Environment
export function CinematicQuantumLab() {
  const location = useLocation();
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentPose = PAGE_SCENE_POSES[location.pathname] || PAGE_SCENE_POSES['/'];
  const isLight = theme === 'light';

  if (!hasWebGL) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-colors duration-500"
        style={{
          background: isLight 
            ? 'linear-gradient(180deg, #F4F7FA 0%, #E9EFF6 100%)' 
            : 'linear-gradient(180deg, #030509 0%, #070B12 100%)'
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* Contrast Overlay ensuring 100% UI readability while letting the quantum computer shine */}
      <div 
        className={`absolute inset-0 z-10 pointer-events-none transition-colors duration-500 ${
          isLight
            ? 'bg-gradient-to-b from-[#F4F7FA]/75 via-[#F4F7FA]/55 to-[#F4F7FA]/80'
            : 'bg-gradient-to-b from-[#030509]/80 via-[#030509]/60 to-[#030509]/85'
        }`}
      />

      {/* Laboratory Ambient Overhead Glow */}
      <div 
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none z-10 transition-colors duration-500 ${
          isLight ? 'bg-cyan-500/[0.06]' : 'bg-cyan-500/[0.04]'
        }`}
      />

      {/* Photorealistic Three.js Scene */}
      <Canvas
        camera={{ position: [0, 0.4, 7.6], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setHasWebGL(false);
          });
        }}
        dpr={[1, 1.5]}
      >
        {/* Atmospheric Cleanroom Fog */}
        <fog 
          attach="fog" 
          args={[isLight ? '#F4F7FA' : '#030509', isLight ? 10 : 8, isLight ? 32 : 28]} 
        />

        {/* Studio Lighting Rig tuned to Theme */}
        <ambientLight intensity={isLight ? 0.8 : 0.45} color={isLight ? '#E2E8F0' : '#0E1E2E'} />
        {/* Soft Cool Overhead Key Light */}
        <directionalLight 
          position={[isLight ? 2 : 1, 8, 4]} 
          intensity={currentPose.lightIntensity * (isLight ? 1.6 : 1.3)} 
          color={isLight ? '#FFFFFF' : '#E2E8F0'} 
        />
        {/* Secondary Front Fill Light */}
        <directionalLight 
          position={[-4, 2, 3]} 
          intensity={isLight ? 0.6 : 0.35} 
          color={isLight ? '#CBD5E1' : '#38BDF8'} 
        />
        {/* Cyan Laboratory Hardware Glow */}
        <pointLight position={[0, -1.8, 1.8]} intensity={isLight ? 1.0 : 1.6} color="#06B6D4" distance={6} />
        {/* Subtle Violet Entanglement Rim Light */}
        <pointLight position={[-3, 2, -2]} intensity={isLight ? 0.4 : 0.8} color="#7C3AED" distance={7} />

        {/* Cleanroom Laboratory Chamber Surroundings */}
        <LaboratoryChamber />

        {/* The Authentic 3D Quantum Computer (Modeled from Reference Chandelier) */}
        <RealisticQuantumComputer 
          position={isMobile ? [0, 0.1, 0] : currentPose.hardwarePos}
          scale={isMobile ? currentPose.hardwareScale * 0.8 : currentPose.hardwareScale}
          reducedMotion={reducedMotion}
        />

        {/* Suspended Cleanroom Micro-Particles */}
        <LabMicroAtmosphere count={reducedMotion ? 25 : isMobile ? 35 : 75} reducedMotion={reducedMotion} />

        {/* Cinematic Camera Controller */}
        <CinematicCameraController pose={currentPose} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
