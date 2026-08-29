import React from 'react';
import { BoardDefinition } from '@circuit/shared';

interface Board3DProps {
  boardDef: BoardDefinition;
  label: string;
  isSimulating?: boolean;
}

export const Board3DRenderer: React.FC<Board3DProps> = ({ boardDef, label, isSimulating }) => {
  const { id } = boardDef;

  // 1. Arduino UNO R3 (Authentic Teal/Turquoise PCB - No Blue)
  if (id === 'board-arduino-uno') {
    return (
      <group>
        {/* PCB Board Base */}
        <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.2, 0.12, 2.4]} />
          <meshStandardMaterial color="#008184" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* USB Type-B Metallic Port */}
        <mesh position={[-1.3, 0.35, -0.7]} castShadow>
          <boxGeometry args={[0.5, 0.4, 0.5]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* DC Power Barrel Jack */}
        <mesh position={[-1.2, 0.35, 0.7]} castShadow>
          <boxGeometry args={[0.6, 0.45, 0.5]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>

        {/* ATmega328P DIP IC Chip */}
        <mesh position={[0.2, 0.22, 0.1]} castShadow>
          <boxGeometry args={[1.4, 0.15, 0.4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>

        {/* Digital Female Header Sockets Top */}
        <mesh position={[0.2, 0.25, -1.05]}>
          <boxGeometry args={[2.2, 0.2, 0.15]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Power / Analog Female Header Sockets Bottom */}
        <mesh position={[0.2, 0.25, 1.05]}>
          <boxGeometry args={[2.2, 0.2, 0.15]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Onboard Pin 13 Status LED */}
        <mesh position={[0.8, 0.2, -0.6]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
          <meshStandardMaterial
            color={isSimulating ? '#f59e0b' : '#334155'}
            emissive={isSimulating ? '#f59e0b' : '#000000'}
            emissiveIntensity={isSimulating ? 2 : 0}
          />
        </mesh>
      </group>
    );
  }

  // 2. ESP32 DevKit V1 (Sleek Matte Black Gold PCB)
  if (id === 'board-esp32-devkit') {
    return (
      <group>
        {/* PCB Board Base */}
        <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.8, 0.12, 3.5]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Micro-USB Metallic Connector */}
        <mesh position={[0, 0.25, -1.65]} castShadow>
          <boxGeometry args={[0.4, 0.2, 0.3]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* ESP-WROOM-32 Metallic Shield Module */}
        <mesh position={[0, 0.3, -0.3]} castShadow>
          <boxGeometry args={[1.5, 0.18, 1.6]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Dual Row Female Header Pins */}
        <mesh position={[-1.25, 0.25, 0]}>
          <boxGeometry args={[0.15, 0.22, 3.2]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>
        <mesh position={[1.25, 0.25, 0]}>
          <boxGeometry args={[0.15, 0.22, 3.2]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>

        {/* Onboard Power / Status LED */}
        <mesh position={[-0.8, 0.2, -1.3]}>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
          <meshStandardMaterial
            color={isSimulating ? '#3b82f6' : '#1e293b'}
            emissive={isSimulating ? '#3b82f6' : '#000000'}
            emissiveIntensity={isSimulating ? 2 : 0}
          />
        </mesh>
      </group>
    );
  }

  // 3. Raspberry Pi Pico (Authentic Emerald Green PCB)
  if (id === 'board-raspberry-pi-pico') {
    return (
      <group>
        {/* PCB Board Base */}
        <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.1, 0.12, 3.4]} />
          <meshStandardMaterial color="#15803d" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Micro-USB Port */}
        <mesh position={[0, 0.25, -1.6]} castShadow>
          <boxGeometry args={[0.35, 0.18, 0.3]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>

        {/* RP2040 Chip */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>
      </group>
    );
  }

  // 4. STM32 BluePill (Charcoal Slate PCB)
  return (
    <group>
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.3, 0.12, 3.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.9, 0.1, 0.9]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
};
