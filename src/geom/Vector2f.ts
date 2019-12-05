import {Point} from "./Point";

export class Vector2f {
    private _x: number;
    private _y: number;

    get x(): number {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    setVector2f(vec: Vector2f): void {
        this.x = vec.x;
        this.y = vec.y;
    }

    getAngela(): number {
        return -Math.atan2(this.y, this.x)
    }

    length(): number {
        return Math.sqrt(this.lengthSquared())
    }

    lengthSquared(): number {
        return this.x * this.x + this.y * this.y
    }

    distanceSquared(v: Vector2f): number {
        let dx: number = this.x - v.x;
        let dy: number = this.y - v.y;
        return dx * dx + dy * dy;
    }

    negate(): Vector2f {
        return new Vector2f(-this.x, -this.y);
    }

    negateLocal(): Vector2f {
        this.x -= this.x;
        this.y -= this.y;
        return this;
    }

    add(vec: Vector2f): Vector2f {
        if (null == vec) {
            return null;
        }
        return new Vector2f(this.x + vec.x, this.y + vec.y);
    }

    addLocal(vec: Vector2f): Vector2f {
        if (null == vec) {
            return null;
        }
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    subtract(vec: Vector2f): Vector2f {
        return new Vector2f(this.x - vec.x, this.y - vec.y);
    }

    subtractLocal(vec: Vector2f): Vector2f {
        if (null == vec) {
            return null;
        }
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    dot(vec: Vector2f): number {
        if (null == vec) {
            return 0;
        }
        return this.x * vec.x + this.y * vec.y;
    }

    mult(scalar: number): Vector2f {
        return new Vector2f(this.x * scalar, this.y * scalar);
    }

    multLocal(scalar: number): Vector2f {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    multLocalV(vec: Vector2f): Vector2f {
        if (null == vec) {

            return null;
        }
        this.x *= vec.x;
        this.y *= vec.y;
        return this;
    }

    multV(scalar: number, product: Vector2f): Vector2f {
        if (null == product) {
            product = new Vector2f();
        }

        product.x = this.x * scalar;
        product.y = this.y * scalar;
        return product;
    }

    divide(scalar: number): Vector2f {
        return new Vector2f(this.x / scalar, this.y / scalar);
    }

    divideLocal(scalar: number): Vector2f {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    normalize(): Vector2f {
        let length: number = this.length();
        if (length !== 0) {
            return this.divide(length);
        }
        return this.divide(1);
    }

    normalizeLocal(): Vector2f {
        let length: number = this.length();
        if (length !== 0) {
            return this.divideLocal(length);
        }

        return this.divideLocal(1);
    }

    smallestAngleBetween(otherVector: Vector2f): number {
        let dotProduct: number = this.dot(otherVector);
        return Math.acos(dotProduct);
    }

    angleBetween(otherVector: Vector2f): number {
        return Math.atan2(otherVector.y, otherVector.x) - Math.atan2(this.y, this.x);
    }

    /**
     * Sets this vector to the interpolation by changeAmnt from this to the
     * finalVec this=(1-changeAmnt)*this + changeAmnt * finalVec
     * 确定两个指定点之间的点。 参数 changeAmnt 确定新的内插点相对于参数 pt1 和 pt2 指定的两个端点所处的位置。
     * @param finalVec
     *            The final vector to interpolate towards
     * @param changeAmnt
     *            An amount between 0.0 - 1.0 representing a percentage change
     *            from this towards finalVec
     */
    interpolate(finalVec: Vector2f, changeAmnt: number): void {
        this.x = (1 - changeAmnt) * this.x + changeAmnt * finalVec.x;
        this.y = (1 - changeAmnt) * this.y + changeAmnt * finalVec.y;
    }

    zero(): void {
        this.x = this.y = 0;
    }

    toArray(v: Array<number>): Array<number> {
        if (v == null) {
            v = [];
        }
        v[0] = this.x;
        v[1] = this.y;
        return v;
    }

    rotateAroundOrigin(angle: number, cw: Boolean): void {
        if (cw)
            angle = -angle;

        let newX: number = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
        let newY: number = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
        this.x = newX;
        this.y = newY;
    }

    equals(vec: Vector2f, epsilon: number = 0.000001): Boolean {
        return Math.abs(this.x - vec.x) < epsilon && Math.abs(this.y - vec.y) < epsilon;
    }

    clone(): Vector2f {
        return new Vector2f(this.x, this.y);
    }

    toPoint(): Point {
        return new Point(this.x, this.y);
    }

    toString(): string {
        return "(" + this.x + "," + this.y + ")";
    }
}