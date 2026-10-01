import { useReducedMotion } from 'framer-motion'
import { resolveMotionPreference, shouldReduceMotion } from './motionPreference'

export function useSiteReducedMotion() {
  const systemReducedMotion = useReducedMotion()
  const preference = resolveMotionPreference()
  return shouldReduceMotion(preference, systemReducedMotion)
}
