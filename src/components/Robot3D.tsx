import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Cylinder, RoundedBox, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface RobotProps {
  mousePosition: { x: number; y: number };
}

function RobotHead({ mousePosition }: RobotProps) {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftPupilRef = useRef<THREE.Mesh>(null);
  const rightPupilRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (headRef.current) {
      // Enhanced head rotation - now follows both X and Y with more range
      const targetRotationY = mousePosition.x * 0.6;
      const targetRotationX = -mousePosition.y * 0.4; // Look down when mouse is below
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }
    
    // Pupils follow mouse more dramatically
    if (leftPupilRef.current && rightPupilRef.current) {
      const pupilOffsetX = mousePosition.x * 0.04;
      const pupilOffsetY = mousePosition.y * 0.03;
      
      leftPupilRef.current.position.x = -0.3 + pupilOffsetX;
      leftPupilRef.current.position.y = 0.15 + pupilOffsetY;
      rightPupilRef.current.position.x = 0.3 + pupilOffsetX;
      rightPupilRef.current.position.y = 0.15 + pupilOffsetY;
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
      {/* Main Head - more angular cyberpunk design */}
      <RoundedBox args={[1.5, 1.3, 1.3]} radius={0.15} smoothness={4}>
        <meshStandardMaterial 
          color="#0a0a15" 
          metalness={0.9} 
          roughness={0.1}
        />
      </RoundedBox>
      
      {/* Head accent lines */}
      <Box args={[1.52, 0.03, 0.6]} position={[0, 0.4, 0.35]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} />
      </Box>
      <Box args={[1.52, 0.03, 0.6]} position={[0, -0.2, 0.35]}>
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.6} />
      </Box>
      
      {/* Visor/Face plate - larger and more prominent */}
      <RoundedBox args={[1.3, 0.6, 0.15]} radius={0.08} position={[0, 0.1, 0.6]}>
        <meshStandardMaterial 
          color="#050510" 
          metalness={0.95} 
          roughness={0.05}
          transparent
          opacity={0.9}
        />
      </RoundedBox>
      
      {/* Eye sockets */}
      <mesh position={[-0.3, 0.15, 0.58]}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 0.15, 0.58]}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Left Eye glow ring */}
      <mesh ref={leftEyeRef} position={[-0.3, 0.15, 0.62]}>
        <ringGeometry args={[0.1, 0.16, 32]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Left Eye pupil */}
      <mesh ref={leftPupilRef} position={[-0.3, 0.15, 0.65]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#00ffff"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Right Eye glow ring */}
      <mesh ref={rightEyeRef} position={[0.3, 0.15, 0.62]}>
        <ringGeometry args={[0.1, 0.16, 32]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Right Eye pupil */}
      <mesh ref={rightPupilRef} position={[0.3, 0.15, 0.65]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#00ffff"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Antenna array */}
      <group position={[0, 0.75, 0]}>
        {/* Main antenna */}
        <Cylinder args={[0.04, 0.02, 0.5, 8]} position={[0, 0.25, 0]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
        </Cylinder>
        <Sphere args={[0.1, 16, 16]} position={[0, 0.55, 0]}>
          <meshStandardMaterial 
            color="#ff00ff" 
            emissive="#ff00ff"
            emissiveIntensity={1.5}
          />
        </Sphere>
        {/* Side antennas */}
        <Cylinder args={[0.02, 0.015, 0.3, 6]} position={[-0.2, 0.15, 0]} rotation={[0, 0, 0.3]}>
          <meshStandardMaterial color="#16213e" metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Cylinder args={[0.02, 0.015, 0.3, 6]} position={[0.2, 0.15, 0]} rotation={[0, 0, -0.3]}>
          <meshStandardMaterial color="#16213e" metalness={0.8} roughness={0.2} />
        </Cylinder>
      </group>
      
      {/* Side head panels with details */}
      <Box args={[0.12, 0.5, 0.9]} position={[-0.78, 0, 0]}>
        <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
      </Box>
      <Box args={[0.12, 0.5, 0.9]} position={[0.78, 0, 0]}>
        <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
      </Box>
      {/* Side lights */}
      <Box args={[0.05, 0.15, 0.15]} position={[-0.85, 0.1, 0.2]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} />
      </Box>
      <Box args={[0.05, 0.15, 0.15]} position={[0.85, 0.1, 0.2]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} />
      </Box>
      
      {/* Neck connector */}
      <Cylinder args={[0.3, 0.4, 0.3, 16]} position={[0, -0.75, 0]}>
        <meshStandardMaterial color="#0f0f1a" metalness={0.9} roughness={0.1} />
      </Cylinder>
      <Ring args={[0.35, 0.45, 32]} position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

function RobotBody({ mousePosition }: RobotProps) {
  const bodyRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (bodyRef.current) {
      // Subtle body sway following mouse
      const targetRotationY = mousePosition.x * 0.2;
      const targetRotationX = -mousePosition.y * 0.1;
      bodyRef.current.rotation.y = THREE.MathUtils.lerp(
        bodyRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      bodyRef.current.rotation.x = THREE.MathUtils.lerp(
        bodyRef.current.rotation.x,
        targetRotationX,
        0.03
      );
    }
    
    // Pulsing core
    if (coreRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.8;
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={bodyRef} position={[0, 0.4, 0]}>
      {/* Main Torso */}
      <RoundedBox args={[1.7, 2, 1.1]} radius={0.12} smoothness={4}>
        <meshStandardMaterial 
          color="#0d0d1a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </RoundedBox>
      
      {/* Torso panel lines */}
      <Box args={[1.4, 0.02, 0.6]} position={[0, 0.6, 0.55]}>
        <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} />
      </Box>
      <Box args={[1.4, 0.02, 0.6]} position={[0, 0, 0.55]}>
        <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} />
      </Box>
      <Box args={[1.4, 0.02, 0.6]} position={[0, -0.6, 0.55]}>
        <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} />
      </Box>
      
      {/* Chest core - arc reactor style */}
      <group position={[0, 0.25, 0.56]}>
        {/* Outer ring */}
        <Ring args={[0.28, 0.35, 32]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} side={THREE.DoubleSide} />
        </Ring>
        {/* Middle ring */}
        <Ring args={[0.18, 0.24, 32]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.6} side={THREE.DoubleSide} />
        </Ring>
        {/* Core */}
        <mesh ref={coreRef} position={[0, 0, 0.02]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff"
            emissiveIntensity={1.2}
            transparent
            opacity={0.95}
          />
        </mesh>
      </group>
      
      {/* Shoulder armor */}
      <group position={[-1, 0.65, 0]}>
        <RoundedBox args={[0.4, 0.35, 0.5]} radius={0.08}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <Box args={[0.42, 0.03, 0.3]} position={[0, 0.1, 0.1]}>
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.6} />
        </Box>
      </group>
      <group position={[1, 0.65, 0]}>
        <RoundedBox args={[0.4, 0.35, 0.5]} radius={0.08}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <Box args={[0.42, 0.03, 0.3]} position={[0, 0.1, 0.1]}>
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.6} />
        </Box>
      </group>
      
      {/* Shoulder joints */}
      <Sphere args={[0.22, 16, 16]} position={[-1, 0.35, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.15} />
      </Sphere>
      <Sphere args={[0.22, 16, 16]} position={[1, 0.35, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.15} />
      </Sphere>
      
      {/* Arms with more detail */}
      <group position={[-1.35, 0, 0]}>
        {/* Upper arm */}
        <RoundedBox args={[0.28, 0.7, 0.28]} radius={0.08} position={[0, 0.1, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Elbow joint */}
        <Sphere args={[0.15, 16, 16]} position={[0, -0.25, 0]}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </Sphere>
        {/* Lower arm */}
        <RoundedBox args={[0.25, 0.6, 0.25]} radius={0.06} position={[0, -0.55, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Arm accent */}
        <Box args={[0.08, 0.3, 0.15]} position={[0.1, -0.5, 0.08]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.4} />
        </Box>
        {/* Hand */}
        <RoundedBox args={[0.2, 0.25, 0.15]} radius={0.05} position={[0, -0.95, 0]}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </RoundedBox>
      </group>
      
      <group position={[1.35, 0, 0]}>
        {/* Upper arm */}
        <RoundedBox args={[0.28, 0.7, 0.28]} radius={0.08} position={[0, 0.1, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Elbow joint */}
        <Sphere args={[0.15, 16, 16]} position={[0, -0.25, 0]}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </Sphere>
        {/* Lower arm */}
        <RoundedBox args={[0.25, 0.6, 0.25]} radius={0.06} position={[0, -0.55, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Arm accent */}
        <Box args={[0.08, 0.3, 0.15]} position={[-0.1, -0.5, 0.08]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.4} />
        </Box>
        {/* Hand */}
        <RoundedBox args={[0.2, 0.25, 0.15]} radius={0.05} position={[0, -0.95, 0]}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </RoundedBox>
      </group>
      
      {/* Waist with details */}
      <Cylinder args={[0.55, 0.7, 0.35, 16]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
      </Cylinder>
      <Ring args={[0.56, 0.62, 32]} position={[0, -0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

function RobotLegs() {
  return (
    <group position={[0, -1.7, 0]}>
      {/* Hip joints */}
      <Sphere args={[0.18, 16, 16]} position={[-0.35, 0.3, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.15} />
      </Sphere>
      <Sphere args={[0.18, 16, 16]} position={[0.35, 0.3, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.15} />
      </Sphere>
      
      {/* Left leg */}
      <group position={[-0.4, 0, 0]}>
        {/* Upper leg */}
        <RoundedBox args={[0.32, 0.8, 0.32]} radius={0.08} position={[0, -0.1, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Knee joint */}
        <Sphere args={[0.14, 16, 16]} position={[0, -0.55, 0]}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </Sphere>
        {/* Lower leg */}
        <RoundedBox args={[0.28, 0.7, 0.28]} radius={0.06} position={[0, -0.95, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Leg accent */}
        <Box args={[0.06, 0.25, 0.12]} position={[0.12, -0.9, 0.08]}>
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.4} />
        </Box>
        {/* Foot */}
        <RoundedBox args={[0.35, 0.12, 0.5]} radius={0.04} position={[0, -1.35, 0.08]}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        {/* Foot light */}
        <Box args={[0.2, 0.03, 0.08]} position={[0, -1.28, 0.25]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.6} />
        </Box>
      </group>
      
      {/* Right leg */}
      <group position={[0.4, 0, 0]}>
        {/* Upper leg */}
        <RoundedBox args={[0.32, 0.8, 0.32]} radius={0.08} position={[0, -0.1, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Knee joint */}
        <Sphere args={[0.14, 16, 16]} position={[0, -0.55, 0]}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </Sphere>
        {/* Lower leg */}
        <RoundedBox args={[0.28, 0.7, 0.28]} radius={0.06} position={[0, -0.95, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Leg accent */}
        <Box args={[0.06, 0.25, 0.12]} position={[-0.12, -0.9, 0.08]}>
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.4} />
        </Box>
        {/* Foot */}
        <RoundedBox args={[0.35, 0.12, 0.5]} radius={0.04} position={[0, -1.35, 0.08]}>
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        {/* Foot light */}
        <Box args={[0.2, 0.03, 0.08]} position={[0, -1.28, 0.25]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.6} />
        </Box>
      </group>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  const particleCount = 80;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    // Alternate between cyan and magenta
    if (i % 2 === 0) {
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    } else {
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0;
      colors[i * 3 + 2] = 1;
    }
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
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} />
    </points>
  );
}

function HexagonalGrid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={gridRef} position={[0, 0, -3]}>
      {[...Array(6)].map((_, i) => (
        <Ring 
          key={i} 
          args={[2 + i * 0.5, 2.05 + i * 0.5, 6]} 
          rotation={[0, 0, i * Math.PI / 6]}
        >
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.2 - i * 0.03} 
            transparent 
            opacity={0.3 - i * 0.04}
            side={THREE.DoubleSide}
          />
        </Ring>
      ))}
    </group>
  );
}

function Robot({ mousePosition }: RobotProps) {
  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group scale={0.75}>
        <RobotHead mousePosition={mousePosition} />
        <RobotBody mousePosition={mousePosition} />
        <RobotLegs />
      </group>
    </Float>
  );
}

export function Robot3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
      }
    };

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && e.touches.length > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
      }
    };
    
    // Device orientation for mobile
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.max(-1, Math.min(1, e.gamma / 30));
        const y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px] lg:min-h-[500px] touch-none">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 7 : 6], fov: isMobile ? 55 : 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ff00ff" />
        <pointLight position={[0, -5, 5]} intensity={0.4} color="#00ffff" />
        <spotLight
          position={[0, 8, 5]}
          angle={0.4}
          penumbra={1}
          intensity={1.2}
          color="#ffffff"
        />
        <Robot mousePosition={mousePosition} />
        <FloatingParticles />
        <HexagonalGrid />
      </Canvas>
    </div>
  );
}
