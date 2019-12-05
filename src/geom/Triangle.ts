///<reference path="Line2D.ts"/>
///<reference path="PointClassification.ts"/>
import {Vector2f} from "./Vector2f";
import {Line2D} from "./Line2D";
import {PointClassification} from "./PointClassification";

export class Triangle {
    EPSILON: number = 0.000001;	//精度

    SIDE_AB: number = 0;
    SIDE_BC:number = 1;
    SIDE_CA:number = 2;


    _pointA: Vector2f;
    _pointB: Vector2f;
    _pointC: Vector2f;

    _center: Vector2f;		//中心点
    _sides: Array<Line2D>; 	// 三角型的3个边.<Line2D>

    dataCalculated: Boolean = false; //中心点是否已计算


    constructor(p1: Vector2f = null, p2: Vector2f = null, p3: Vector2f = null) {
        this.pointA = p1.clone();
        this.pointB = p2.clone();
        this.pointC = p3.clone();

        this.dataCalculated = false;
    }

    setPoints(p1: Vector2f, p2: Vector2f, p3: Vector2f) {
        this.pointA = p1.clone();
        this.pointB = p2.clone();
        this.pointC = p3.clone();

        this.dataCalculated = false;
    }

    /**
     * 计算中心点（3个顶点的平均值）
     */
    calculateData() {
        if (this._center == null)
            this._center = this.pointA.clone();
        else
            this._center.setVector2f(this.pointA);

        this._center.addLocal(this.pointB).addLocal(this.pointC).multLocal(1.0 / 3.0);

        //边
        if (this._sides == null) {
            this._sides = new Array<Line2D>();
        }
        this._sides[this.SIDE_AB] = new Line2D(this.pointA, this.pointB); // line AB
        this._sides[this.SIDE_BC] = new Line2D(this.pointB, this.pointC); // line BC
        this._sides[this.SIDE_CA] = new Line2D(this.pointC, this.pointA); // line CA

        this.dataCalculated = true;
    }

    /**
     * 根据i返回顶点
     * @param i the index of the point.
     * @return the point.
     */
    getVertex(i: Number): Vector2f {
        switch (i) {
            case 0:
                return this.pointA;
            case 1:
                return this.pointB;
            case 2:
                return this.pointC;
            default:
                return null;
        }
    }

    /**
     * 根据i指定的索引设置三角形的顶点
     * @param i the index to place the point.
     * @param point the point to set.
     */
    setVertex(i: Number, point: Vector2f) {
        switch (i) {
            case 0:
                this.pointA = point.clone();
                break;
            case 1:
                this.pointB = point.clone();
                break;
            case 2:
                this.pointC = point.clone();
                break;
        }
        this.dataCalculated = false;
    }

    /**
     * 取得指定索引的边(从0开始，顺时针)
     * @param sideIndex
     * @return
     */
    getSide(sideIndex: number): Line2D {
        if (this.dataCalculated === false) {
            this.calculateData();
        }

        return this.sides[sideIndex];
    }

    /**
     * 测试给定点是否在三角型中
     * @return
     * @param testPoint
     */
    isPointIn(testPoint: Vector2f): Boolean {
        if (this.dataCalculated === false) {
            this.calculateData();
        }

        // 点在所有边的右面
        let interiorCount = 0;
        for (let i: number = 0; i < 3; i++) {
            if (this.sides[i].classifyPoint(testPoint, this.EPSILON) !== PointClassification.LEFT_SIDE) {
                interiorCount++;
            }
        }
        return (interiorCount === 3);
    }


    clone(): Triangle {
        return new Triangle(this.pointA.clone(), this.pointB.clone(), this.pointC.clone());
    }

    toString(): String {
        return "Triangle:" + this.pointA + " -> " + this.pointB + " -> " + this.pointC;
    }

    get pointA(): Vector2f {
        return this._pointA;
    }

    set pointA(value: Vector2f) {
        this._pointA = value;
    }

    get pointB(): Vector2f {
        return this._pointB;
    }

    set pointB(value: Vector2f) {
        this._pointB = value;
    }

    get pointC(): Vector2f {
        return this._pointC;
    }

    set pointC(value: Vector2f) {
        this._pointC = value;
    }

    /**
     * 取得中心点
     * @return
     */
    get center(): Vector2f {
        if (this.dataCalculated === false) {
            this.calculateData();
        }
        return this._center;
    }

    get sides(): Array<Line2D> {
        return this._sides;
    }
}