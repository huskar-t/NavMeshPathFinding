import {Vector2f} from "./Vector2f";
import {Triangle} from "./Triangle";
import {Polygon} from "./Polygon";
import {Line2D} from "./Line2D";
import {PointClassification} from "./PointClassification";
import {LineClassification} from "./LineClassification";
import {Rectangle} from "./Rectangle";

export class Delaunay {
    constructor() {
    }

    EPSILON: number = 0.000001;	//精度


    vertexV: Array<Vector2f>;		//所有顶点列表, 前outEdgeVecNmu个为外边界顶点.<Vector2f>
    edgeV: Array<Line2D>;			//所有约束边.<Line2D>

    outEdgeVecNmu: number;			//区域外边界顶点数

    lineV: Array<Line2D>;	//线段堆栈.<Line2D>

    triangleV: Array<Triangle>; 	//生成的Delaunay三角形.<Triangle>

    createDelaunay(polyV: Array<Polygon>): Array<Triangle> {//.<Polygon> .<Triangle>
        //Step1. 	建立单元大小为 E*E 的均匀网格，并将多边形的顶点和边放入其中.
        //			其中 E=sqrt(w*h/n)，w 和 h 分别为多边形域包围盒的宽度、高度，n 为多边形域的顶点数 .
        this.initData(polyV);
//			return null;

        //Step2.	取任意一条外边界边 p1p2 .
        let initEdge: Line2D = this.getInitOutEdge();
        this.lineV.push(initEdge);

        let edge: Line2D;
        do {
            //Step3. 	计算 DT 点 p3，构成约束 Delaunay 三角形 Δp1p2p3 .
            edge = this.lineV.pop();
            let p3: Vector2f = this.findDT(edge);
            if (p3 == null) continue;
            let line13: Line2D = new Line2D(edge.getPointA(), p3);
            let line32: Line2D = new Line2D(p3, edge.getPointB());

            //Delaunay三角形放入输出数组
            let trg: Triangle = new Triangle(edge.getPointA(), edge.getPointB(), p3);
            this.triangleV.push(trg);

            //Step4.	如果新生成的边 p1p3 不是约束边，若已经在堆栈中，
            //			则将其从中删除；否则，将其放入堆栈；类似地，可处理 p3p2 .
            let index: number;
            if (this.indexOfVector(line13, this.edgeV) < 0) {
                index = this.indexOfVector(line13, this.lineV);
                if (index > -1) {
                    this.lineV.splice(index, 1);
                } else {
                    this.lineV.push(line13);
                }
            }
            if (this.indexOfVector(line32, this.edgeV) < 0) {
                index = this.indexOfVector(line32, this.lineV);
                if (index > -1) {
                    this.lineV.splice(index, 1);
                } else {
                    this.lineV.push(line32);
                }
            }

            //Step5.	若堆栈不空，则从中取出一条边，转Step3；否则，算法停止 .
        } while (this.lineV.length > 0);

        return this.triangleV;
    }

    /**
     * 初始化数据
     * @param polyV
     */


    initData(polyV: Array<Polygon>): void {//.<Polygon>
        //填充顶点和线列表
        this.vertexV = new Array<Vector2f>();//.<Vector2f>
        this.edgeV = new Array<Line2D>();//.<Line2D>
        let poly: Polygon;
        for (let i: number = 0; i < polyV.length; i++) {
            poly = polyV[i];
            this.putVertex(this.vertexV, poly.vertexV);
            this.putEdge(this.edgeV, poly.vertexV);
        }

        this.outEdgeVecNmu = polyV[0].vertexNmu;

        this.lineV = new Array<Line2D>(); //<Line2D>
        this.triangleV = new Array<Triangle>();//.<Triangle>
    }

    /**
     * 获取初始外边界
     * @return
     */
    getInitOutEdge(): Line2D {
        let initEdge: Line2D = this.edgeV[0];
        //检查是否有顶点p在该边上，如果有则换一个外边界
        let loopSign: Boolean;
        let loopIdx: number = 0;
        let self = this;
        do {
            loopSign = false;
            loopIdx++;
            for (let testV of this.vertexV) {
                if (testV.equals(initEdge.getPointA()) || testV.equals(initEdge.getPointB())) {
                    // continue
                    // 循环下一个
                }
                if (initEdge.classifyPoint(testV, self.EPSILON) === PointClassification.ON_LINE) {
                    loopSign = true;
                    initEdge = self.edgeV[loopIdx];
                    break;
                }
            }
        } while (loopSign && loopIdx < this.outEdgeVecNmu - 1) ;	//只取外边界
        return initEdge;
    }

    /**
     * 将srcV中的点放入dstV
     * @param dstV
     * @param srcV
     */
    putVertex(dstV: Array<Vector2f>, srcV: Array<Vector2f>): void {//.<Vector2f>
        srcV.forEach(function (item: Vector2f) {
            dstV.push(item);
        });
    }

