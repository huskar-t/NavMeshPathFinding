import {Vector2f} from "../geom/Vector2f";
import {WayPoint} from "./WayPoint";
import {Cell} from "./Cell";
import {Line2D} from "../geom/Line2D";
import {Heap} from "../util/Heap";
import {PointClassification} from "../geom/PointClassification";
import {Point} from "../geom/Point";

export class NavMesh {
    EPSILON: number = 0.000001;	//精度

    // Path finding session ID. This Identifies each pathfinding session
    // so we do not need to clear out old data in the cells from previous sessions.
    pathSessionId: number = 0;

    m_CellVector: Array<Cell> = new Array<Cell>();//.<Cell>

    openList: Heap;
    closeList: Array<Cell>;

    constructor(cellVector: Array<Cell>)//.<Cell>
    {
        this.m_CellVector = cellVector;
        this.openList = new Heap(this.m_CellVector.length, function (a: Cell, b: Cell): number {
            return b.f - a.f;
        });
        this.closeList = [];
    }

    getCell(index: number): Cell {
        return this.m_CellVector[index];
    }

    /**
     * 找出给定点所在的三角型
     * @return
     * @param pt
     */
    findClosestCell(pt: Vector2f): Cell {
        for (let pCell of this.m_CellVector) {
            if (pCell.isPointIn(pt)) {
                return pCell;
            }
        }
        return null;
    }

    findPath(startPointPx: Point, endPointPx: Point): Array<Point> {

        let stime: number = new Date().getTime();

        this.pathSessionId++;

        let startPos: Vector2f = new Vector2f(startPointPx.x, startPointPx.y);
        let endPos: Vector2f = new Vector2f(endPointPx.x, endPointPx.y);
        let startCell: Cell = this.findClosestCell(startPos);
        let endCell: Cell = this.findClosestCell(endPos);
        if (startCell == null || endCell == null) {
            console.log("没有路径。");
            return null;
        }

        let outPath: Array<Point>;

        if (startCell === endCell) {
            outPath = [startPointPx, endPointPx];
        } else {
            outPath = this.buildPath(startCell, startPos, endCell, endPos);
        }
        console.log("寻路时间：", new Date().getTime() - stime);
        console.log(outPath);
        for (let cell of this.m_CellVector){
            cell.isOpen = false;
            cell.parent = null;
            cell.sessionId = 0;
            cell.h = 0;
            cell.f = 0;
        }
        return outPath;
    }

    /**
     * 构建路径
     * @param startCell
     * @param startPos
     * @param endCell
     * @param endPos
     * @return Point路径数组
     */
    buildPath(startCell: Cell, startPos: Vector2f, endCell: Cell, endPos: Vector2f): Array<Point> {
        this.openList.clear();
        this.closeList.length = 0;

        this.openList.put(endCell);
        endCell.f = 0;
        endCell.h = 0;
        endCell.isOpen = false;
        endCell.parent = null;
        endCell.sessionId = this.pathSessionId;

        let foundPath: Boolean = false;		//是否找到路径
        let currNode: Cell;				//当前节点
        let adjacentTmp: Cell = null;	//当前节点的邻接三角型
        while (this.openList.size > 0) {
            // 1. 把当前节点从开放列表删除, 加入到封闭列表
            currNode = this.openList.pop();
            this.closeList.push(currNode);

            //路径是在同一个三角形内
            if (currNode === startCell) {
                foundPath = true;
                break;
            }

            // 2. 对当前节点相邻的每一个节点依次执行以下步骤:
            //所有邻接三角型
            let adjacentId: number;
            for (let i: number = 0; i < 3; i++) {
                adjacentId = currNode.links[i];
                // 3. 如果该相邻节点不可通行或者该相邻节点已经在封闭列表中,
                //    则什么操作也不执行,继续检验下一个节点;
                if (adjacentId < 0) {						//不能通过
                    continue;
                } else {
                    adjacentTmp = this.m_CellVector[adjacentId];
                }

                if (adjacentTmp != null) {
                    if (adjacentTmp.sessionId !== this.pathSessionId) {
                        // 4. 如果该相邻节点不在开放列表中,则将该节点添加到开放列表中,
                        //    并将该相邻节点的父节点设为当前节点,同时保存该相邻节点的G和F值;
                        adjacentTmp.sessionId = this.pathSessionId;
                        adjacentTmp.parent = currNode;
                        adjacentTmp.isOpen = true;

                        //H和F值
                        adjacentTmp.computeHeuristic(startPos);
                        adjacentTmp.f = currNode.f + adjacentTmp.m_WallDistance[Math.abs(i - currNode.m_ArrivalWall)];

                        //放入开放列表并排序
                        this.openList.put(adjacentTmp);

                        // remember the side this caller is entering from
                        adjacentTmp.setAndGetArrivalWall(currNode.index);
                    } else {
                        // 5. 如果该相邻节点在开放列表中,
                        //    则判断若经由当前节点到达该相邻节点的G值是否小于原来保存的G值,
                        //    若小于,则将该相邻节点的父节点设为当前节点,并重新设置该相邻节点的G和F值
                        if (adjacentTmp.isOpen) {//已经在openList中
                            if (currNode.f + adjacentTmp.m_WallDistance[Math.abs(i - currNode.m_ArrivalWall)] < adjacentTmp.f) {
                                adjacentTmp.f = currNode.f;
                                adjacentTmp.parent = currNode;

                                // remember the side this caller is entering from
                                adjacentTmp.setAndGetArrivalWall(currNode.index);
                            }
                        } else {//已在closeList中
                            adjacentTmp = null;
                        }
                    }
                }
            }
        }
        //由网格路径生成Point数组路径
        if (foundPath) {
            return this.getPath(startPos, endPos);
        } else {
            return null;
        }
    }

