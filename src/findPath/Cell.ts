/**
 * 寻路用的单元格（三角形）
 */
import {Triangle} from "../geom/Triangle";
import {Vector2f} from "../geom/Vector2f";

export class Cell extends Triangle {
    _index: number;				//在数组中的索引值
    _links: Array<number>;		// 与该三角型连接的三角型索引， -1表示改边没有连接.<int>
    sessionId: number;
    f: number;
    h: number;
    isOpen: Boolean = false;
    parent: Cell;

    m_ArrivalWall: number; // the side we arrived through.
    m_WallMidpoint: Array<Vector2f>; // 每个边的中点.<Vector2f>
    m_WallDistance: Array<number>; // the distances between each wall midpoint of sides (0-1, 1-2, 2-0).<number>

    constructor(p1: Vector2f = null, p2: Vector2f = null, p3: Vector2f = null) {
        super(p1, p2, p3);
        this.init();
    }


    /**
     * 计算中心点（3个顶点的平均值）
     */


    get links(): Array<number> { //.<int>
        return this._links;
    }

    set links(value: Array<number>)//.<int>
    {
        this._links = value;
    }

    init() {
        this.links = new Array<number>();//.<int>
        this.links.push(-1);
        this.links.push(-1);
        this.links.push(-1);

        //
        this.calculateData();

        this.m_WallMidpoint = new Array<Vector2f>();//.<Vector2f>
        this.m_WallDistance = new Array<number>();//.<number>
        // compute the midpoint of each cell wall
        this.m_WallMidpoint[0] = new Vector2f((this.pointA.x + this.pointB.x) / 2.0, (this.pointA.y + this.pointB.y) / 2.0);
        this.m_WallMidpoint[1] = new Vector2f((this.pointC.x + this.pointB.x) / 2.0, (this.pointC.y + this.pointB.y) / 2.0);
        this.m_WallMidpoint[2] = new Vector2f((this.pointC.x + this.pointA.x) / 2.0, (this.pointC.y + this.pointA.y) / 2.0);

        // compute the distances between the wall midpoints
        let wallVector: Vector2f;
        wallVector = this.m_WallMidpoint[0].subtract(this.m_WallMidpoint[1]);
        this.m_WallDistance[0] = wallVector.length();

        wallVector = this.m_WallMidpoint[1].subtract(this.m_WallMidpoint[2]);
        this.m_WallDistance[1] = wallVector.length();

        wallVector = this.m_WallMidpoint[2].subtract(this.m_WallMidpoint[0]);
        this.m_WallDistance[2] = wallVector.length();
    }

    /**
     * 获得两个点的相邻三角型
     * @param pA
     * @param pB
     * @param caller
     * @return 如果提供的两个点是caller的一个边, 返回true
     */
    requestLink(pA: Vector2f, pB: Vector2f, caller: Cell): Boolean {
        if (this.pointA.equals(pA)) {
            if (this.pointB.equals(pB)) {
                this.links[this.SIDE_AB] = caller.index;
                return true;
            } else if (this.pointC.equals(pB)) {
                this.links[this.SIDE_CA] = caller.index;
                return true;
            }
        } else if (this.pointB.equals(pA)) {
            if (this.pointA.equals(pB)) {
                this.links[this.SIDE_AB] = caller.index;
                return true;
            } else if (this.pointC.equals(pB)) {
                this.links[this.SIDE_BC] = caller.index;
                return true;
            }
        } else if (this.pointC.equals(pA)) {
            if (this.pointA.equals(pB)) {
                this.links[this.SIDE_CA] = caller.index;
                return true;
            } else if (this.pointB.equals(pB)) {
                this.links[this.SIDE_BC] = caller.index;
                return true;
            }
        }

        // we are not adjacent to the calling cell
        return false;
    }

    /**
     * 取得指定边的相邻三角型的索引
     * @param side
     * @return
     */
    getLink(side: number): number {
        return this.links[side];
    }

    /**
     * 检查并设置当前三角型与cellB的连接关系（方法会同时设置cellB与该三角型的连接）
     * @param cellB
     */
    checkAndLink(cellB: Cell) {
        if (this.getLink(this.SIDE_AB) === -1 && cellB.requestLink(this.pointA, this.pointB, this)) {
            this.setLink(this.SIDE_AB, cellB);
        } else if (this.getLink(this.SIDE_BC) === -1 && cellB.requestLink(this.pointB, this.pointC, this)) {
            this.setLink(this.SIDE_BC, cellB);
        } else if (this.getLink(this.SIDE_CA) === -1 && cellB.requestLink(this.pointC, this.pointA, this)) {
            this.setLink(this.SIDE_CA, cellB);
        }
    }

    /**
     * 设置side指定的边的连接到caller的索引
     * @param side
     * @param caller
     */
    setLink(side: number, caller: Cell) {
        this.links[side] = caller.index;
    }

    /**
     * 记录路径从上一个节点进入该节点的边（如果从终点开始寻路即为穿出边）
     * @param index    路径上一个节点的索引
     */
    setAndGetArrivalWall(index: number): number {
        if (index === this.links[0]) {
            this.m_ArrivalWall = 0;
            return 0;
        } else if (index === this.links[1]) {
            this.m_ArrivalWall = 1;
            return 1;
        } else if (index === this.links[2]) {
            this.m_ArrivalWall = 2;
            return 2;
        }
        return -1;
    }

    /**
     * 计算估价（h）  Compute the A* Heuristic for this cell given a Goal point
     * @param goal
     */
    computeHeuristic(goal: Vector2f) {
        // our heuristic is the estimated distance (using the longest axis delta)
        // between our cell center and the goal location

        let XDelta: number = Math.abs(goal.x - this.center.x);
        let YDelta: number = Math.abs(goal.y - this.center.y);
        this.h = XDelta + YDelta;
    }

    get index(): number {
        return this._index;
    }


    set index(value: number) {
        this._index = value;
    }

    clone(): Cell {
        return new Cell(this.pointA.clone(), this.pointB.clone(), this.pointC.clone());
    }
}