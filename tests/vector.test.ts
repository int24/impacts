import { Vector } from '../src'

test('rotate vector', () => {
    new Vector(100, 100).rotate(0.5)
})

test('rotate vector about point', () => {
    new Vector(100, 100).rotateAbout(0.5, new Vector(50, 50))
})

test('normalize vector', () => {
    new Vector(100, 100).normalize()
})

test('dot product of vectors', () => {
    new Vector(100, 100).dot(new Vector(50, 50))
})

test('cross product of vectors', () => {
    new Vector(100, 100).cross(new Vector(50, 50))
})

test('cross product of 3d vectors', () => {
    new Vector(100, 100).cross3(new Vector(50, 50), new Vector(20, 20))
})

test('sum of vectors', () => {
    const vector1 = new Vector(100, 100)
    const vector2 = new Vector(50, 50)
    const sum = vector1.add(vector2)
    expect(sum.x).toBe(vector1.x + vector2.x)
    expect(sum.y).toBe(vector1.y + vector2.y)
})

test('difference of vectors', () => {
    const vector1 = new Vector(100, 100)
    const vector2 = new Vector(50, 50)
    const difference = vector1.sub(vector2)
    expect(difference.x).toBe(vector1.x - vector2.x)
    expect(difference.y).toBe(vector1.y - vector2.y)
})

test('product of vectors', () => {
    const scalar = 5
    const vector = new Vector(100, 100)
    const product = vector.mult(scalar)
    expect(product.x).toBe(vector.x * scalar)
    expect(product.y).toBe(vector.y * scalar)
})

test('quotient of vectors', () => {
    const scalar = 5
    const vector = new Vector(100, 100)
    const product = vector.div(scalar)
    expect(product.x).toBe(vector.x / scalar)
    expect(product.y).toBe(vector.y / scalar)
})

test('perpendicular of vector', () => {
    const vector1 = new Vector(100, 100)
    vector1.perp(false)
    vector1.perp(true)
})

test('negate vector', () => {
    new Vector(100, 100).neg()
})

test('angle between vectors', () => {
    const vector1 = new Vector(100, 100)
    const vector2 = new Vector(50, 50)
    vector1.angle(vector2)
})