    /**
     * 路径经过的网格
     * @return
     */
    getCellPath(): Array<Cell> { //.<Cell>
        let pth: Array<Cell> = new Array<Cell>();//.<Cell>

        let st: Cell = this.closeList[this.closeList.length - 1];
        pth.push(st);

        while (st.parent != null) {
            pth.push(st.parent);
            st = st.parent;
        }
        return pth;
    }

    /**
     * 根据经过的三角形返回路径点(下一个拐角点法)
     * @param start
     * @param end
     * @return Point数组
     */
    getPath(start: Vector2f, end: Vector2f): Array<Point> {
        //经过的三角形
        let cellPath: Array<Cell> = this.getCellPath();//.<Cell>
        //没有路径
        if (cellPath == null || cellPath.length === 0) {
            return null;
        }

        //保存最终的路径（Point数组）
        let pathArr: Array<Point> = new Array<Point>();

        //开始点
        pathArr.push(start.toPoint());
        //起点与终点在同一三角形中
        if (cellPath.length === 1) {
            pathArr.push(end.toPoint());	//结束点
            return pathArr;
        }

        //获取路点
        let wayPoint: WayPoint = new WayPoint(cellPath[0], start);
        while (!wayPoint.position.equals(end)) {
            wayPoint = this.getFurthestWayPoint(wayPoint, cellPath, end);
            pathArr.push(wayPoint.position.toPoint());
        }

        //            pathArr.push(end.toPoint());
        return pathArr;
    }

    /**
     * 下一个拐点
     * @param wayPoint 当前所在路点
     * @param cellPath 网格路径
     * @param end 终点
     * @return
     */
    getFurthestWayPoint(wayPoint: WayPoint, cellPath: Array<Cell>, end: Vector2f): WayPoint { //.<Cell>
        let startPt: Vector2f = wayPoint.position;	//当前所在路径点
        let cell: Cell = wayPoint.cell;
        let lastCell: Cell = cell;
        let startIndex: number = cellPath.indexOf(cell);	//开始路点所在的网格索引
        let outSide: Line2D = cell.sides[cell.m_ArrivalWall];	//路径线在网格中的穿出边
        let lastPtA: Vector2f = outSide.getPointA();
        let lastPtB: Vector2f = outSide.getPointB();
        let lastLineA: Line2D = new Line2D(startPt, lastPtA);
        let lastLineB: Line2D = new Line2D(startPt, lastPtB);
        let testPtA: Vector2f, testPtB: Vector2f;		//要测试的点
        for (let i: number = startIndex + 1; i < cellPath.length; i++) {
            cell = cellPath[i];
            outSide = cell.sides[cell.m_ArrivalWall];
            if (i === cellPath.length - 1) {
                testPtA = end;
                testPtB = end;
            } else {
                testPtA = outSide.getPointA();
                testPtB = outSide.getPointB();
            }

            if (!lastPtA.equals(testPtA)) {
                if (lastLineB.classifyPoint(testPtA, this.EPSILON) === PointClassification.RIGHT_SIDE) {
                    //路点
                    return new WayPoint(lastCell, lastPtB);
                } else {
                    if (lastLineA.classifyPoint(testPtA, this.EPSILON) !== PointClassification.LEFT_SIDE) {
                        lastPtA = testPtA;
                        lastCell = cell;
                        //重设直线
                        lastLineA.setPointB(lastPtA);
//							lastLineB.setPointB(lastPtB);
                    }
                }
            }

            if (!lastPtB.equals(testPtB)) {
                if (lastLineA.classifyPoint(testPtB, this.EPSILON) === PointClassification.LEFT_SIDE) {
                    //路径点
                    return new WayPoint(lastCell, lastPtA);
                } else {
                    if (lastLineB.classifyPoint(testPtB, this.EPSILON) !== PointClassification.RIGHT_SIDE) {
                        lastPtB = testPtB;
                        lastCell = cell;
                        //重设直线
//							lastLineA.setPointB(lastPtA);
                        lastLineB.setPointB(lastPtB);
                    }
                }
            }
        }
        return new WayPoint(cellPath[cellPath.length - 1], end);	//终点
    }
}