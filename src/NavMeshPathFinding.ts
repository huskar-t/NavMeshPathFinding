import {Vector2f} from "./geom/Vector2f";
import {Triangle} from "./geom/Triangle";
import {Delaunay} from "./geom/Delaunay";
import {Polygon} from "./geom/Polygon";
import {Cell} from "./findPath/Cell";
import {NavMesh} from "./findPath/NavMesh";
import {Point} from "./geom/Point";

class NavMeshPathFinding {
    polygonV: Array<Polygon> = new Array<Polygon>();		//所有多边形.<Polygon>
    triangleV: Array<Triangle>; 	//生成的Delaunay三角形.<Triangle>
    cellV: Array<Cell>;		//已生成的寻路数据.<Cell>

    constructor(framePoints: Array<Point>, obstacles: Array<Array<Point>>) {
        this.pushFrame(framePoints);
        for (let obstacle of obstacles){
            let obstacleVts = NavMeshPathFinding.pointsConvertToVector(obstacle);
            this.addPolygon(obstacleVts);
        }
        this.buildTriangle();
    }

    /**
     * 添加外边框到多边形
     */
    pushFrame(framePoints: Array<Point>) {
        //边框多边形
        let frameVt: Array<Vector2f> = new Array<Vector2f>();//.<Vector2f>
        for (let point of framePoints) {
            frameVt.push(new Vector2f(point.x, point.y))
        }
        let polyFrame: Polygon = new Polygon(frameVt.length, frameVt);
        polyFrame.cw();
        this.polygonV.push(polyFrame);
    }

    /**
     * 图形散点转换成向量
     * @param obstacle
     */
    static pointsConvertToVector(obstacle: Array<Point>): Array<Vector2f> {
        let polygonPath: Array<Vector2f> = new Array<Vector2f>();
        for (let point of obstacle) {
            let vt: Vector2f = new Vector2f(point.x, point.y);
            polygonPath.push(vt)
        }
        return polygonPath
    }

    /**
     * 通过边向量创建多边形并添加到多边形数组
     * @param polygonPath
     */
    addPolygon(polygonPath: Array<Vector2f>) {
        // let polygonPathLength = polygonPath.length;
        // let firstVt = polygonPath[0];
        // let lastVt = polygonPath[polygonPathLength - 1];
        // if (firstVt.distanceSquared(lastVt) > 10) {
        //     //距离远认为是没闭合
        //     polygonPath.push(firstVt.clone())
        // } else {
        //     // 距离近则将最后的点改成起点
        //     polygonPath[polygonPath.length - 1] = firstVt.clone()
        // }
        let pl: Polygon = new Polygon(polygonPath.length, polygonPath);
        pl.cw();
        this.polygonV.push(pl);
    }

    /**
     * 多边形合并
     */
    unionAll(): void {
        for (let n: number = 1; n < this.polygonV.length; n++) {
            let p0: Polygon = this.polygonV[n];
            for (let m: number = 1; m < this.polygonV.length; m++) {
                let p1: Polygon = this.polygonV[m];
                if (p0 !== p1 && p0.isCW() && p1.isCW()) {
                    let v: Array<Polygon> = p0.union(p1); //合并 //<Polygon>
                    if (v != null && v.length > 0) {
                        console.log("delete");
                        this.polygonV.splice(this.polygonV.indexOf(p0), 1);
                        this.polygonV.splice(this.polygonV.indexOf(p1), 1);
                        for (let pv of v) {
                            this.polygonV.push(pv)
                        }
                        n = 1;	//重新开始
                        break;
                    }
                }
            }
        }
    }

    /**
     * 搜索单元网格的邻接网格，并保存链接数据到网格中，以提供给寻路用
     * @param pv
     */
    static linkCells(pv: Array<Cell>): void {//.<Cell>
        for (let pCellA of pv) {
            for (let pCellB of pv) {
                if (pCellA && pCellB && pCellA !== pCellB) {
                    pCellA.checkAndLink(pCellB);
                }
            }
        }
    }

    /**
     * 构建三角网
     */
    buildTriangle(): void {
        // 多边形合并
        this.unionAll();
        // 创建狄洛尼三角网
        let d: Delaunay = new Delaunay();
        this.triangleV = d.createDelaunay(this.polygonV);
        // 构建寻路数据
        this.cellV = new Array<Cell>();//.<Cell>
        let trg: Triangle;
        let cell: Cell;
        for (let j: number = 0; j < this.triangleV.length; j++) {
            trg = this.triangleV[j];
            cell = new Cell(trg.getVertex(0), trg.getVertex(1), trg.getVertex(2));
            cell.index = j;
            this.cellV.push(cell);
        }
        NavMeshPathFinding.linkCells(this.cellV);
    }

    /**
     * 寻路
     * @param startPt
     * @param endPt
     */
    findPath(startPt: Array<number>, endPt: Array<number>): Array<Point> {
        let startPtInner = new Point(startPt[0], startPt[1]);
        let endPtInner = new Point(endPt[0], endPt[1]);
        let nav: NavMesh = new NavMesh(this.cellV);
        return nav.findPath(startPtInner, endPtInner);
    }

}
module.exports = NavMeshPathFinding;
// let fix = 400;
// let framePoints = [
//     [-386+fix, -386+fix],
//     [-386+fix, 386+fix],
//     [386+fix, 386+fix],
//     [386+fix, -386+fix]
// ];
// let obstacles = [
//     // [
//     //     [-65+fix, -65+fix],
//     //     [-65+fix, 65+fix],
//     //     [66+fix, 65+fix],
//     //     [66+fix, -65+fix]
//     // ],
//     [
//         [-65+fix, -65+fix],
//         [-65+fix, 65+fix],
//         [65+fix, 65+fix],
//         [65+fix, -65+fix]
//     ],
//     // [
//     //     [-65+fix, -65+fix],
//     //     [-65+fix, 65+fix],
//     //     [66+fix, 65+fix],
//     //     [66+fix, -65+fix]
//     // ]
//
//
// ];
// let navMesh = new NavMeshPathFinding(framePoints, obstacles);
// console.log(navMesh.triangleV);
// let points = navMesh.findPath([730, 730], [100, 100]);
// console.log(points);