import React from 'react';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Q-FraudX Quantum Shield Logo"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="orbitGrad" x1="6" y1="12" x2="26" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Outer Protective Shield Geometry */}
      <path
        d="M16 3L5 8V16C5 22.8 9.7 28.5 16 30C22.3 28.5 27 22.8 27 16V8L16 3Z"
        stroke="url(#shieldGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#070E1A"
        fillOpacity="0.8"
      />

      {/* Quantum Entangled Elliptical Orbit Ring */}
      <ellipse
        cx="16"
        cy="16"
        rx="7.5"
        ry="3.2"
        transform="rotate(-28 16 16)"
        stroke="url(#orbitGrad)"
        strokeWidth="1.3"
        strokeDasharray="2 1.5"
      />

      {/* Qubit State Spin Vector Axis */}
      <line
        x1="16"
        y1="10.5"
        x2="16"
        y2="21.5"
        stroke="#06B6D4"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />

      {/* Central Superconducting Transmon Qubit Core */}
      <circle cx="16" cy="16" r="2.4" fill="#06B6D4" />
      <circle cx="16" cy="16" r="4.2" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" />
    </svg>
  );
}
