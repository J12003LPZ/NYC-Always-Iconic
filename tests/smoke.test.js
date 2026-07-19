import { describe, it, expect } from 'vitest'
import { moreDestinations } from '../src/data/destinations'

describe('existing data', () => {
  it('moreDestinations entries have required fields', () => {
    expect(moreDestinations.length).toBeGreaterThan(0)
    for (const d of moreDestinations) {
      expect(d).toHaveProperty('name')
      expect(d.video, `${d.name} needs a video`).toBeTruthy()
      expect(d).not.toHaveProperty('image')
      expect(d).toHaveProperty('className')
    }
  })
})
