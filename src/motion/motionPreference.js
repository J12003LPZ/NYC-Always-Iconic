export const MOTION_PREFERENCES = ['full', 'system', 'reduce']

export function resolveMotionPreference(search = typeof window !== 'undefined' ? window.location.search : '') {
  const requested = new URLSearchParams(search).get('motion')
  return MOTION_PREFERENCES.includes(requested) ? requested : 'full'
}

export function shouldReduceMotion(preference, systemReducedMotion = false) {
  return preference === 'reduce' || (preference === 'system' && Boolean(systemReducedMotion))
}

export function applyMotionPreference(root, preference) {
  if (!root) return
  root.classList.toggle('motion-forced', preference === 'full')
  root.classList.toggle('motion-reduced', preference === 'reduce')
  root.dataset.motionPreference = preference
}
