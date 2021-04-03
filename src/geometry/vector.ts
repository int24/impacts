/**
 * A basic 2D vector, the basis of all geometry.
 */
export class Vector {
    /**
     * Create a 2D vector.
     */
    constructor(public x: number, public y: number) {}

    /**
     * Copy a vector's properties to this vector.
     */
    public set(vector: Vector): this {
        this.x = vector.x
        this.y = vector.y
        return this
    }

    /**
     * Translate this vector along a given translation vector.
     */
    public translate(vector: Vector): this {
        const sum = this.add(vector)
        this.x = sum.x
        this.y = sum.y
        return this
    }

    /**
     * Create a copy of this vector.
     */
    public clone(): Vector {
        return new Vector(this.x, this.y)
    }

    /**
     * Get the length of this vector.
     */
    public magnitude(): number {
        return Math.sqrt(this.magnitudeSquared())
    }

    /**
     * Get the squared length of this vector.
     */
    public magnitudeSquared(): number {
        return this.x * this.x + this.y * this.y
    }

    /**
     * Rotates this vector about the center by the specified angle.
     */
    public rotate(angle: number): Vector {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return new Vector(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        )
    }

    /**
     * Rotates this vector about a point be the specified angle.
     */
    public rotateAbout(angle: number, point: Vector): Vector {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return new Vector(
            point.x + ((this.x - point.x) * cos - (this.y - point.y) * sin),
            point.y + ((this.x - point.x) * sin + (this.y - point.y) * cos)
        )
    }

    /**
     * Normalize this vector so that the magnitude is `1`.
     */
    public normalize(): Vector {
        const magnitude = this.magnitude()
        if (magnitude === 0) return new Vector(0, 0)
        return new Vector(this.x / magnitude, this.y / magnitude)
    }

    /**
     * Get the dot product of this vector and another vector.
     */
    public dot(a: Vector): number {
        return this.x * a.x + this.y * a.y
    }

    /**
     * Get the cross product of this vector and another vector.
     */
    public cross(a: Vector): number {
        return this.x * a.y + this.y * a.x
    }

    /**
     * Get the 3D cross product of this vector and two other vectors.
     */
    public cross3(a: Vector, b: Vector): number {
        return (a.x - this.x) * (b.y - this.y) - (a.y - this.y) * (b.x - this.x)
    }

    /**
     * Add a vector to this vector.
     */
    public add(a: Vector): Vector {
        return new Vector(this.x + a.x, this.y + a.y)
    }

    /**
     * Subtrace a vector from this vector.
     */
    public sub(a: Vector): Vector {
        return new Vector(this.x - a.x, this.y - a.y)
    }

    /**
     * Multiply this vector by the prorivded scalar.
     */
    public mult(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    /**
     * Divide this vector by the prorivded scalar.
     */
    public div(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar)
    }

    /**
     * Returns a vector perpendicular to this vector.
     *
     * @param negate - If `true`, returns the opposite vector to the perpendicular vector
     */
    public perp(negate: boolean): Vector {
        const n = negate ? -1 : 1
        return new Vector(n * -this.y, n * this.x)
    }

    /**
     * Returns a opposite vector to this vector.
     */
    public neg(): Vector {
        return new Vector(-this.x, -this.y)
    }

    /**
     * Get the angle (in radians) from this vector to another vector.
     */
    public angle(to: Vector): number {
        return Math.atan2(to.y - this.y, to.x - this.x)
    }
}
