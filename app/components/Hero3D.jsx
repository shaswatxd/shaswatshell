"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, Ring } from '@react-three/drei';
import * as THREE from 'three';

// Orbiting High-Definition Cyber Particle Swarm
function ParticleSwarm({ count = 350 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colorCyan = new THREE.Color("#00c2d1");
    const colorViolet = new THREE.Color("#8b6bff");
    const colorMagenta = new THREE.Color("#ff3d9a");

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.2 + Math.random() * 1.6;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const rand = Math.random();
      const mixColor = rand > 0.6 ? colorCyan : rand > 0.3 ? colorViolet : colorMagenta;
      cols[i * 3] = mixColor.r;
      cols[i * 3 + 1] = mixColor.g;
      cols[i * 3 + 2] = mixColor.b;
    }
    return [pos, cols];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

// Sleek Cyber Core Geometry
function CyberCore({ mousePos, isMobile }) {
  const groupRef = useRef();
  const outerRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mousePos.current.x * 0.3 - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (-mousePos.current.y * 0.3 - groupRef.current.rotation.x) * 0.04;
    }

    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.2;
      outerRef.current.rotation.x += delta * 0.12;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.35;
      innerRef.current.rotation.z += delta * 0.18;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + state.clock.getElapsedTime() * 0.25;
      ring1Ref.current.rotation.y = state.clock.getElapsedTime() * 0.18;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + state.clock.getElapsedTime() * 0.2;
      ring2Ref.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    }
  });

  // Responsive scale: centered on mobile, right-offset on desktop
  const positionOffset = isMobile ? [0, 0, 0] : [1.4, 0, 0];
  const groupScale = isMobile ? 1.0 : 1.35;

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={positionOffset} scale={groupScale}>
        {/* Outer Wireframe Cyber Sphere */}
        <Icosahedron ref={outerRef} args={[1.35, 2]}>
          <meshBasicMaterial
            color="#00c2d1"
            wireframe
            transparent
            opacity={0.35}
          />
        </Icosahedron>

        {/* Inner Glowing Crystal Octahedron */}
        <Octahedron ref={innerRef} args={[0.7, 0]}>
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#006677"
            wireframe
            roughness={0.1}
            metalness={0.9}
          />
        </Octahedron>

        {/* Core Solid Light Glowing Bulb */}
        <mesh scale={0.38}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#00c2d1" transparent opacity={0.5} />
        </mesh>

        {/* Orbiting Gyros Ring 1 */}
        <group ref={ring1Ref}>
          <Ring args={[1.6, 1.63, 64]}>
            <meshBasicMaterial color="#8b6bff" side={THREE.DoubleSide} transparent opacity={0.45} />
          </Ring>
        </group>

        {/* Orbiting Gyros Ring 2 */}
        <group ref={ring2Ref}>
          <Ring args={[1.8, 1.82, 64]}>
            <meshBasicMaterial color="#00c2d1" side={THREE.DoubleSide} transparent opacity={0.35} />
          </Ring>
        </group>

        {/* High-Density HD Particle Swarm */}
        <ParticleSwarm count={350} />
      </group>
    </Float>
  );
}

export default function Hero3D() {
  const mousePos = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
      <Canvas
        dpr={[1, 2]} // HD Crisp Retina Rendering
        camera={{ position: [0, 0, 4.8], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#00c2d1" />
        <pointLight position={[5, -5, 5]} intensity={1} color="#8b6bff" />
        <CyberCore mousePos={mousePos} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
