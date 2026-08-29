import React, { useMemo } from 'react';
import * as THREE from 'three';
import { WireEdge } from '@circuit/shared';

interface Wire3DProps {
  wire: WireEdge;
  fromPos: [number, number, number];
  toPos: [number, number, number];
}

export const Wire3DRenderer: React.FC<Wire3DProps> = ({ wire, fromPos, toPos }) => {
  // Generate a 3D Catmull-Rom spline curve with a natural drooping wire arc in 3D space
  const tubeGeometry = useMemo(() => {
    const start = new THREE.Vector3(...fromPos);
    const end = new THREE.Vector3(...toPos);

    const midX = (start.x + end.x) / 2;
    const midZ = (start.z + end.z) / 2;
    // Elevate middle of wire upward in 3D space to simulate flexible wire arc
    const midY = Math.max(start.y, end.y) + 0.8;

    const midPoint = new THREE.Vector3(midX, midY, midZ);
    const curve = new THREE.CatmullRomCurve3([start, midPoint, end]);

    return new THREE.TubeGeometry(curve, 32, 0.04, 8, false);
  }, [fromPos, toPos]);

  return (
    <mesh geometry={tubeGeometry} castShadow>
      <meshStandardMaterial
        color={wire.color || '#ef4444'}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
};
