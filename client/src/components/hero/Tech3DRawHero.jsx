import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { HERO_TECH_STACK } from '../../data/heroTechStack'

function disposeScene(root) {
  const geometries = new Set()
  const materials = new Set()
  root.traverse((obj) => {
    if (obj.geometry) geometries.add(obj.geometry)
    const mat = obj.material
    if (!mat) return
    const list = Array.isArray(mat) ? mat : [mat]
    list.forEach((m) => materials.add(m))
  })
  geometries.forEach((g) => g.dispose())
  materials.forEach((m) => {
    if (m.map) m.map.dispose()
    m.dispose?.()
  })
}

function drawSpriteCanvasPill(ctx, size) {
  const x = 8
  const y = 8
  const w = size - 16
  const h = size - 16
  const r = 22
  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = 'rgba(12,12,16,0.92)'
  ctx.strokeStyle = 'rgba(246,196,83,0.92)'
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

function makeFallbackLabelTexture(label) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }
  drawSpriteCanvasPill(ctx, size)
  ctx.fillStyle = '#e4e4e7'
  ctx.font = '600 26px system-ui, Segoe UI, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const text = label.length > 11 ? `${label.slice(0, 10)}…` : label
  ctx.fillText(text, size / 2, size / 2)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeGhlTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return makeFallbackLabelTexture('GHL')
  drawSpriteCanvasPill(ctx, size)
  ctx.fillStyle = '#d4d4d8'
  ctx.font = '800 52px system-ui, Segoe UI, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('GHL', size / 2, size / 2)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function loadIconTexture(loader, item) {
  return new Promise((resolve) => {
    if (item.custom) {
      resolve(makeGhlTexture())
      return
    }

    const hex = item.color.replace('#', '')
    const url = `https://cdn.simpleicons.org/${item.siSlug}/${hex}`

    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        const img = tex.image
        const canvas = document.createElement('canvas')
        const size = 256
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          tex.dispose()
          resolve(makeFallbackLabelTexture(item.label))
          return
        }
        drawSpriteCanvasPill(ctx, size)
        const iw = img.naturalWidth || img.width || 24
        const ih = img.naturalHeight || img.height || 24
        const pad = 52
        const maxSide = size - pad * 2
        const scale = Math.min(maxSide / iw, maxSide / ih, 1)
        const dw = iw * scale
        const dh = ih * scale
        const ox = (size - dw) / 2
        const oy = (size - dh) / 2
        ctx.drawImage(img, ox, oy, dw, dh)
        tex.dispose()
        const composed = new THREE.CanvasTexture(canvas)
        composed.colorSpace = THREE.SRGBColorSpace
        resolve(composed)
      },
      undefined,
      () => resolve(makeFallbackLabelTexture(item.label))
    )
  })
}

/**
 * Raw Three.js hero: orbiting tech logos (same stack as HeroTechLogos) + core.
 */
