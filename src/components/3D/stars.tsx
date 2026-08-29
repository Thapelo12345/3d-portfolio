import { useRef, useMemo } from 'react';

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface StarFieldProps {
  count?: number;
}

export default function Stars({ count = 5000 }: StarFieldProps) {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (seededRandom(i) - 0.5) * 1000;
    }
    return pos;
  }, [count]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* Passing [array, itemSize] directly into args resolves the TypeScript strictness */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xffffff}
        size={1}
        transparent={true}
        sizeAttenuation={true}
      />
    </points>
  );
}