    /**
     * 根据srcV中的点生成多边形线段，并放入dstV
     * @param dstV
     * @param srcV
     */
    putEdge(dstV: Array<Line2D>, srcV: Array<Vector2f>): void { // <Line2D> <Vector2f>
        if (srcV.length < 3) return;	//不是一个多边形
        let p1: Vector2f = srcV[0];
        let p2: Vector2f;
        for (let i: number = 1; i < srcV.length; i++) {
            p2 = srcV[i];
            dstV.push(new Line2D(p1, p2));
            p1 = p2;
        }
        p2 = srcV[0];
        dstV.push(new Line2D(p1, p2));
    }

    /**
     * 判断线段是否是约束边
     * @param line
     * @param vector
     * @return 线段的索引，如果没有找到，返回-1
     */
    indexOfVector(line: Line2D, vector: Array<Line2D>): number {//<Line2D>
        let lt: Line2D;
        for (let i: number = 0; i < vector.length; i++) {
            lt = vector[i];
            if (lt.equals(line)) return i;
        }
        return -1;
    }

    /**
     * 计算 DT 点
     * @param line
     * @return
     */
    findDT(line: Line2D): Vector2f {
        let p1: Vector2f = line.getPointA();
        let p2: Vector2f = line.getPointB();

        //搜索所有可见点 			TODO 按y方向搜索距线段终点最近的点
        let allVPoint: Array<Vector2f> = new Array<Vector2f>(); // line的所有可见点.<Vector2f>
        let self = this;
        this.vertexV.forEach(function (vt: Vector2f) {
            if (self.isVisiblePointOfLine(vt, line)) {
                allVPoint.push(vt)
            }
        });
        if (allVPoint.length === 0) return null;

        let p3: Vector2f = allVPoint[0];
        let loopSign: boolean = false;
        let sameAnglePointsMap: { [key: number]: Vector2f } = {};
        do {
            loopSign = false;

            //Step1. 构造 Δp1p2p3 的外接圆 C（p1，p2，p3）及其网格包围盒 B（C（p1，p2，p3））
            let circle: Circle = this.circumCircle(p1, p2, p3);
            let boundsBox: Rectangle = this.circleBounds(circle);

            //Step2. 依次访问网格包围盒内的每个网格单元：
            //		 若某个网格单元中存在可见点 p, 并且 ∠p1pp2 > ∠p1p3p2，则令 p3=p，转Step1；否则，转Step3.
            let angle132: number = this.lineAngle(p1, p3, p2);	// ∠p1p3p2
            for (let vec of allVPoint) {
                if (vec.equals(p1) || vec.equals(p2) || vec.equals(p3)) {
                    continue;
                }
                //不在包围盒中
                if (boundsBox.contains(vec.x, vec.y) === false) {
                    continue;
                }

                //夹角
                let a1: number = this.lineAngle(p1, vec, p2);
                if (Math.abs(a1) > Math.abs(angle132)) {
                    /////转Step1
                    p3 = vec;
                    loopSign = true;
                    sameAnglePointsMap = {};
                    break;
                } else if (Math.abs(a1) == Math.abs(angle132)) {
                    let arg = Math.abs(a1);
                    if (a1 > 0) {
                        sameAnglePointsMap[arg] = vec;
                    } else {
                        sameAnglePointsMap[arg] = p3;
                    }
                }
            }
            ///////转Step3
        } while (loopSign);


        //Step3. 若当前网格包围盒内所有网格单元都已被处理完，
        // 也即C（p1，p2，p3）内无可见点，则 p3 为的 p1p2 的 DT 点
        let p3Angle = this.lineAngle(p1, p3, p2);
        return sameAnglePointsMap[p3Angle] || p3;
    }

    /**
     * 返回顶角在o点，起始边为os，终止边为oe的夹角, 即∠soe (单位：弧度)
     * 角度小于pi，返回正值;   角度大于pi，返回负值
     */
    lineAngle(s: Vector2f, o: Vector2f, e: Vector2f): number {
        let cosfi: number, fi: number, norm: number;
        let dsx: number = s.x - o.x;
        let dsy: number = s.y - o.y;
        let dex: number = e.x - o.x;
        let dey: number = e.y - o.y;

        cosfi = dsx * dex + dsy * dey;
        norm = (dsx * dsx + dsy * dsy) * (dex * dex + dey * dey);
        cosfi /= Math.sqrt(norm);

        if (cosfi >= 1.0) return 0;
        if (cosfi <= -1.0) return -Math.PI;

        fi = Math.acos(cosfi);
        if (dsx * dey - dsy * dex > 0) return fi;      // 说明矢量os 在矢量 oe的顺时针方向
        return -fi;
    }

    /**
     * 返回圆的包围盒
     * @param c
     * @return
     */
    circleBounds(c: Circle): Rectangle {
        return new Rectangle(c.center.x - c.r, c.center.y - c.r, c.r * 2, c.r * 2);
    }

