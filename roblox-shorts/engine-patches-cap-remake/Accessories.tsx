import React from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { AccessorySpec, FacialHair, resolveColor } from './look';

/**
 * Head-attached accessories. Coordinates are relative to the head center
 * (head radius 0.62, top at y=+0.575, face toward +Z, eyes at y≈0.04, x≈±0.17).
 */

const Cap: React.FC<{ color: string; secondary: string; backwards?: boolean }> = ({ color, secondary, backwards }) => (
  <group rotation={[0, backwards ? Math.PI : 0, 0]}>
    <mesh position={[0, 0.44, -0.04]} scale={[1.0, 0.8, 1.02]} castShadow>
      <sphereGeometry args={[0.82, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={color} roughness={0.6} side={THREE.DoubleSide} />
    </mesh>
    {/* band */}
    <mesh position={[0, 0.46, -0.04]}>
      <cylinderGeometry args={[0.83, 0.83, 0.08, 28, 1, true]} />
      <meshStandardMaterial color={secondary} roughness={0.6} side={THREE.DoubleSide} />
    </mesh>
    {/* brim */}
    <RoundedBox position={[0, 0.45, 0.98]} rotation={[0.12, 0, 0]} args={[1.2, 0.06, 0.62]} radius={0.025} castShadow>
      <meshStandardMaterial color={secondary} roughness={0.6} />
    </RoundedBox>
    {/* button */}
    <mesh position={[0, 1.1, -0.04]}>
      <sphereGeometry args={[0.07, 10, 8]} />
      <meshStandardMaterial color={secondary} roughness={0.6} />
    </mesh>
  </group>
);

const Beanie: React.FC<{ color: string; secondary: string }> = ({ color, secondary }) => (
  <group>
    <mesh position={[0, 0.46, -0.03]} scale={[1.0, 0.92, 1.02]} castShadow>
      <sphereGeometry args={[0.76, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={color} roughness={0.85} side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[0, 0.5, -0.03]} castShadow>
      <cylinderGeometry args={[0.8, 0.8, 0.26, 28]} />
      <meshStandardMaterial color={secondary} roughness={0.85} />
    </mesh>
    <mesh position={[0, 1.2, -0.03]} castShadow>
      <sphereGeometry args={[0.17, 12, 10]} />
      <meshStandardMaterial color={secondary} roughness={0.95} />
    </mesh>
  </group>
);

const Glasses: React.FC<{ color: string; dark?: boolean }> = ({ color, dark }) => (
  <group position={[0, 0.03, 0]}>
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.19, 0, 0.655]} rotation={[0, s * 0.22, 0]}>
        {dark ? (
          <RoundedBox args={[0.32, 0.2, 0.03]} radius={0.05}>
            <meshStandardMaterial color="#0A0A0A" roughness={0.15} metalness={0.4} />
          </RoundedBox>
        ) : (
          <>
            <mesh>
              <torusGeometry args={[0.13, 0.022, 8, 24]} />
              <meshStandardMaterial color={color} roughness={0.35} metalness={0.3} />
            </mesh>
            <mesh>
              <circleGeometry args={[0.13, 20]} />
              <meshStandardMaterial color="#DBEAFE" transparent opacity={0.22} roughness={0.05} />
            </mesh>
          </>
        )}
      </group>
    ))}
    {/* bridge */}
    <mesh position={[0, 0.03, 0.665]}>
      <boxGeometry args={[0.12, 0.03, 0.03]} />
      <meshStandardMaterial color={dark ? '#0A0A0A' : color} />
    </mesh>
    {/* temples */}
    {[-1, 1].map((s) => (
      <group key={`t${s}`}>
        <mesh position={[s * 0.45, 0.03, 0.56]} rotation={[0, s * -0.75, 0]}>
          <boxGeometry args={[0.03, 0.03, 0.34]} />
          <meshStandardMaterial color={dark ? '#0A0A0A' : color} />
        </mesh>
        <mesh position={[s * 0.6, 0.03, 0.18]}>
          <boxGeometry args={[0.03, 0.03, 0.56]} />
          <meshStandardMaterial color={dark ? '#0A0A0A' : color} />
        </mesh>
      </group>
    ))}
  </group>
);

