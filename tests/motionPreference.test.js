import { describe, expect, it } from 'vitest'
import { resolveMotionPreference, shouldReduceMotion } from '../src/motion/motionPreference'

describe('motion preference', () => {
  it('defaults the production URL to full motion', () => {
    expect(resolveMotionPreference('')).toBe('full')
    expect(resolveMotionPreference('?foo=bar')).toBe('full')
  })

  it('supports explicit full, system, and reduce modes', () => {
    expect(resolveMotionPreference('?motion=full')).toBe('full')
    expect(resolveMotionPreference('?motion=system')).toBe('system')
    expect(resolveMotionPreference('?motion=reduce')).toBe('reduce')
  })

  it('only follows the OS reduced-motion setting in system mode', () => {
    expect(shouldReduceMotion('full', true)).toBe(false)
    expect(shouldReduceMotion('system', true)).toBe(true)
    expect(shouldReduceMotion('system', false)).toBe(false)
    expect(shouldReduceMotion('reduce', false)).toBe(true)
  })
})
