export class Vector {
    constructor(public x: number, public y: number) {}

    public set(vector: Vector): this {
        this.x = vector.x
        this.y = vector.y
        return this
    }

    public translate(vector: Vector): this {
        const sum = this.add(vector)
        this.x = sum.x
        this.y = sum.y
        return this
    }

    public clone(): Vector {
        return new Vector(this.x, this.y)
    }

    public magnitude(): number {
        return Math.sqrt(this.magnitudeSquared())
    }

    public magnitudeSquared(): number {
        return this.x * this.x + this.y * this.y
    }

    public rotate(angle: number): Vector {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return new Vector(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        )
    }

    public rotateAbout(angle: number, point: Vector): Vector {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return new Vector(
            point.x + ((this.x - point.x) * cos - (this.y - point.y) * sin),
            point.y + ((this.x - point.x) * sin + (this.y - point.y) * cos)
        )
    }

    public normalize(): Vector {
        const magnitude = this.magnitude()
        if (magnitude === 0) return new Vector(0, 0)
        return new Vector(this.x / magnitude, this.y / magnitude)
    }

    public dot(a: Vector): number {
        return this.x * a.x + this.y * a.y
    }

    public cross(a: Vector): number {
        return this.x * a.y + this.y * a.x
    }

    public cross3(a: Vector, b: Vector): number {
        return (a.x - this.x) * (b.y - this.y) - (a.y - this.y) * (b.x - this.x)
    }

    public add(a: Vector): Vector {
        return new Vector(this.x + a.x, this.y + a.y)
    }

    public sub(a: Vector): Vector {
        return new Vector(this.x - a.x, this.y - a.y)
    }

    public mult(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    public div(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar)
    }

    public perp(negate: boolean): Vector {
        const n = negate ? -1 : 1
        return new Vector(n * -this.y, n * this.x)
    }

    public neg(): Vector {
        return new Vector(-this.x, -this.y)
    }

    public angle(to: Vector): number {
        return Math.atan2(to.y - this.y, to.x - this.x)
    }
}
