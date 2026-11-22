"use client";
import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Network() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  const { points, lines } = useMemo(() => {
    const v: THREE.Vector3[] = [];
    for (let i = 0; i < 90; i++) {
      const r = 2.6 * Math.cbrt(Math.random());
      const t = Math.random() * Math.PI * 2;
      const f = Math.acos(2 * Math.random() - 1);
      v.push(new THREE.Vector3(r * Math.sin(f) * Math.cos(t), r * Math.sin(f) * Math.sin(t), r * Math.cos(f)));
    }
    const l: number[] = [];
    for (let i = 0; i < v.length; i++)
      for (let j = i + 1; j < v.length; j++)
        if (v[i].distanceTo(v[j]) < 1.15) l.push(v[i].x, v[i].y, v[i].z, v[j].x, v[j].y, v[j].z);
    return { points: new Float32Array(v.flatMap((p) => [p.x, p.y, p.z])), lines: new Float32Array(l) };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    cur.current.x = THREE.MathUtils.damp(cur.current.x, mouse.current.x, 3, dt);
    cur.current.y = THREE.MathUtils.damp(cur.current.y, mouse.current.y, 3, dt);
    g.rotation.y = state.clock.elapsedTime * 0.07 + cur.current.x * 0.5 + window.scrollY * 0.0015;
    g.rotation.x = cur.current.y * 0.3;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry>
        <pointsMaterial color="#c084fc" size={0.07} sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[lines, 3]} /></bufferGeometry>
        <lineBasicMaterial color="#6d5bd0" transparent opacity={0.28} />
      </lineSegments>
    </group>
  );
}

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Scene() {
  const skip = typeof window !== "undefined" &&
    (window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  if (skip) return null;
  return (
    <Boundary>
      <Canvas camera={{ position: [0, 0, 6.5], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "low-power" }}>
        <Network />
      </Canvas>
    </Boundary>
  );
}
