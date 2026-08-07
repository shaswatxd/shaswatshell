"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, Ring } from '@react-three/drei';
import * as THREE from 'three';

// Orbiting High-Definition Cyber Particle Swarm
function ParticleSwarm({ count = 450 }) {
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
      const r = 1.2 + Math.random() * 2.8;

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
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.025;
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
        size={0.045}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

// Sleek Cyber Core Geometry with Scroll Depth Reactivity
function CyberCore({ mousePos, isMobile }) {
  const groupRef = useRef();
  const outerRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    
    if (groupRef.current) {
      groupRef.current.rotation.y += (mousePos.current.x * 0.3 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x = scrollY * 0.0008 + (-mousePos.current.y * 0.3);
    }

    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.16;
      outerRef.current.rotation.x += delta * 0.08;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.25;
      innerRef.current.rotation.z += delta * 0.12;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + state.clock.getElapsedTime() * 0.18;
      ring1Ref.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + state.clock.getElapsedTime() * 0.15;
      ring2Ref.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });

  // Proper dead center [0, 0, 0] alignment for desktop & mobile
  const positionOffset = [0, 0, 0];
  const groupScale = isMobile ? 0.82 : 1.1;

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={groupRef} position={positionOffset} scale={groupScale}>
        {/* Outer Wireframe Cyber Sphere */}
        <Icosahedron ref={outerRef} args={[1.35, 2]}>
          <meshBasicMaterial
            color="#00c2d1"
            wireframe
            transparent
            opacity={0.28}
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
          <meshBasicMaterial color="#00c2d1" transparent opacity={0.4} />
        </mesh>

        {/* Orbiting Gyros Ring 1 */}
        <group ref={ring1Ref}>
          <Ring args={[1.6, 1.63, 64]}>
            <meshBasicMaterial color="#8b6bff" side={THREE.DoubleSide} transparent opacity={0.35} />
          </Ring>
        </group>

        {/* Orbiting Gyros Ring 2 */}
        <group ref={ring2Ref}>
          <Ring args={[1.8, 1.82, 64]}>
            <meshBasicMaterial color="#00c2d1" side={THREE.DoubleSide} transparent opacity={0.28} />
          </Ring>
        </group>

        {/* High-Density HD Particle Swarm */}
        <ParticleSwarm count={450} />
      </group>
    </Float>
  );
}

// Mobile-Tailored Lightweight Cyber Constellation Canvas for Phone Browsers
function MobileCyberConstellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Floating particle nodes configuration
    const nodeCount = Math.min(38, Math.floor(width / 12));
    const colors = ['#00c2d1', '#8b6bff', '#ff3d9a', '#00f0ff'];

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.35,
    }));

    let touchX = width / 2;
    let touchY = height / 2;
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render soft cyber ambient glows behind text
      const gradient1 = ctx.createRadialGradient(
        width * 0.5, height * 0.3, 10,
        width * 0.5, height * 0.3, width * 0.7
      );
      gradient1.addColorStop(0, 'rgba(0, 194, 209, 0.08)');
      gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(
        width * 0.8, height * 0.7, 10,
        width * 0.8, height * 0.7, width * 0.6
      );
      gradient2.addColorStop(0, 'rgba(139, 107, 255, 0.07)');
      gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      // Draw constellation lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const lineAlpha = (1 - dist / 110) * 0.22;
            ctx.strokeStyle = `rgba(0, 194, 209, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update and draw floating nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Slight drift towards touch position if close
        const tdx = touchX - node.x;
        const tdy = touchY - node.y;
        const tdist = Math.sqrt(tdx * tdx + tdy * tdy);
        if (tdist < 140) {
          node.x += (tdx / tdist) * 0.15;
          node.y += (tdy / tdist) * 0.15;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}

export default function Hero3D() {
  const mousePos = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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

  // Render ultra-lightweight fluid constellation on phone browsers, 3D WebGL core on desktops
  if (isMobile) {
    return <MobileCyberConstellation />;
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
      <Canvas
        dpr={[1, 2]} // Crisp native DPR for desktops
        camera={{ position: [0, 0, 5.0], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", precision: "highp" }}
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

