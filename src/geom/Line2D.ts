///<reference path="LineClassification.ts"/>
import {Vector2f} from "./Vector2f";
import {PointClassification} from "./PointClassification";
import {LineClassification} from "./LineClassification";

export class Line2D {

    pointA: Vector2f;	// Endpoint A of our line segment
    pointB: Vector2f;	// Endpoint B of our line segment

    m_Normal: Vector2f;	// 'normal' of the ray.
    m_NormalCalculated: Boolean = false; // normals are only calculated on demand

    constructor(pointA: Vector2f = null, pointB: Vector2f = null) {
        this.pointA = pointA.clone();
        this.pointB = pointB.clone();
        this.m_NormalCalculated = false;
    }
    setPointA(point:Vector2f):void
    {
        this.pointA = point.clone();
        this.m_NormalCalculated = false;
    }
    setPointB(point:Vector2f):void
    {
        this.pointB = point.clone();
        this.m_NormalCalculated = false;
    }
    setPoints(pointA:Vector2f, pointB:Vector2f):void
    {
        this.pointA = pointA.clone();
        this.pointB = pointB.clone();
        this.m_NormalCalculated = false;
    }
    getNormal():Vector2f
    {
        if (!this.m_NormalCalculated)
        {
            this.computeNormal();
        }

        return (this.m_Normal);
    }
    /**
     * 给定点到直线的带符号距离，从a点朝向b点，右向为正，左向为负
     */
    signedDistance(point:Vector2f):number
    {
        if (!this.m_NormalCalculated)
        {
            this.computeNormal();
        }

        let v2f:Vector2f = point.subtract(this.pointA);
        let testVector:Vector2f = new Vector2f(v2f.x, v2f.y);

        return testVector.dot(this.m_Normal);

    }

    /**
     * 判断点与直线的关系，假设你站在a点朝向b点，
     * 则输入点与直线的关系分为：Left, Right or Centered on the line
     * @param point 点
     * @param epsilon 精度值
     * @return
     */
    classifyPoint(point:Vector2f, epsilon:number=0.000001):number
    {
        let result:number = PointClassification.ON_LINE;
        let distance:number = this.signedDistance(point);

        if (distance > epsilon)
        {
            result = PointClassification.RIGHT_SIDE;
        }
        else if (distance < -epsilon)
        {
            result = PointClassification.LEFT_SIDE;
        }

        return result;
    }
    /**
     * 判断两个直线关系
     * this line A = x0, y0 and B = x1, y1
     * other is A = x2, y2 and B = x3, y3
     * @param other 另一条直线
     * @param pIntersectPoint (out)返回两线段的交点
     * @return
     */
    intersection(other:Line2D, pIntersectPoint:Vector2f=null):number
    {
        let denom:number = (other.pointB.y-other.pointA.y)*(this.pointB.x-this.pointA.x)
            -
            (other.pointB.x-other.pointA.x)*(this.pointB.y-this.pointA.y);

        let u0:number = (other.pointB.x-other.pointA.x)*(this.pointA.y-other.pointA.y)
            -
            (other.pointB.y-other.pointA.y)*(this.pointA.x-other.pointA.x);

        let u1:number = (other.pointA.x-this.pointA.x)*(this.pointB.y-this.pointA.y)
            -
            (other.pointA.y-this.pointA.y)*(this.pointB.x-this.pointA.x);

        //if parallel
        if(denom === 0.0) {
            //if collinear
            if(u0 === 0.0 && u1 === 0.0)
                return LineClassification.COLLINEAR;
            else
                return LineClassification.PARALELL;
        } else {
            //check if they intersect
            u0 = u0/denom;
            u1 = u1/denom;

            let x:number = this.pointA.x + u0*(this.pointB.x - this.pointA.x);
            let y:number = this.pointA.y + u0*(this.pointB.y - this.pointA.y);

            if (pIntersectPoint != null)
            {
                pIntersectPoint.x = x; //(m_PointA.x + (FactorAB * Bx_minus_Ax));
                pIntersectPoint.y = y; //(m_PointA.y + (FactorAB * By_minus_Ay));
            }

            // now determine the type of intersection
            if ((u0 >= 0.0) && (u0 <= 1.0) && (u1 >= 0.0) && (u1 <= 1.0))
            {
                return LineClassification.SEGMENTS_INTERSECT;
            }
            else if ((u1 >= 0.0) && (u1 <= 1.0))
            {
                return (LineClassification.A_BISECTS_B);
            }
            else if ((u0 >= 0.0) && (u0 <= 1.0))
            {
                return (LineClassification.B_BISECTS_A);
            }

            return LineClassification.LINES_INTERSECT;

        }
    }

    getPointA():Vector2f
    {
        return (this.pointA);
    }


    getPointB():Vector2f
    {
        return (this.pointB);
    }

    /**
     * 直线长度
     * @return
     */
    length():number
    {
        let xdist:number = this.pointB.x-this.pointA.x;
        let ydist:number = this.pointB.y-this.pointA.y;

        xdist *= xdist;
        ydist *= ydist;

        return Math.sqrt(xdist + ydist);
    }

    /**
     * 直线方向
     * @return
     */
    getDirection():Vector2f
    {
        let pt:Vector2f = this.pointB.subtract(this.pointA);
        let direction:Vector2f = new Vector2f(pt.x, pt.y);
        return direction.normalize();
    }

    /**
     * 计算法线
     */
    computeNormal():void
    {
        this.m_Normal = this.getDirection();

        // Rotate by -90 degrees to get normal of line
        // Rotate by +90 degrees to get normal of line
        let oldYValue:number = this.m_Normal.y;
        this.m_Normal.y = this.m_Normal.x;
        this.m_Normal.x = -oldYValue;
        this.m_NormalCalculated = true;
    }

    /**
     * 线段是否相等 （忽略方向）
     * @param line
     * @return
     */
    equals(line:Line2D):Boolean {
        return ( this.pointA.equals(line.getPointA()) && this.pointB.equals(line.getPointB()) ) ||
            ( this.pointA.equals(line.getPointB()) && this.pointB.equals(line.getPointA()) );
    }

    clone():Line2D {
        return new Line2D(this.pointA.clone(), this.pointB.clone());
    }

    toString():String{
        return "Line:"+this.pointA+" -> "+this.pointB;
    }

}