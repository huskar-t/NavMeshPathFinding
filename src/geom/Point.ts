export class Point {
    x;
    y;

    constructor(x = 0, y = 0) {
        this.setValues(x, y);
    }

    setValues(x = 0, y = 0) {
        this.x = x || 0;
        this.y = y || 0;
        return this;
    };

    offset(dx, dy) {
        this.x += dx;
        this.y += dy;
        return this;
    };

    static polar(len, angle, pt) {
        pt = pt || new Point();
        pt.x = len * Math.cos(angle);
        pt.y = len * Math.sin(angle);
        return pt;
    }

    static interpolate(pt1, pt2, f, pt) {
        pt = pt || new Point();
        pt.x = pt2.x + f * (pt1.x - pt2.x);
        pt.y = pt2.y + f * (pt1.y - pt2.y);
        return pt;
    };

    copy(point) {
        this.x = point.x;
        this.y = point.y;
        return this;
    };

    clone() {
        return new Point(this.x, this.y);
    };

    toString() {
        return "[Point (x=" + this.x + " y=" + this.y + ")]";
    };
}



