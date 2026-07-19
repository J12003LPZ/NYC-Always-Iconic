import { describe, it, expect } from 'vitest'
import * as motionSystem from '../src/motion/motionSystem'

const { clamp01, EASE_CINEMATIC, SPRING_SCROLL } = motionSystem

describe('clamp01', () => {
  it('clamps below, inside, above', () => {
    expect(clamp01(-2)).toBe(0)
    expect(clamp01(0.4)).toBe(0.4)
    expect(clamp01(9)).toBe(1)
  })
})

describe('public API', () => {
  it('does not export dead easing or test-only helpers', () => {
    expect(motionSystem).not.toHaveProperty('EASE_TRAVEL')
    expect(motionSystem).not.toHaveProperty('segmentProgress')
    expect(motionSystem).not.toHaveProperty('parseCoords')
  })
})

describe('constants', () => {
  it('exports the shared easing and spring', () => {
    expect(EASE_CINEMATIC).toEqual([0.16, 1, 0.3, 1])
    expect(SPRING_SCROLL.stiffness).toBe(70)
  })
})
