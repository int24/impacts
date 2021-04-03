import { Vertices, Vector } from '../src'

const base = new Vertices([
    new Vector(-100, -100),
    new Vector(100, -100),
    new Vector(100, 100),
    new Vector(-100, 100)
])

test('clone vertices', () => {
    const cloned = base.clone()
    expect(cloned === base).toBe(false)
    expect(cloned.set === base.set).toBe(false)
    expect(cloned.set).not.toContain(base.set)
})

test('get center of vertices', () => {
    const vertices = base.clone()
    const center = vertices.center()
    expect(center.x).toBe(0)
    expect(center.y).toBe(0)
})

test('get mean of vertices', () => {
    const vertices = base.clone()
    const mean = vertices.mean()
    expect(mean.x).toBe(0)
    expect(mean.y).toBe(0)
})

test('get area of vertices', () => {
    const vertices = base.clone()
    const area = vertices.area()
    const signedArea = vertices.area(true)
    expect(area).toBe(200 * 200)
    expect(signedArea).toBe(200 * 200)
})

test('get moment intertia of vertices', () => {
    expect(base.clone().inertia(10)).toBe(NaN)
})

test('translate vertices', () => {
    const vertices1 = base.clone()
    const vertices2 = base.clone()
    const translation = new Vector(50, 50)
    const before1 = vertices1.clone()
    const before2 = vertices2.clone()

    vertices1.translate(translation)
    vertices2.translate(translation, 2)

    for (let i = 0; i < vertices1.set.length; i++) {
        const current = vertices1.set[i]
        const before = before1.set[i]
        expect(current).not.toBe(before)
        expect(current.x).toBe(before.x + translation.x)
        expect(current.y).toBe(before.y + translation.y)
    }

    for (let i = 0; i < vertices2.set.length; i++) {
        const current = vertices2.set[i]
        const before = before2.set[i]
        expect(current).not.toBe(before)
        expect(current.x).toBe(before.x + translation.x * 2)
        expect(current.y).toBe(before.y + translation.y * 2)
    }
})

test('scale vertices', () => {
    const vertices = base.clone()
    const expected = new Vertices([
        new Vector(-200, -200),
        new Vector(200, -200),
        new Vector(200, 200),
        new Vector(-200, 200)
    ])

    vertices.scale(new Vector(2, 2))

    for (let i = 0; i < vertices.set.length; i++) {
        const current = vertices.set[i]
        const before = expected.set[i]
        expect(current).not.toBe(before)
        expect(current.x).toBe(before.x)
        expect(current.y).toBe(before.y)
    }
})

test('check if vertices contain point', () => {
    const vertices = base.clone()
    const point1 = new Vector(0, 0)
    const point2 = new Vector(-200, -200)
    expect(vertices.contains(point1)).toBe(true)
    expect(vertices.contains(point2)).toBe(false)
})

test('sort vertices into clockwise order', () => {
    const inOrder = base.clone()
    const outOfOrder = new Vertices([
        inOrder.set[3].clone(),
        inOrder.set[1].clone(),
        inOrder.set[2].clone(),
        inOrder.set[0].clone()
    ])

    outOfOrder.sortClockwise()

    for (let i = 0; i < inOrder.set.length; i++) {
        const current = inOrder.set[i]
        const before = outOfOrder.set[i]
        expect(current).not.toBe(before)
        expect(current.x).toBe(before.x)
        expect(current.y).toBe(before.y)
    }
})

test('check if vertices are convex', () => {
    const convex = base.clone()
    const notConvex = new Vertices([
        new Vector(-100, -100),
        new Vector(0, 0),
        new Vector(100, -100),
        new Vector(100, 100),
        new Vector(-100, 100)
    ])

    expect(convex.isConvex()).toBe(true)
    expect(notConvex.isConvex()).toBe(false)
})

test('create from path', () => {
    const vertices = base.clone()
    const expected = Vertices.fromPath('-100 -100 100 -100 100 100 -100 100')

    for (let i = 0; i < vertices.set.length; i++) {
        const current = vertices.set[i]
        const before = expected.set[i]
        expect(current).not.toBe(before)
        expect(current.x).toBe(before.x)
        expect(current.y).toBe(before.y)
    }
})
