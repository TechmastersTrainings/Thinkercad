import React, { useRef } from 'react';
import { ComponentDefinition } from '@circuit/shared';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Component3DProps {
  compDef: ComponentDefinition;
  properties: Record<string, any>;
  onPropertyChange?: (key: string, value: any) => void;
  isSimulating?: boolean;
}

export const Component3DRenderer: React.FC<Component3DProps> = ({
  compDef,
  properties,
  isSimulating,
}) => {
  const { id } = compDef;
  const motorShaftRef = useRef<THREE.Group>(null);

  // Rotate motor shaft on every frame during simulation
  useFrame((_, delta) => {
    if (isSimulating && motorShaftRef.current && (id === 'dc-motor' || id === 'stepper-motor')) {
      motorShaftRef.current.rotation.y += delta * 10;
    }
  });

  // 1. 3D LED Glass Dome
  if (id === 'led') {
    return (
      <group>
        {/* Transparent Glass Dome */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          <meshPhysicalMaterial
            color={isSimulating ? '#f43f5e' : '#881337'}
            roughness={0.1}
            transmission={0.8}
            thickness={0.5}
          />
        </mesh>

        {/* Metallic Base Rim */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>

        {/* 3D Anode / Cathode Wire Leads */}
        <mesh position={[-0.1, -0.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
        <mesh position={[0.1, -0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>

        {/* Point Light Glow Emission when Simulating */}
        {isSimulating && (
          <pointLight position={[0, 0.5, 0]} color="#f43f5e" intensity={4} distance={3} />
        )}
      </group>
    );
  }

  // 2. 3D RGB LED
  if (id === 'rgb-led') {
    const r = (properties.colorR ?? 255) / 255;
    const g = (properties.colorG ?? 100) / 255;
    const b = (properties.colorB ?? 0) / 255;
    const colorHex = isSimulating ? new THREE.Color(r, g, b) : new THREE.Color('#334155');

    return (
      <group>
        <mesh position={[0, 0.4, 0]} castShadow>
          <sphereGeometry args={[0.35, 32, 16]} />
          <meshPhysicalMaterial
            color={colorHex}
            roughness={0.1}
            transmission={0.6}
            emissive={isSimulating ? colorHex : new THREE.Color('#000')}
            emissiveIntensity={isSimulating ? 1.5 : 0}
          />
        </mesh>
        {isSimulating && (
          <pointLight position={[0, 0.5, 0]} color={colorHex} intensity={5} distance={4} />
        )}
      </group>
    );
  }

  // 3. 3D Ultrasonic HC-SR04 Transducer Module
  if (id === 'ultrasonic-hcsr04') {
    return (
      <group>
        {/* Blue PCB Base */}
        <mesh position={[0, 0.08, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.4, 0.1, 1.2]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} />
        </mesh>

        {/* Trigger Metallic Transducer (T) */}
        <group position={[-0.6, 0.4, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.6, 32]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.31]}>
            <circleGeometry args={[0.34, 32]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* Receiver Metallic Transducer (R) */}
        <group position={[0.6, 0.4, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.6, 32]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.31]}>
            <circleGeometry args={[0.34, 32]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>
    );
  }

  // 4. 3D Micro Servo SG90
  if (id === 'servo') {
    const angle = properties.angle ?? 90;
    const rad = ((angle - 90) * Math.PI) / 180;

    return (
      <group>
        {/* Blue Translucent Plastic Body */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[1.2, 1.0, 0.7]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>

        {/* Top Gear Shaft */}
        <mesh position={[0.3, 1.15, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.2, 24]} />
          <meshStandardMaterial color="#f1f5f9" />
        </mesh>

        {/* Rotating Servo Horn Arm */}
        <group position={[0.3, 1.28, 0]} rotation={[0, rad, 0]}>
          <mesh position={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.9, 0.08, 0.2]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      </group>
    );
  }

  // 5. 3D SSD1306 OLED Display
  if (id === 'oled-ssd1306') {
    return (
      <group>
        <mesh position={[0, 0.08, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.2, 0.1, 1.6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* OLED Screen */}
        <mesh position={[0, 0.15, -0.1]}>
          <boxGeometry args={[1.8, 0.05, 1.0]} />
          <meshStandardMaterial color="#000000" emissive={isSimulating ? '#06b6d4' : '#000000'} emissiveIntensity={isSimulating ? 0.8 : 0} />
        </mesh>
      </group>
    );
  }

  // 6. 3D DC Motor & Stepper Motor
  if (id === 'dc-motor' || id === 'stepper-motor') {
    return (
      <group>
        {/* Metallic Motor Canister */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 1.4, 32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Spinning Shaft */}
        <group ref={motorShaftRef} position={[0.8, 0.5, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <boxGeometry args={[0.05, 0.4, 0.1]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        </group>
      </group>
    );
  }

  // Fallback 3D mesh
  return (
    <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
      <boxGeometry args={[1.2, 0.4, 1.2]} />
      <meshStandardMaterial color="#334155" roughness={0.4} />
    </mesh>
  );
};
