import { Vector } from './vector'

/**
 * Represents an axis-aligned bounding body (AABB).
 */
export class Bounds {
    public min: Vector
    public max: Vector

    /**
     * Creating an axis-aligned bounding body from the given
     * minimum and maximum values.
     */
    constructor(minX: number, minY: number, maxX: number, maxY: number) {
        this.min = new Vector(minX, minY)
        this.max = new Vector(maxX, maxY)
    }

    /**
     * Translate this bounding body along a given translation vector.
     */
    public translate(vector: Vector): this {
        this.min.set(this.min.add(vector))
        this.max.set(this.max.add(vector))
        return this
    }

    /**
     * Move the center of this bounding body to a new point or vector.
     */
    public move(center: Vector): this {
        const width = this.max.x - this.min.x
        const height = this.max.y - this.min.y
        this.min.x = center.x - width / 2
        this.min.y = center.y - height / 2
        this.max.x = center.x + width / 2
        this.max.y = center.y + height / 2
        return this
    }

    /**
     * Check if this bounding body contains a point or vector.
     */
    public contains(point: Vector): boolean {
        return (
            point.x >= this.min.x &&
            point.x <= this.max.x &&
            point.y >= this.min.y &&
            point.y <= this.max.y
        )
    }

    /**
     * Check if this bounding body overlays another bounding body.
     */
    public overlaps(bounds: Bounds): boolean {
        return (
            this.min.x <= bounds.max.x &&
            this.max.x >= bounds.min.x &&
            this.max.y >= bounds.min.y &&
            this.min.y <= bounds.max.y
        )
    }
}
