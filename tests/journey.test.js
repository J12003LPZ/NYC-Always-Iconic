import { describe, it, expect } from 'vitest'
import { stops, legs } from '../src/data/journey'

describe('stops', () => {
  it('has exactly 5 stops in the required order', () => {
    expect(stops.map(s => s.id)).toEqual([
      'brooklyn', 'liberty', 'central-park', 'times-square', 'empire-state',
    ])
  })
  it('numbers stops 01 through 05', () => {
    expect(stops.map(s => s.number)).toEqual(['01', '02', '03', '04', '05'])
  })
  it('every stop has a unique animation concept', () => {
    const concepts = stops.map(s => s.concept)
    expect(new Set(concepts).size).toBe(stops.length)
  })
  it('every stop contains only runtime display fields', () => {
    for (const s of stops) {
      expect(Object.keys(s).sort()).toEqual([
        'accent', 'align', 'concept', 'coordinates', 'cta', 'description', 'id',
        'location', 'name', 'neighborhood', 'number', 'quote', 'timing', 'video',
      ])
      expect(Object.values(s).every(Boolean), s.id).toBe(true)
    }
  })
})

describe('legs', () => {
  it('has 4 legs chaining the 5 stops in order', () => {
    expect(legs).toHaveLength(4)
    legs.forEach((leg, i) => {
      expect(Object.keys(leg).sort()).toEqual(['from', 'headline', 'to'])
      expect(leg.from).toBe(stops[i].name)
      expect(leg.to).toBe(stops[i + 1].name)
      expect(leg.headline).toBeTruthy()
    })
  })
})
