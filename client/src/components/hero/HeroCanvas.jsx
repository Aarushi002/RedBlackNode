import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { HeroScene3D } from './HeroScene3D'

function Fallback() {
  return (
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(225,29,72,0.12),transparent_60%)]"
      aria-hidden
    />
  )
}

export function HeroCanvas({ quality = 'high' }) {
  const dpr = useMemo(() => (quality === 'low' ? [1, 1.25] : [1, 1.75]), [quality])

  return (
    <div className="absolute inset-0">
      <Suspense fallback={<Fallback />}>
        <Canvas
          className="h-full w-full touch-none"
          dpr={dpr}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          camera={{ position: [0, 0.2, 9.4], fov: 40, near: 0.1, far: 60 }}
        >
          <HeroScene3D quality={quality} />
        </Canvas>
      </Suspense>
      {/* Soft vignette + blend into page */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_55%,transparent_20%,#030304_85%)]"
        aria-hidden
      />
    </div>
  )
}