const Headphones: React.FC<{ color: string; secondary: string }> = ({ color, secondary }) => (
  <group position={[0, 0.12, -0.04]}>
    <mesh>
      <torusGeometry args={[0.84, 0.065, 10, 32, Math.PI]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.8, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.27, 0.27, 0.2, 20]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
        <mesh position={[0, s * 0.11, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.03, 20]} />
          <meshStandardMaterial color={secondary} roughness={0.4} emissive={secondary} emissiveIntensity={0.2} />
        </mesh>
      </group>
    ))}
  </group>
);

const Bow: React.FC<{ color: string }> = ({ color }) => (
  <group position={[0.42, 0.86, 0.05]} rotation={[0, 0, -0.35]}>
    {[-1, 1].map((s) => (
      <mesh key={s} position={[s * 0.17, 0, 0]} rotation={[0, 0, (s * Math.PI) / 2]} castShadow>
        <coneGeometry args={[0.15, 0.32, 4]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
    ))}
    <mesh>
      <sphereGeometry args={[0.08, 10, 8]} />
      <meshStandardMaterial color={color} roughness={0.45} />
    </mesh>
  </group>
);

const Crown: React.FC<{ color: string }> = ({ color }) => (
  <group position={[0, 0.9, -0.04]}>
    <mesh castShadow>
      <cylinderGeometry args={[0.5, 0.46, 0.22, 24, 1, true]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.25} side={THREE.DoubleSide} />
    </mesh>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const a = (i / 8) * Math.PI * 2;
      return (
        <mesh key={i} position={[Math.sin(a) * 0.48, 0.2, Math.cos(a) * 0.48]} castShadow>
          <coneGeometry args={[0.08, 0.22, 6]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.25} />
        </mesh>
      );
    })}
  </group>
);

// ===========================================================================
// CAP REMAKE (2026-11-26) — vid2 "every time you cap" props.
// Palette read off the reference frames (tower 17/18/19): a fixed 10-color
// cycle, bottom cap always orange; top cap 17=white, 18=teal, 19=blue.
// ===========================================================================

export const CAP_TOWER_PALETTE = [
  '#EA580C', // 1 orange
  '#DC2626', // 2 red
  '#FACC15', // 3 yellow
  '#7C3AED', // 4 purple
  '#EC4899', // 5 pink
  '#18181B', // 6 black
  '#F8FAFC', // 7 white
  '#2DD4BF', // 8 teal
  '#2563EB', // 9 blue
  '#16A34A', // 10 green
];

const CAP_TOWER_STEP = 0.32; // nested stacking: dome height 0.62, so the stack reads as colored discs
const CAP_DOME_STEP = 0.55;
const DEG = Math.PI / 180;

