import { useCallback, useRef } from 'react'

const MAX_X = 9
const MAX_Y = 11

/**
 * Subtle 3D tilt on pointer move — CSS variables --tilt-x / --tilt-y on the element.
 */
export function useTilt() {
  const ref = useRef(null)

  const onPointerMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--tilt-x', `${(-py * MAX_X).toFixed(3)}deg`)
    el.style.setProperty('--tilt-y', `${(px * MAX_Y).toFixed(3)}deg`)
  }, [])

  const onPointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}
