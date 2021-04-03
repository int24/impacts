import { Bounds, Vector } from '../src'

test('translate bounds', () => {
    const bounds = new Bounds(-100, -100, 100, 100)
    const translations = new Vector(100, 100)
    bounds.translate(translations)
    expect(bounds.min.x).toBe(0)
    expect(bounds.min.y).toBe(0)
    expect(bounds.max.x).toBe(200)
    expect(bounds.max.y).toBe(200)
})

test('move bounds center', () => {
    const bounds = new Bounds(-100, -100, 100, 100)
    const center = new Vector(100, 100)
    bounds.move(center)
    expect(bounds.min.x).toBe(0)
    expect(bounds.min.y).toBe(0)
    expect(bounds.max.x).toBe(200)
    expect(bounds.max.y).toBe(200)
})

test('bounds contains point', () => {
    const bounds = new Bounds(-100, -100, 100, 100)
    const point1 = new Vector(0, 0)
    const point2 = new Vector(200, 200)
    expect(bounds.contains(point1)).toBe(true)
    expect(bounds.contains(point2)).toBe(false)
})

test('bounds overlaps bounds', () => {
    const bounds1 = new Bounds(-100, -100, 100, 100)
    const bounds2 = new Bounds(-50, -50, 50, 50)
    const bounds3 = new Bounds(-400, -400, -200, -200)
    expect(bounds1.overlaps(bounds2)).toBe(true)
    expect(bounds1.overlaps(bounds3)).toBe(false)
})
