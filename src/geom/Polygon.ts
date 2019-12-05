/**
 * 顶点(合并多边形用)
 */
import {Vector2f} from "./Vector2f";
import {Line2D} from "./Line2D";
import {LineClassification} from "./LineClassification";
import {PointClassification} from "./PointClassification";
import {Rectangle} from "./Rectangle";

class InnerNode {
//	/** 原数组中的索引 */
//	public let index:int;
    /** 坐标点 */
    v: Vector2f;		//点
    /** 是否是交点 */
    i: Boolean;
    /** 是否已处理过 */
    p: Boolean = false;
    /** 进点--false； 出点--true */
    o: Boolean = false;
    /** 交点的双向引用 */
    other: InnerNode;
    /** 点是否在主多边形中*/
    isMain: Boolean;

    /** 多边形的下一个点 */
    next: InnerNode;

    constructor(pt: Vector2f, isInters: Boolean, main: Boolean) {
        this.v = pt;
        this.i = isInters;
        this.isMain = main;
    }

    toString(): String {
        return this.v.toString() + "-->交点：" + this.i + "出点：" + this.o + "主：" + this.isMain + "处理：" + this.p;
    }

//	equals(node:InnerNode):Boolean {
//		return v.equals(node.v);
//	}
}

export class Polygon {

    vertexNmu: number;				//顶点数

    vertexV: Array<Vector2f>;    //顶点列表.<Vector2f>

    rect: Rectangle;        //矩形包围盒

    constructor(vertexNmu: number, vertexV: Array<Vector2f>)//.<Vector2f>
    {
        this.vertexNmu = vertexNmu;
        this.vertexV = vertexV;
    }

