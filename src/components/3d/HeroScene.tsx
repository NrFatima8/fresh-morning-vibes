import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const CoffeeCup = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {/* Cup Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 1.5, 32]} />
          <meshStandardMaterial color="#F5F1E9" roughness={0.3} metalness={0.1} />
        </mesh>
        
        {/* Cup Inner */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.7, 0.5, 1, 32]} />
          <meshStandardMaterial color="#3d2314" roughness={0.8} />
        </mesh>
        
        {/* Handle */}
        <mesh position={[0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#F5F1E9" roughness={0.3} metalness={0.1} />
        </mesh>
        
        {/* Saucer */}
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[1.2, 1.1, 0.1, 32]} />
          <meshStandardMaterial color="#F5F1E9" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

const Steam = () => {
  const steamRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      const positions = steamRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        positions.setY(i, y + 0.01);
        if (y > 2) {
          positions.setY(i, 0);
        }
      }
      positions.needsUpdate = true;
    }
  });

  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.3;
    positions[i * 3 + 1] = Math.random() * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
  }

  return (
    <points ref={steamRef} position={[0, 0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingPastry = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.4, 0]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
};

const FloatingFruit = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh position={position}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FFD166"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FFD166" />
          
          <CoffeeCup />
          <Steam />
          
          {/* Floating pastries and fruits */}
          <FloatingPastry position={[-2, 1, -1]} color="#8B6D5C" />
          <FloatingPastry position={[2.5, -0.5, -2]} color="#E08D79" />
          <FloatingFruit position={[-2.5, -1, 0]} color="#A3D9A5" />
          <FloatingFruit position={[2, 1.5, -1]} color="#FFD166" />
          <FloatingFruit position={[-1.5, 2, -2]} color="#E08D79" />
          
          <Particles />
          
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};
