import { Vector } from './vector'

export class Vertices {
    public set: Vector[] = []

    constructor(points?: Vector[]) {
        if (points) this.set.push(...points)
    }

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

    public mean(): Vector {
        const length = this.set.length
        const mean = new Vector(0, 0)

        for (const vertex of this.set) {
            mean.add(vertex)
        }

        return mean.div(length)
    }

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
