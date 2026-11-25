import React from "react";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

export const TestBox: React.FC = () => (
  <ThreeCanvas width={1080} height={1920} camera={{ fov: 40, near: 0.2, far: 1500, position: [0, 0, 8] }}>
    <ambientLight intensity={1.2} />
    <directionalLight position={[5, 5, 5]} intensity={2} />
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={new THREE.Color("#ff0000")} />
    </mesh>
    <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={new THREE.Color("#00ff00")} />
    </mesh>
  </ThreeCanvas>
);
