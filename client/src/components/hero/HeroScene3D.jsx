import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles, Stars, Line } from '@react-three/drei'
import * as THREE from 'three'

const ACCENT = '#e11d48'
const WIRE = '#3f3f48'

/** Fibonacci sphere — points on unit sphere */
function fibonacciSphere(n, radius) {
  const pts = []
  const golden = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < n; i++) {
    const t = i / golden
    const inc = Math.PI * (3 - Math.sqrt(5))
    const y = 1 - (i / (n - 1 || 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const phi = i * inc
    pts.push(new THREE.Vector3(Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius))
  }
  return pts
}

function NodeOrbit({ count = 14, radius = 3.1 }) {
  const ref = useRef(null)
  const nodes = useMemo(() => fibonacciSphere(count, radius), [count, radius])

  const ringLines = useMemo(() => {
    const segs = []
    for (let i = 0; i < count; i++) {
      const a = nodes[i]
      const b = nodes[(i + 3) % count]
      segs.push([a.toArray(), b.toArray()])
    }
    return segs
  }, [nodes, count])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.12
    ref.current.rotation.x += delta * 0.04
  })

  return (
    <group ref={ref}>
      {ringLines.map((pair, i) => (
        <Line
          key={i}
          points={pair.map((p) => new THREE.Vector3(...p))}
          color={i % 5 === 0 ? ACCENT : WIRE}
          lineWidth={i % 5 === 0 ? 1.2 : 0.6}
          transparent
          opacity={0.35 + (i % 7) * 0.04}
        />
      ))}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045 + (i % 3) * 0.012, 12, 12]} />
          <meshBasicMaterial color={i % 6 === 0 ? ACCENT : '#8b8b96'} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}

function CoreKnot() {
  const mesh = useRef(null)
  const mat = useRef(null)
  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.31
    mesh.current.rotation.y += delta * 0.22
    const pulse = 0.06 + Math.sin(state.clock.elapsedTime * 1.4) * 0.035
    if (mat.current) mat.current.emissiveIntensity = pulse
  })
  return (
    <mesh ref={mesh} scale={0.95}>
      <torusKnotGeometry args={[0.85, 0.22, 180, 24]} />
      <meshStandardMaterial
        ref={mat}
        color="#12121a"
        metalness={0.92}
        roughness={0.18}
        emissive={ACCENT}
        emissiveIntensity={0.08}
      />
    </mesh>
  )
}

function OrbitingSignal({ speed = 0.5, radius = 3.35, phase = 0 }) {
  const ref = useRef(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed + phase
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t * 1.3) * 0.35
    ref.current.rotation.x = t * 1.1
    ref.current.rotation.y = t * 0.85
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.13, 0.038, 12, 36]} />
      <meshStandardMaterial
        color={ACCENT}
        emissive={ACCENT}
        emissiveIntensity={0.55}
        metalness={1}
        roughness={0.12}
      />
    </mesh>
  )
}

function CounterOrbit({ speed = -0.42, radius = 2.85 }) {
  const ref = useRef(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed + 2.1
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.cos(t * 0.9) * 0.28
    ref.current.rotation.z = clock.elapsedTime * 0.6
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.11, 0]} />
      <meshStandardMaterial
        color="#d4d4dc"
        emissive={ACCENT}
        emissiveIntensity={0.12}
        metalness={0.88}
        roughness={0.22}
      />
    </mesh>
  )
}

function DistortOrb() {
  const ref = useRef(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.z = t * 0.15
  })
  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={ref} scale={1.65}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#0a0a10"
          emissive={ACCENT}
          emissiveIntensity={0.15}
          roughness={0.35}
          metalness={0.85}
          distort={0.42}
          speed={2.2}
        />
      </mesh>
    </Float>
  )
}

function WireShell() {
  const g = useRef(null)
  useFrame((_, delta) => {
    if (!g.current) return
    g.current.rotation.y -= delta * 0.05
  })
  return (
    <group ref={g}>
      <mesh>
        <icosahedronGeometry args={[2.55, 1]} />
        <meshBasicMaterial color={WIRE} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.62, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

function MouseRig({ children }) {
  const group = useRef(null)
  useFrame((state, delta) => {
    if (!group.current) return
    const { mouse } = state
    const tx = mouse.x * 0.55
    const ty = mouse.y * 0.38
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, tx, 0.04)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -ty, 0.04)
    group.current.rotation.y += delta * 0.03
  })
  return <group ref={group}>{children}</group>
}

export function HeroScene3D({ quality = 'high' }) {
  const sparkles = quality === 'low' ? 28 : 90
  const stars = quality === 'low' ? 400 : 1200

  return (
    <>
      <color attach="background" args={['#030304']} />
      <fog attach="fog" args={['#030304', 6, 18]} />

      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 6]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -3, 4]} intensity={0.65} color={ACCENT} />
      <spotLight position={[0, 8, 2]} angle={0.45} penumbra={0.9} intensity={0.55} color="#fafafa" />

      <MouseRig>
        <WireShell />
        <DistortOrb />
        <CoreKnot />
        {quality === 'high' && (
          <>
            <OrbitingSignal speed={0.48} radius={3.4} phase={0} />
            <OrbitingSignal speed={-0.41} radius={2.95} phase={1.7} />
            <CounterOrbit />
          </>
        )}
        <NodeOrbit count={quality === 'low' ? 10 : 16} />
        <Sparkles
          count={sparkles}
          scale={7}
          size={1.8}
          speed={0.35}
          color={ACCENT}
          opacity={0.5}
        />
      </MouseRig>

      <Stars radius={42} depth={36} count={stars} factor={3.2} saturation={0} fade speed={0.35} />
    </>
  )
}
