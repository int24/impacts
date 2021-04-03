import { Vector } from './vector'
import type { Vertices } from './vertices'

/**
 * A set of axes (or vectors) with utility methods to manipulate them.
 */
export class Axes {
    public set: Vector[] = []

    /**
     * Create an axis set from the provided axes.
     */
    constructor(axes?: Vector[]) {
        if (axes) this.set.push(...axes)
    }

    /**
     * Rotate this axis set in-place.
     */
    public rotate(angle: number): this {
        if (angle === 0) return this

        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        for (const axis of this.set) {
            axis.x = axis.x * cos - axis.y * sin
            axis.y = axis.x * sin + axis.y * cos
        }

        return this
    }

    /**
     * Create an axis set from a vertex set.
     */
    static fromVertices(vertices: Vertices): Axes {
        const set = vertices.set
        const length = set.length
        const axesMap: Record<string, Vector> = {}

        for (let i = 0; i < length; i++) {
            const j = (i + 1) % length
            const xDiff = set[i].x - set[j].x
            const yDiff = set[j].y - set[i].y
            const vector = new Vector(yDiff, xDiff)
            const gradient = vector.y === 0 ? Infinity : vector.x / vector.y
            axesMap[gradient.toFixed(3)] = vector
        }

        const axes = Object.values(axesMap).map(a => a)

        return new Axes(axes)
    }
}