    /**
     * 返回三角形的外接圆
     * @param p1
     * @param p2
     * @param p3
     * @return
     */
    circumCircle(p1: Vector2f, p2: Vector2f, p3: Vector2f): Circle {
        let m1: number, m2: number, mx1: number, mx2: number, my1: number, my2: number;
        let dx: number, dy: number, rsqr: number, drsqr: number;
        let xc: number, yc: number, r: number;

        /* Check for coincident points */

        if (Math.abs(p1.y - p2.y) < this.EPSILON && Math.abs(p2.y - p3.y) < this.EPSILON) {
            return null;
        }

        m1 = -(p2.x - p1.x) / (p2.y - p1.y);
        m2 = -(p3.x - p2.x) / (p3.y - p2.y);
        mx1 = (p1.x + p2.x) / 2.0;
        mx2 = (p2.x + p3.x) / 2.0;
        my1 = (p1.y + p2.y) / 2.0;
        my2 = (p2.y + p3.y) / 2.0;

        if (Math.abs(p2.y - p1.y) < this.EPSILON) {
            xc = (p2.x + p1.x) / 2.0;
            yc = m2 * (xc - mx2) + my2;
        } else if (Math.abs(p3.y - p2.y) < this.EPSILON) {
            xc = (p3.x + p2.x) / 2.0;
            yc = m1 * (xc - mx1) + my1;
        } else {
            xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
            yc = m1 * (xc - mx1) + my1;
        }

        dx = p2.x - xc;
        dy = p2.y - yc;
        rsqr = dx * dx + dy * dy;
        r = Math.sqrt(rsqr);

        return new Circle(new Vector2f(xc, yc), r);
    }

    /**
     * 判断点vec是否为line的可见点
     * @param vec
     * @param line
     * @return true:vec是line的可见点
     */
    isVisiblePointOfLine(vec: Vector2f, line: Line2D): Boolean {
        if (vec.equals(line.getPointA()) || vec.equals(line.getPointB())) {
            return false;
        }

        //（1） p3 在边 p1p2 的右侧 (多边形顶点顺序为顺时针)；
        if (line.classifyPoint(vec, this.EPSILON) !== PointClassification.RIGHT_SIDE) {
            return false;
        }

        //（2） p3 与 p1 可见，即 p1p3 不与任何一个约束边相交；
        if (this.isVisibleIn2Point(line.getPointA(), vec) === false) {
            return false;
        }

        //（3） p3 与 p2 可见
        return this.isVisibleIn2Point(line.getPointB(), vec) !== false;
    }

    /**
     * 点pa和pb是否可见(pa和pb构成的线段不与任何约束边相交，不包括顶点)
     * @param pa
     * @param pb
     * @return
     */
    isVisibleIn2Point(pa: Vector2f, pb: Vector2f): Boolean {
        let linepapb: Line2D = new Line2D(pa, pb);
        let interscetVector: Vector2f = new Vector2f();		//线段交点
        for (let lineTmp of this.edgeV) {
            //两线段相交
            if (linepapb.intersection(lineTmp, interscetVector) === LineClassification.SEGMENTS_INTERSECT) {
                //交点是不是端点
                if (!pa.equals(interscetVector) && !pb.equals(interscetVector)) {
                    return false;
                }
            }
        }
        return true;
    }
}


/**
 * 圆
 */
class Circle {

    center: Vector2f;		//圆心

    r: number;			//半径

    constructor(cen: Vector2f, r: number) {
        this.center = cen;
        this.r = r;
    }
}


/**
 Step1.    建立单元大小为 E*E 的均匀网格，并将多边形的顶点和边放入其中.
 其中 E=sqrt(w*h/n)，w 和 h 分别为多边形域包围盒的宽度、高度，n 为多边形域的顶点数 .
 Step2.    取任意一条外边界边 p1p2 .
 Step3.    计算 DT 点 p3，构成约束 Delaunay 三角形 Δp1p2p3 .
 Step4.    如果新生成的边 p1p3 不是约束边，若已经在堆栈中，
 则将其从中删除；否则，将其放入堆栈；类似地，可处理 p3p2 .
 Step5.    若堆栈不空，则从中取出一条边，转Step3；否则，算法停止 .
 */
/**
 我们称 p3 为 p1p2 的可见点，其必须满足下面
 三个条件：
 （1） p3 在边 p1p2 的右侧 (多边形顶点顺序为顺时针)；
 （2） p3 与 p1 可见，即 p1p3 不与任何一个约束边相交；
 （3） p3 与 p2 可见
 */
/**
 确定 DT 点的过程如下：
 Step1.    构造 Δp1p2p3 的外接圆 C（p1，p2，p3）及其网格包围盒 B（C（p1，p2，p3））（如图 虚线所示）
 Step2.    依次访问网格包围盒内的每个网格单元：
 对未作当前趟数标记的网格单元进行搜索，并将其标记为当前趟数
 若某个网格单元中存在可见点 p, 并且 ∠p1pp2 > ∠p1p3p2，则令 p3=p1，转Step1；
 否则，转Step3.
 Step3.    若当前网格包围盒内所有网格单元都已被标记为当前趟数，
 也即C（p1，p2，p3）内无可见点，则 p3 为的 p1p2 的 DT 点
 */