/** One baseball cap in the tower: dome + long directional brim (unlike cap_dome's thin rim disc). */
const TowerCap: React.FC<{ color: string }> = ({ color }) => (
  <group>
    <mesh position={[0, 0, -0.04]} scale={[1.0, 0.78, 1.02]} castShadow>
      <sphereGeometry args={[0.8, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={color} roughness={0.6} side={THREE.DoubleSide} />
    </mesh>
    <RoundedBox position={[0, 0.03, 0.94]} rotation={[0.12, 0, 0]} args={[1.3, 0.06, 0.62]} radius={0.025} castShadow>
      <meshStandardMaterial color={color} roughness={0.6} />
    </RoundedBox>
  </group>
);

/** One NPC dome cap: tall hemisphere + thin flat rim disc all around. No directional
 *  baseball brim — that is what tells it apart from the hero's caps. Frame check:
 *  the teacher's stacked domes and the vendor/girl teal domes all show this thin
 *  rim disc, not a bare dome. */
const DomeCap: React.FC<{ color: string }> = ({ color }) => (
  <group>
    <mesh position={[0, 0, -0.04]} scale={[1.0, 0.85, 1.02]} castShadow>
      <sphereGeometry args={[0.82, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={color} roughness={0.6} side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[0, 0.02, -0.04]} castShadow>
      <cylinderGeometry args={[0.95, 0.95, 0.08, 28]} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  </group>
);

/** Hero's stacked cap tower. count = 1..19 (19 caps ≈ 2x body height). lean rotates
 *  the whole rigid tower around its base (S34: 30 deg, then 45 deg+). tiltTop tilts
 *  only the top cap (a cap that landed crooked, S20/S22). popFrame (absolute frame)
 *  makes the newest cap fall from above the frame over popDur frames (~0.25 s),
 *  the way caps pop in the reference — before popFrame the tower shows count-1. */
const CapTower: React.FC<{
  count: number;
  lean?: number;
  tiltTop?: number;
  popFrame?: number;
  popDur?: number;
  frame: number;
}> = ({ count, lean = 0, tiltTop = 0, popFrame, popDur = 8, frame }) => {
  const n = Math.max(0, Math.min(19, Math.round(count)));
  const popping = popFrame !== undefined && frame >= popFrame && frame < popFrame + popDur;
  const staticCount = popFrame !== undefined && frame < popFrame + popDur ? n - 1 : n;
  return (
    <group position={[0, 0.42, -0.04]} rotation={[0, 0, -lean * DEG]}>
      {Array.from({ length: Math.max(0, staticCount) }, (_, k) => {
        const yaw = k * 2.39996; // golden angle: brims point in varied directions, like the ref
        const tiltX = (((k * 37) % 5) - 2) * DEG;
        const tiltZ = (((k * 53) % 5) - 2) * DEG + (k === n - 1 ? tiltTop * DEG : 0);
        return (
          <group key={k} position={[0, k * CAP_TOWER_STEP, 0]} rotation={[0, yaw, 0]}>
            <group rotation={[tiltX, 0, tiltZ]}>
              <TowerCap color={CAP_TOWER_PALETTE[k % 10]} />
            </group>
          </group>
        );
      })}
      {popping &&
        (() => {
          const i = n - 1;
          const pr = (frame - (popFrame as number)) / popDur;
          const yOff = (1 - pr * pr) * 5.5; // accelerates downward
          const sc = 0.55 + 0.45 * pr; // small at the top edge, full size on landing
          return (
            <group
              position={[0, i * CAP_TOWER_STEP + yOff, 0]}
              rotation={[0, i * 2.39996, 0]}
              scale={[sc, sc, sc]}
            >
              <group rotation={[0, 0, tiltTop * DEG]}>
                <TowerCap color={CAP_TOWER_PALETTE[i % 10]} />
              </group>
            </group>
          );
        })()}
    </group>
  );
};

/** NPC dome cap(s): one dome per lie, stackable via colors (bottom-to-top).
 *  lift raises the stack (a dome landing on top of another cap, e.g. the girl's
 *  teal dome over her white/green cap). Same pop mechanism as CapTower. */
const CapDome: React.FC<{
  color: string;
  count?: number;
  colors?: string[];
  lift?: number;
  popFrame?: number;
  popDur?: number;
  frame: number;
}> = ({ color, count = 1, colors, lift = 0, popFrame, popDur = 8, frame }) => {
  const stack = colors && colors.length > 0 ? colors : Array.from({ length: Math.max(1, count) }, () => color);
  const n = stack.length;
  const popping = popFrame !== undefined && frame >= popFrame && frame < popFrame + popDur;
  const staticCount = popFrame !== undefined && frame < popFrame + popDur ? n - 1 : n;
  return (
    <group position={[0, 0.42 + lift, -0.04]}>
      {stack.slice(0, Math.max(0, staticCount)).map((c, i) => (
        <group key={i} position={[0, i * CAP_DOME_STEP, 0]} rotation={[0, 0, (((i * 29) % 5) - 2) * DEG]}>
          <DomeCap color={c} />
        </group>
      ))}
      {popping &&
        (() => {
          const i = n - 1;
          const pr = (frame - (popFrame as number)) / popDur;
          const yOff = (1 - pr * pr) * 5.5;
          const sc = 0.55 + 0.45 * pr;
          return (
            <group position={[0, i * CAP_DOME_STEP + yOff, 0]} scale={[sc, sc, sc]}>
              <DomeCap color={stack[i]} />
            </group>
          );
        })()}
    </group>
  );
};

/** Twin's white winter hat (ref S13/S25): beanie dome + folded band, NO pompom,
 *  with ear flaps hanging beside the cheeks down to the jaw. The plain 'beanie'
 *  accessory has a pompom and no flaps, so it does not match the reference. */
const Ushanka: React.FC<{ color: string; secondary: string }> = ({ color, secondary }) => (
  <group>
    <mesh position={[0, 0.44, -0.03]} scale={[1.0, 0.9, 1.02]} castShadow>
      <sphereGeometry args={[0.8, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={color} roughness={0.85} side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[0, 0.48, -0.03]} castShadow>
      <cylinderGeometry args={[0.82, 0.82, 0.28, 28]} />
      <meshStandardMaterial color={secondary} roughness={0.85} />
    </mesh>
    {[-1, 1].map((sd) => (
      <RoundedBox
        key={sd}
        position={[sd * 0.76, -0.12, 0.02]}
        rotation={[0, 0, sd * -0.1]}
        args={[0.2, 0.78, 0.56]}
        radius={0.08}
        castShadow
      >
        <meshStandardMaterial color={color} roughness={0.85} />
      </RoundedBox>
    ))}
    <RoundedBox position={[0, -0.08, -0.62]} args={[0.95, 0.7, 0.18]} radius={0.08} castShadow>
      <meshStandardMaterial color={color} roughness={0.85} />
    </RoundedBox>
  </group>
);

/** Hero's black balaclava (ref S33/S36/S40): black cover over the whole head except
 *  a horizontal eye slit, so the drawn eyes/brows still show through. Built from a
 *  crown dome + a back/side wrap + a forehead band + a lower face mask; the open
 *  wedge in front (theta +/-0.61 rad) is the slit. No 'balaclava' accessory existed. */
const Balaclava: React.FC<{ color: string }> = ({ color }) => (
  <group>
    <mesh position={[0, 0.42, -0.03]} scale={[1.0, 0.95, 1.02]} castShadow>
      <sphereGeometry args={[0.68, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
    </mesh>
    {/* back + sides: everything except the ~70 deg front wedge (theta 0 = +Z front) */}
    <mesh position={[0, 0, -0.03]}>
      <cylinderGeometry args={[0.67, 0.67, 1.0, 28, 1, true, 0.61, Math.PI * 2 - 1.22]} />
      <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
    </mesh>
    {/* forehead band above the eyes (bottom edge y = +0.16) */}
    <mesh position={[0, 0.33, -0.03]}>
      <cylinderGeometry args={[0.67, 0.67, 0.34, 28, 1, true, -0.61, 1.22]} />
      <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
    </mesh>
    {/* lower face mask below the eyes (top edge y = -0.02) */}
    <mesh position={[0, -0.285, -0.03]}>
      <cylinderGeometry args={[0.67, 0.67, 0.53, 28, 1, true, -0.61, 1.22]} />
      <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
    </mesh>
  </group>
);

export const HeadAccessory: React.FC<{ spec: AccessorySpec; frame?: number }> = ({ spec, frame = 0 }) => {
  const defaults: Record<string, [string, string]> = {
    cap: ['#DC2626', '#F8FAFC'],
    backwardsCap: ['#2563EB', '#F8FAFC'],
    beanie: ['#334155', '#64748B'],
    glasses: ['#18181B', '#18181B'],
    sunglasses: ['#0A0A0A', '#0A0A0A'],
    headphones: ['#18181B', '#38BDF8'],
    bow: ['#EC4899', '#EC4899'],
    crown: ['#FACC15', '#FACC15'],
    cap_tower: ['#EA580C', '#EA580C'],
    cap_dome: ['#EA580C', '#EA580C'],
    ushanka: ['#F8FAFC', '#E2E8F0'],
    balaclava: ['#18181B', '#18181B'],
  };
  const [d1, d2] = defaults[spec.type] ?? ['#888888', '#FFFFFF'];
  const color = resolveColor(spec.color, d1);
  const secondary = resolveColor(spec.secondary, spec.color && spec.type !== 'cap' && spec.type !== 'backwardsCap' ? color : d2);

  switch (spec.type) {
    case 'cap':
      return <Cap color={color} secondary={secondary} />;
    case 'backwardsCap':
      return <Cap color={color} secondary={secondary} backwards />;
    case 'beanie':
      return <Beanie color={color} secondary={spec.secondary ? secondary : new THREE.Color(color).multiplyScalar(0.75).getStyle()} />;
    case 'cap_tower':
      return <CapTower count={spec.count ?? 1} lean={spec.lean ?? 0} tiltTop={spec.tiltTop ?? 0} popFrame={spec.popFrame} popDur={spec.popDur ?? 8} frame={frame} />;
    case 'cap_dome':
      return (
        <CapDome
          color={color}
          count={spec.count ?? 1}
          colors={spec.colors ? spec.colors.map((c) => resolveColor(c)) : undefined}
          lift={spec.lift ?? 0}
          popFrame={spec.popFrame}
          popDur={spec.popDur ?? 8}
          frame={frame}
        />
      );
    case 'ushanka':
      return <Ushanka color={color} secondary={spec.secondary ? secondary : new THREE.Color(color).multiplyScalar(0.75).getStyle()} />;
    case 'balaclava':
      return <Balaclava color={color} />;
    case 'glasses':
      return <Glasses color={color} />;
    case 'sunglasses':
      return <Glasses color={color} dark />;
    case 'headphones':
      return <Headphones color={color} secondary={secondary} />;
    case 'bow':
      return <Bow color={color} />;
    case 'crown':
      return <Crown color={color} />;
    default:
      return null;
  }
};

/** True when the accessory sits on top of the head (hair gets flattened under it). */
export function isHat(spec: AccessorySpec): boolean {
  return spec.type === 'cap' || spec.type === 'backwardsCap' || spec.type === 'beanie' || spec.type === 'cap_tower' || spec.type === 'cap_dome' || spec.type === 'ushanka' || spec.type === 'balaclava';
}

export const FacialHairMesh: React.FC<{ type: FacialHair; color: string }> = ({ type, color }) => {
  if (type === 'mustache') {
    return (
      <group position={[0, -0.08, 0.64]}>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.14, 0, 0]} rotation={[0, 0, s * -0.25]} scale={[1.2, 0.65, 0.6]} castShadow>
            <sphereGeometry args={[0.16, 12, 10]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        ))}
      </group>
    );
  }
  if (type === 'beard') {
    return (
      <group>
        {/* jaw wrap */}
        <mesh position={[0, -0.44, 0]}>
          <cylinderGeometry args={[0.65, 0.58, 0.26, 28, 1, true, -Math.PI * 0.5, Math.PI]} />
          <meshStandardMaterial color={color} roughness={0.85} side={THREE.DoubleSide} />
        </mesh>
        {/* chin */}
        <mesh position={[0, -0.52, 0.46]} scale={[1.25, 0.6, 0.7]} castShadow>
          <sphereGeometry args={[0.24, 14, 10]} />
          <meshStandardMaterial color={color} roughness={0.85} />
        </mesh>
        {/* mustache */}
        <group position={[0, -0.04, 0.63]}>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.12, 0, 0]} rotation={[0, 0, s * -0.2]} scale={[1.1, 0.42, 0.45]}>
              <sphereGeometry args={[0.15, 12, 10]} />
              <meshStandardMaterial color={color} roughness={0.85} />
            </mesh>
          ))}
        </group>
      </group>
    );
  }
  return null; // stubble is painted on the face texture
};
