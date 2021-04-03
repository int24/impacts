import { Vector } from './vector'

/**
 * A set of vertices (or vectors) with utility methods to manipulate them.
 */
export class Vertices {
    public set: Vector[] = []

    /**
     * Create a vertex set from the provided points or vectors.
     */
    constructor(points?: Vector[]) {
        if (points) this.set.push(...points)
    }

    /**
     * Get the center point or vector of this vertex set.
     */
    public center(): Vector {
        const set = this.set
        const area = this.area(true)
        const center = new Vector(0, 0)
        let temp = new Vector(0, 0)
        let cross = 0
        let j = 0

        for (let i = 0; i < set.length; i++) {
            j = (i + 1) % set.length
            cross = set[i].cross(set[j])
            temp = set[i].add(set[j]).mult(cross)
            center.add(temp)
        }

        return center.div(6 * area)
    }

    /**
     * Get the average point or vector of this vertex set.
     */
    public mean(): Vector {
        const length = this.set.length
        const mean = new Vector(0, 0)

        for (const vertex of this.set) {
            mean.add(vertex)
        }

        return mean.div(length)
    }

    /**
     * Get the area of this vertex set.
     *
     * @param signed - If `true`, will return the [signed area](https://proofwiki.org/wiki/Definition:Signed_Area).
     */
    public area(signed?: boolean): number {
        let area = 0
        let set = this.set
        let j = set.length - 1

        for (let i = 0; i < set.length; i++) {
            area += (set[j].x - set[i].x) * (set[j].y + set[i].y)
            j = i
        }

        if (signed) return area / 2

        return Math.abs(area) / 2
    }

    /**
     * Get the moment of inertia of this vertex set.
     */
    public inertia(mass: number): number {
        const set = this.set
        let numerator = 0
        let denominator = 0
        let cross = 0
        let j = 0

        for (let i = 0; i < set.length; i++) {
            j = (i + 1) % set.length
            cross = Math.abs(set[j].cross(set[i]))
            numerator +=
                cross *
                (set[j].dot(set[j]) + set[j].dot(set[i]) + set[i].dot(set[i]))
            denominator += cross
        }

        return (mass / 6) * (numerator / denominator)
    }

    /**
     * Translates this vertex set in-place along a translation vector
     * and optional scalar.
     */
    public translate(translation: Vector, scalar?: number): this {
        if (scalar) {
            for (const vertex of this.set) {
                vertex.add(translation.mult(scalar))
            }
        } else {
            for (const vertex of this.set) {
                vertex.add(translation)
            }
        }

        return this
    }

    /**
     * Rotate this vertex set in-place about an point or vector.
     */
    public rotate(angle: number, point: Vector): this {
        if (angle === 0) return this

        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        for (const vertex of this.set) {
            const xDiff = vertex.x - point.x
            const yDiff = vertex.y - point.y
            vertex.x = point.x + (xDiff * cos - yDiff * sin)
            vertex.y = point.y + (xDiff * sin + yDiff * cos)
        }

        return this
    }

    /**
     * Scale this vertex set in-place from a point (default is center).
     */
    public scale(scale: Vector, point?: Vector): this {
        if (scale.x === 1 && scale.y === 1) return this

        point = point || this.center()

        for (const vertex of this.set) {
            const delta = vertex.sub(point)
            vertex.x = point.x + delta.x * scale.x
            vertex.y = point.y + delta.x * scale.y
        }

        return this
    }

    /**
     * Check if this vertex set contains a point or vector.
     */
    public contains(point: Vector): boolean {
        const set = this.set

        for (var i = 0; i < set.length; i++) {
            const vertex = set[i]
            const next = set[(i + 1) % set.length]
            const dX = (point.x - vertex.x) * (next.y - vertex.y)
            const dY = (point.y - vertex.y) * (vertex.x - next.x)
            if (dX + dY > 0) {
                return false
            }
        }

        return true
    }

    /**
     * Sort this vertex set in-place to clockwise order.
     */
    public sortClockwise(): this {
        const center = this.mean()

        this.set.sort((a, b) => {
            return center.angle(a) - center.angle(b)
        })

        return this
    }

    /**
     * Uses the chain-hull algorithm to calculate the convext hull of
     * this vertex as a set of vectors.
     */
    public computeConvexHull(): Vector[] {
        // uses the Chain Hull algorithm
        // http://geomalgorithms.com/a10-_hull-1.html

        const upper: Vector[] = []
        const lower: Vector[] = []
        const vertices = this.set.slice()

        vertices.sort((a, b) => {
            const xDiff = a.x - b.x
            const yDiff = a.y - b.y
            return xDiff || yDiff
        })

        for (const vertex of vertices) {
            while (
                lower.length >= 2 &&
                lower[lower.length - 2].cross3(lower[lower.length - 1], vertex)
            ) {
                lower.pop()
            }

            lower.push(vertex)
        }

        for (const vertex of vertices) {
            while (
                upper.length >= 2 &&
                upper[upper.length - 2].cross3(upper[upper.length - 1], vertex)
            ) {
                upper.pop()
            }

            upper.push(vertex)
        }

        upper.pop()
        lower.pop()

        return [...upper, ...lower]
    }

    /**
     * Check if this vertex set creates a convex polygon. Vertices must be
     * in clockwise order, so make sure to use `Vertices.sortClockwise()` before this.
     */
    public isConvex(): boolean | null {
        // http://paulbourke.net/geometry/polygonmesh/
        // Copyright (c) Paul Bourke (use permitted)

        const set = this.set
        const length = set.length
        let flags = 0
        let j = 0
        let k = 0
        let z = 0

        if (length < 3) return null

        for (let i = 0; i < length; i++) {
            j = (i + 1) % length
            k = (i + 2) % length
            z = (set[j].x - set[i].x) * (set[k].y - set[j].y)
            z -= (set[j].y - set[i].y) * (set[k].x - set[j].x)

            if (z < 0) flags |= 1
            else if (z > 0) flags |= 2

            if (flags === 3) return false
        }

        if (flags !== 0) return true

        return null
    }

    /**
     * Create a vertex set from a path. Paths are strings of ordered x y
     * pairs separated by spaces (ex: `100 30 40 50` or `L 100 30 L 40 50`)
     */
    static fromPath(path: string): Vertices {
        const pattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/gi
        const points: Vector[] = []

        path.replace(pattern, (match, x, y) => {
            points.push(new Vector(parseFloat(x), parseFloat(y)))
            return ''
        })

        return new Vertices(points)
    }
}