    /**
     * 是否是简单多边形
     * @return
     */
    isSimplicity(): Boolean {
        // 边数组
        let edges: Array<Line2D> = new Array<Line2D>();//<Line2D>
        let len: number = this.vertexV.length - 1;
        for (let i: number = 0; i < len; i++) {
            edges.push(new Line2D(this.vertexV[i], this.vertexV[i + 1]));
        }
        edges.push(new Line2D(this.vertexV[len], this.vertexV[0]));

        // 是否有内交点
        let itsPt: Vector2f = new Vector2f();	//返回的交点
        for (let testLine of edges){
            for (let j: number = 0; j < edges.length; j++) {
                if (!testLine.equals(edges[j])) {
                    if (testLine.intersection(edges[j], itsPt) === LineClassification.SEGMENTS_INTERSECT) {
                        //交点是两个线段的端点
                        if (itsPt.equals(testLine.getPointA()) || itsPt.equals(testLine.getPointB())
                            || itsPt.equals(edges[j].getPointA()) || itsPt.equals(edges[j].getPointB())) {
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    /**
     * 将多边形的顶点按逆时针排序
     */
    cw() {
        if (this.isCW() === false) {	//如果为逆时针顺序， 反转为顺时针
            this.vertexV.reverse();
        }
    }

    /**
     * clockwise
     * @return true -- clockwise; false -- counter-clockwise
     */
    isCW(): Boolean {
        if (this.vertexV == null || this.vertexV.length < 0) return false;

        //最上（y最小）最左（x最小）点， 肯定是一个凸点
        //寻找最上点
        let topPt: Vector2f = this.vertexV[0];
        let topPtId: number = 0;	//点的索引
        for (let i: number = 1; i < this.vertexV.length; i++) {
            if (topPt.y > this.vertexV[i].y) {
                topPt = this.vertexV[i];
                topPtId = i;
            } else if (topPt.y === this.vertexV[i].y) { //y相等时取x最小
                if (topPt.x > this.vertexV[i].x) {
                    topPt = this.vertexV[i];
                    topPtId = i;
                }
            }
        }

        //凸点的邻点
        let lastId: number = topPtId - 1 >= 0 ? topPtId - 1 : this.vertexV.length - 1;
        let nextId: number = topPtId + 1 >= this.vertexV.length ? 0 : topPtId + 1;
        let last: Vector2f = this.vertexV[lastId];
        let next: Vector2f = this.vertexV[nextId];

        //判断
        let r: number = Polygon.multiply(last, next, topPt);
        return r < 0;


    }

    /**
     * r=multiply(sp,ep,op),得到(sp-op)*(ep-op)的叉积
     * r>0:ep在矢量opsp的逆时针方向；
     * r=0：opspep三点共线；
     * r<0:ep在矢量opsp的顺时针方向
     * @param sp
     * @param ep
     * @param op
     * @return
     */

    static multiply(sp: Vector2f, ep: Vector2f, op: Vector2f): number {
        return ((sp.x - op.x) * (ep.y - op.y) - (ep.x - op.x) * (sp.y - op.y));
    }

    /**
     * 返回矩形包围盒
     * @return
     */
    rectangle(): Rectangle {
        if (this.vertexV == null || this.vertexV.length < 0) return null;

        if (this.rect != null) return this.rect;

        let lx: number = this.vertexV[0].x;
        let rx: number = this.vertexV[0].x;
        let ty: number = this.vertexV[0].y;
        let by: number = this.vertexV[0].y;

        let v: Vector2f;
        for (let i: number = 1; i < this.vertexV.length; i++) {
            v = this.vertexV[i];
            if (v.x < lx) {
                lx = v.x;
            }
            if (v.x > rx) {
                rx = v.x;
            }
            if (v.y < ty) {
                ty = v.y;
            }
            if (v.y > by) {
                by = v.y;
            }
        }

        this.rect = new Rectangle(lx, ty,rx - lx,  by - ty);
        return this.rect;
    }

    /**
     * 合并两个多边形(Weiler-Athenton算法)
     * @param polygon
     * @return
     *            null--两个多边形不相交，合并前后两个多边形不变
     *            Polygon--一个新的多边形
     */
    union(polygon: Polygon): Array<Polygon> { //.<Polygon>
        //包围盒不相交
        let intersectRect = this.rectangle().intersection(polygon.rectangle());
        if (!intersectRect || intersectRect.isEmpty() === true) {
            return null;
        }

        //所有顶点和交点
        let cv0: Array<InnerNode> = new Array<InnerNode>();//主多边形 //.<InnerNode>
        let cv1: Array<InnerNode> = new Array<InnerNode>();//合并多边形.<InnerNode>
        //初始化
        let node: InnerNode;
        for (let i: number = 0; i < this.vertexV.length; i++) {
            node = new InnerNode(this.vertexV[i], false, true);
            if (i > 0) {
                cv0[i - 1].next = node;
            }
            cv0.push(node);
        }
        for (let j: number = 0; j < polygon.vertexV.length; j++) {
            node = new InnerNode(polygon.vertexV[j], false, false);
            if (j > 0) {
                cv1[j - 1].next = node;
            }
            cv1.push(node);
        }

        //插入交点
        let insCnt: number = Polygon.intersectPoint(cv0, cv1);

        //生成多边形
        if (insCnt > 0) {
            //顺时针序
            return this.linkToPolygon(cv0, cv1);
        } else {
            return null;
        }
    }

    /**
     * 生成多边形，顺时针序； 生成的内部孔洞多边形为逆时针序
     * @param cv0
     * @param cv1
     * @return 合并后的结果多边形数组(可能有多个多边形)
     */

    linkToPolygon(cv0: Array<InnerNode>, cv1: Array<InnerNode>): Array<Polygon> { //.<InnerNode> .<Polygon>
        //保存合并后的多边形数组
        let rtV: Array<Polygon> = new Array<Polygon>();  //.<Polygon>

        //1. 选取任一没有被跟踪过的交点为始点，将其输出到结果多边形顶点表中．
        cv0.forEach(function (testNode: InnerNode) {
            if (testNode.i === true && testNode.p === false) {

                let rcNodes: Array<Vector2f> = new Array<Vector2f>();//.<Vector2f>
                while (testNode) {


                    testNode.p = true;

                    // 如果是交点
                    if (testNode.i === true) {
                        testNode.other.p = true;

                        if (testNode.o === false) {		//该交点为进点（跟踪裁剪多边形边界）
                            if (testNode.isMain === true) {		//当前点在主多边形中
                                testNode = testNode.other;		//切换到裁剪多边形中
                            }
                        } else {					//该交点为出点（跟踪主多边形边界）
                            if (testNode.isMain === false) {		//当前点在裁剪多边形中
                                testNode = testNode.other;		//切换到主多边形中
                            }
                        }
                    }

                    rcNodes.push(testNode.v);  		////// 如果是多边形顶点，将其输出到结果多边形顶点表中

                    if (testNode.next == null) {	//末尾点返回到开始点
                        if (testNode.isMain) {
                            testNode = cv0[0];
                        } else {
                            testNode = cv1[0];
                        }
                    } else {
                        testNode = testNode.next;
                    }

                    //与首点相同，生成一个多边形
                    if (testNode.v.equals(rcNodes[0])) break;
                }
                //提取
                rtV.push(new Polygon(rcNodes.length, rcNodes));
            }
        });
        return rtV;
    }

    /**
     * 生成交点，并按顺时针序插入到顶点表中
     * @param cv0 （in/out）主多边形顶点表，并返回插入交点后的顶点表
     * @param cv1 （in/out）合并多边形顶点表，并返回插入交点后的顶点表
     * @return 交点数
     */
    static intersectPoint(cv0: Array<InnerNode>, cv1: Array<InnerNode>): number {//.<InnerNode>
        let insCnt: number = 0;		//交点数

        // let findEnd: Boolean = false;
        let startNode0: InnerNode = cv0[0];
        let startNode1: InnerNode;
        let line0: Line2D;
        let line1: Line2D;
        let ins: Vector2f;
        let hasIns: Boolean;
        // let result: number;		//进出点判断结果
        while (startNode0 != null) {		//主多边形
            if (startNode0.next == null) {  //最后一个点，跟首点相连
                line0 = new Line2D(startNode0.v, cv0[0].v);
            } else {
                line0 = new Line2D(startNode0.v, startNode0.next.v);
            }

            startNode1 = cv1[0];
            hasIns = false;

            while (startNode1 != null) {		//合并多边形
                if (startNode1.next == null) {
                    line1 = new Line2D(startNode1.v, cv1[0].v);
                } else {
                    line1 = new Line2D(startNode1.v, startNode1.next.v);
                }
                ins = new Vector2f();	//接受返回的交点
                //有交点
                if (line0.intersection(line1, ins) === LineClassification.SEGMENTS_INTERSECT) {
                    //忽略交点已在顶点列表中的
                    if (Polygon.getNodeIndex(cv0, ins) === -1) {
                        insCnt++;

                        ///////// 插入交点
                        let node0: InnerNode = new InnerNode(ins, true, true);
                        let node1: InnerNode = new InnerNode(ins, true, false);
                        cv0.push(node0);
                        cv1.push(node1);
                        //双向引用
                        node0.other = node1;
                        node1.other = node0;
                        //插入
                        node0.next = startNode0.next;
                        startNode0.next = node0;
                        node1.next = startNode1.next;
                        startNode1.next = node1;
                        //出点
                        if (line0.classifyPoint(line1.getPointB()) === PointClassification.RIGHT_SIDE) {
                            node0.o = true;
                            node1.o = true;
                        }

                        hasIns = true;		//有交点

                        //有交点，返回重新处理
                        break;
                    }
                }
                startNode1 = startNode1.next;
            }
            //如果没有交点继续处理下一个边，否则重新处理该点与插入的交点所形成的线段
            if (hasIns === false) {
                startNode0 = startNode0.next;
            }
        }
        return insCnt;
    }

    /**
     * 取得节点的索引(合并多边形用)
     * @param cv
     * @param node
     * @return
     */
    static getNodeIndex(cv: Array<InnerNode>, node: Vector2f): number { //.<InnerNode>
        for (let i: number = 0; i < cv.length; i++) {
            if (cv[i].v.equals(node)) {
                return i;
            }
        }
        return -1;
    }

    toString(): String {
        let rs: String = "Polygon:";
        for (let i: number = 0; i < this.vertexV.length; i++) {
            rs += " -> " + this.vertexV[i];
        }
        return rs;
    }
}



