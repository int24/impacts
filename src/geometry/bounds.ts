import { Vector } from './vector'

export class Bounds {
    public min: Vector
    public max: Vector

    constructor(minX: number, minY: number, maxX: number, maxY: number) {
        this.min = new Vector(minX, minY)
        this.max = new Vector(maxX, maxY)
    }

    public translate(vector: Vector): this {
        this.min.set(this.min.add(vector))
        this.max.set(this.max.add(vector))
        return this
    }

    public move(center: Vector): this {
        const width = this.max.x - this.min.x
        const height = this.max.y - this.min.y
        this.min.x = center.x - width / 2
        this.min.y = center.y - height / 2
        this.max.x = center.x + width / 2
        this.max.y = center.y + height / 2
        return this
    }

    public contains(point: Vector): boolean {
        return (
            point.x >= this.min.x &&
            point.x <= this.max.x &&
            point.y >= this.min.y &&
            point.y <= this.max.y
        )
    }

    public overlaps(bounds: Bounds): boolean {
        return (
            this.min.x <= bounds.max.x &&
            this.max.x >= bounds.min.x &&
            this.max.y >= bounds.min.y &&
            this.min.y <= bounds.max.y
        )
    }
}