export function Tech3DRawHero({ lowPower = false }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let cancelled = false
    let disposeFn = null
    const torusCount = lowPower ? 5 : 10
    const dprCap = lowPower ? 1.25 : 2
    const stack = HERO_TECH_STACK

    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')

    Promise.all(stack.map((item) => loadIconTexture(loader, item))).then((textures) => {
      if (cancelled) {
        textures.forEach((t) => t.dispose())
        return
      }

      const scene = new THREE.Scene()
      scene.fog = new THREE.Fog(0x050505, 9, 18)

      const camera = new THREE.PerspectiveCamera(
        45,
        mount.clientWidth / Math.max(mount.clientHeight, 1),
        0.1,
        100
      )
      camera.position.set(0, 1.2, 7.85)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap))
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      mount.appendChild(renderer.domElement)

      const group = new THREE.Group()
      scene.add(group)

      scene.add(new THREE.AmbientLight(0xffffff, 0.7))

      const key = new THREE.PointLight(0xff4d4d, 18, 30, 2)
      key.position.set(2, 4, 4)
      scene.add(key)

      const rim = new THREE.PointLight(0xf6c453, 10, 25, 2)
      rim.position.set(-4, -1, 3)
      scene.add(rim)

      const fill = new THREE.PointLight(0x66aaff, 7, 20, 2)
      fill.position.set(0, 3, -5)
      scene.add(fill)

      const baseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x101114,
        metalness: 0.8,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        emissive: 0x120303,
      })

      const redMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xd61f3b,
        metalness: 0.55,
        roughness: 0.25,
        emissive: 0x49040f,
        emissiveIntensity: 1.1,
      })

      const goldMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xf6c453,
        metalness: 0.75,
        roughness: 0.25,
        emissive: 0x3a2600,
        emissiveIntensity: 0.5,
      })

      const platform = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 3.2, 0.45, lowPower ? 48 : 64),
        new THREE.MeshPhysicalMaterial({
          color: 0x090909,
          metalness: 0.9,
          roughness: 0.22,
          clearcoat: 1,
          emissive: 0x21070a,
          emissiveIntensity: 0.45,
        })
      )
      platform.position.y = -2.2
      group.add(platform)

      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.06, 20, 100), goldMaterial)
      ring.rotation.x = Math.PI / 2
      ring.position.y = -1.92
      group.add(ring)

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.15, 0),
        new THREE.MeshPhysicalMaterial({
          color: 0x111318,
          metalness: 0.55,
          roughness: 0.12,
          transmission: 0.05,
          emissive: 0x14070a,
        })
      )
      core.position.y = -0.2
      group.add(core)

      const orbitGroup = new THREE.Group()
      group.add(orbitGroup)

      const nodeMeshes = []
      const n = stack.length

      function makeLogoSprite(map) {
        const material = new THREE.SpriteMaterial({ map, transparent: true })
        const sprite = new THREE.Sprite(material)
        const s = lowPower ? 0.48 : 0.56
        sprite.scale.set(s, s, 1)
        return sprite
      }

      textures.forEach((map, index) => {
        const holder = new THREE.Group()
        const angle = (index / n) * Math.PI * 2
        const radius = 2.55 + (index % 3) * 0.24
        const y = -0.55 + (index % 5) * 0.26
        holder.userData.baseY = y

        const segs = lowPower ? 24 : 32
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, segs, segs),
          index % 2 === 0 ? redMaterial : goldMaterial
        )
        holder.add(orb)

        const arm = new THREE.Mesh(
          new THREE.CylinderGeometry(0.022, 0.022, 1.05, lowPower ? 12 : 16),
          baseMaterial
        )
        arm.position.y = -0.55
        holder.add(arm)

        const labelSprite = makeLogoSprite(map)
        labelSprite.position.y = 0.52
        holder.add(labelSprite)

        holder.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
        orbitGroup.add(holder)
        nodeMeshes.push(holder)
      })

      const linesMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x2b2d35,
        emissive: 0x35070b,
        emissiveIntensity: 0.6,
        metalness: 0.85,
        roughness: 0.28,
      })

      for (let i = 0; i < torusCount; i++) {
        const tube = new THREE.Mesh(
          new THREE.TorusGeometry(1.65 + i * 0.13, 0.018, 12, lowPower ? 64 : 100),
          i % 2 === 0 ? linesMaterial : redMaterial
        )
        tube.rotation.x = Math.PI / 2.2 + i * 0.08
        tube.rotation.y = i * 0.28
        tube.position.y = -0.35 + i * 0.03
        tube.scale.setScalar(1 - i * 0.03)
        core.add(tube)
      }

      const glowPlane = new THREE.Mesh(
        new THREE.CircleGeometry(3.1, lowPower ? 48 : 64),
        new THREE.MeshBasicMaterial({
          color: 0xaa1b2b,
          transparent: true,
          opacity: 0.16,
        })
      )
      glowPlane.rotation.x = -Math.PI / 2
      glowPlane.position.y = -1.96
      group.add(glowPlane)

      const clock = new THREE.Clock()
      let frameId = 0

      const animate = () => {
        const t = clock.getElapsedTime()
        group.rotation.y = t * 0.22
        core.rotation.y = t * 0.4
        core.rotation.x = Math.sin(t * 0.7) * 0.08
        ring.rotation.z = t * 0.35
        platform.position.y = -2.2 + Math.sin(t * 1.15) * 0.03
        const gpMat = glowPlane.material
        if (gpMat && 'opacity' in gpMat) {
          gpMat.opacity = 0.12 + (Math.sin(t * 2) + 1) * 0.04
        }

        nodeMeshes.forEach((node, i) => {
          const baseY = node.userData.baseY ?? 0
          node.position.y = baseY + Math.sin(t * 1.4 + i) * 0.08
          node.rotation.y = -group.rotation.y + Math.sin(t + i) * 0.12
        })

        camera.position.x = Math.sin(t * 0.25) * 0.4
        camera.position.y = 1.2 + Math.sin(t * 0.4) * 0.08
        camera.lookAt(0, -0.15, 0)

        renderer.render(scene, camera)
        frameId = requestAnimationFrame(animate)
      }

      const handleResize = () => {
        if (!mount) return
        const w = mount.clientWidth
        const h = Math.max(mount.clientHeight, 1)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }

      window.addEventListener('resize', handleResize)
      animate()

      const cleanup = () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('resize', handleResize)
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement)
        }
        disposeScene(scene)
        renderer.dispose()
      }

      disposeFn = cleanup
      if (cancelled) {
        cleanup()
        disposeFn = null
      }
    })

    return () => {
      cancelled = true
      disposeFn?.()
      disposeFn = null
    }
  }, [lowPower])

  return <div ref={mountRef} className="h-full w-full min-h-[280px]" aria-hidden />
}
