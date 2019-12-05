///<reference path="../geom/Vector2f.ts"/>
///<reference path="PathResult.ts"/>
import {Vector2f} from "../geom/Vector2f";
import {PathResult} from "./PathResult";

export class ClassifyResult {
    constructor() {
    }

    /**
     * 直线与cell（三角形）的关系
     */
    result: Number = PathResult.NO_RELATIONSHIP;
    /**
     * 相交边的索引
     */
    side: Number = 0;
    /**
     * 下一个邻接cell的索引
     */
    cellIndex: Number = -1;
    /**
     * 交点
     */
    intersection: Vector2f = new Vector2f();

    toString(): String {
        return this.result.toString() + " " + this.cellIndex;
    }
}