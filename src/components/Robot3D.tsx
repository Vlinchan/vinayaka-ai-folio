import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Cylinder, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface RobotProps {
  mousePosition: { x: number; y: number };
}

function RobotHead({ mousePosition }: RobotProps) {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (headRef.current) {
      // Smooth head rotation following mouse
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = -mousePosition.y * 0.3;
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.08
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.08
      );
    }
    
    // Eye glow pulsing
    if (leftEyeRef.current && rightEyeRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={headRef} position={[0, 1.8, 0]}>
      {/* Main Head */}
      <RoundedBox args={[1.4, 1.2, 1.2]} radius={0.2} smoothness={4}>
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.8} 
          roughness={0.2}
        />
      </RoundedBox>
      
      {/* Visor/Face plate */}
      <RoundedBox args={[1.2, 0.5, 0.2]} radius={0.1} position={[0, 0.1, 0.55]}>
        <meshStandardMaterial 
          color="#0f0f1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </RoundedBox>
      
      {/* Left Eye */}
      <mesh ref={leftEyeRef} position={[-0.3, 0.15, 0.65]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Right Eye */}
      <mesh ref={rightEyeRef} position={[0.3, 0.15, 0.65]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Antenna */}
      <group position={[0, 0.7, 0]}>
        <Cylinder args={[0.03, 0.03, 0.4, 8]} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#ff00ff" metalness={0.9} roughness={0.1} />
        </Cylinder>
        <Sphere args={[0.08, 16, 16]} position={[0, 0.45, 0]}>
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff"
            emissiveIntensity={1.2}
          />
        </Sphere>
      </group>
      
      {/* Side panels */}
      <Box args={[0.15, 0.4, 0.8]} position={[-0.75, 0, 0]}>
        <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
      </Box>
      <Box args={[0.15, 0.4, 0.8]} position={[0.75, 0, 0]}>
        <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
      </Box>
    </group>
  );
}

function RobotBody({ mousePosition }: RobotProps) {
  const bodyRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (bodyRef.current) {
      // Subtle body sway
      const targetRotationY = mousePosition.x * 0.15;
      bodyRef.current.rotation.y = THREE.MathUtils.lerp(
        bodyRef.current.rotation.y,
        targetRotationY,
        0.04
      );
    }
  });

  return (
    <group ref={bodyRef} position={[0, 0.4, 0]}>
      {/* Main Torso */}
      <RoundedBox args={[1.6, 1.8, 1]} radius={0.15} smoothness={4}>
        <meshStandardMaterial 
          color="#16213e" 
          metalness={0.7} 
          roughness={0.3}
        />
      </RoundedBox>
      
      {/* Chest core */}
      <mesh position={[0, 0.2, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Chest ring */}
      <mesh position={[0, 0.2, 0.5]}>
        <torusGeometry args={[0.35, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color="#ff00ff" 
          emissive="#ff00ff"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Shoulder joints */}
      <Sphere args={[0.25, 16, 16]} position={[-0.95, 0.6, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={[0.95, 0.6, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </Sphere>
      
      {/* Arms */}
      <group position={[-1.3, 0.2, 0]}>
        <RoundedBox args={[0.3, 1, 0.3]} radius={0.1}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Hand */}
        <Sphere args={[0.18, 16, 16]} position={[0, -0.6, 0]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </Sphere>
      </group>
      
      <group position={[1.3, 0.2, 0]}>
        <RoundedBox args={[0.3, 1, 0.3]} radius={0.1}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Hand */}
        <Sphere args={[0.18, 16, 16]} position={[0, -0.6, 0]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </Sphere>
      </group>
      
      {/* Waist */}
      <Cylinder args={[0.6, 0.7, 0.3, 16]} position={[0, -0.9, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </Cylinder>
    </group>
  );
}

function RobotLegs() {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Left leg */}
      <group position={[-0.4, 0, 0]}>
        <RoundedBox args={[0.35, 1.2, 0.35]} radius={0.1}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Foot */}
        <RoundedBox args={[0.4, 0.15, 0.5]} radius={0.05} position={[0, -0.7, 0.1]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
      
      {/* Right leg */}
      <group position={[0.4, 0, 0]}>
        <RoundedBox args={[0.35, 1.2, 0.35]} radius={0.1}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Foot */}
        <RoundedBox args={[0.4, 0.15, 0.5]} radius={0.05} position={[0, -0.7, 0.1]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

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
      <pointsMaterial size={0.05} color="#00ffff" transparent opacity={0.6} />
    </points>
  );
}

function Robot({ mousePosition }: RobotProps) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group scale={0.8}>
        <RobotHead mousePosition={mousePosition} />
        <RobotBody mousePosition={mousePosition} />
        <RobotLegs />
      </group>
    </Float>
  );
}

export function Robot3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#ffffff"
        />
        <Robot mousePosition={mousePosition} />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}