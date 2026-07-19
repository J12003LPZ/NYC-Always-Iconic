export const EASE_CINEMATIC = [0.16, 1, 0.3, 1]
export const SPRING_SCROLL = { stiffness: 70, damping: 25, mass: 0.4 }
export const SPRING_FLIGHT = { stiffness: 55, damping: 22, mass: 0.35 }

export function clamp01(v) {
  return Math.min(1, Math.max(0, v))
}
