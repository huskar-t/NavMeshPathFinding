var NavMeshPathFinding = (function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var Point_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Point = (function () {
	    function Point(x, y) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        this.setValues(x, y);
	    }
	    Point.prototype.setValues = function (x, y) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        this.x = x || 0;
	        this.y = y || 0;
	        return this;
	    };
	    Point.prototype.offset = function (dx, dy) {
	        this.x += dx;
	        this.y += dy;
	        return this;
	    };
	    Point.polar = function (len, angle, pt) {
	        pt = pt || new Point();
	        pt.x = len * Math.cos(angle);
	        pt.y = len * Math.sin(angle);
	        return pt;
	    };
	    Point.interpolate = function (pt1, pt2, f, pt) {
	        pt = pt || new Point();
	        pt.x = pt2.x + f * (pt1.x - pt2.x);
	        pt.y = pt2.y + f * (pt1.y - pt2.y);
	        return pt;
	    };
	    Point.prototype.copy = function (point) {
	        this.x = point.x;
	        this.y = point.y;
	        return this;
	    };
	    Point.prototype.clone = function () {
	        return new Point(this.x, this.y);
	    };
	    Point.prototype.toString = function () {
	        return "[Point (x=" + this.x + " y=" + this.y + ")]";
	    };
	    return Point;
	}());
	exports.Point = Point;

	});

	unwrapExports(Point_1);
	var Point_2 = Point_1.Point;

	var Point_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Point = (function () {
	    function Point(x, y) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        this.setValues(x, y);
	    }
	    Point.prototype.setValues = function (x, y) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        this.x = x || 0;
	        this.y = y || 0;
	        return this;
	    };
	    Point.prototype.offset = function (dx, dy) {
	        this.x += dx;
	        this.y += dy;
	        return this;
	    };
	    Point.polar = function (len, angle, pt) {
	        pt = pt || new Point();
	        pt.x = len * Math.cos(angle);
	        pt.y = len * Math.sin(angle);
	        return pt;
	    };
	    Point.interpolate = function (pt1, pt2, f, pt) {
	        pt = pt || new Point();
	        pt.x = pt2.x + f * (pt1.x - pt2.x);
	        pt.y = pt2.y + f * (pt1.y - pt2.y);
	        return pt;
	    };
	    Point.prototype.copy = function (point) {
	        this.x = point.x;
	        this.y = point.y;
	        return this;
	    };
	    Point.prototype.clone = function () {
	        return new Point(this.x, this.y);
	    };
	    Point.prototype.toString = function () {
	        return "[Point (x=" + this.x + " y=" + this.y + ")]";
	    };
	    return Point;
	}());
	exports.Point = Point;

	});

	unwrapExports(Point_1$1);
	var Point_2$1 = Point_1$1.Point;

	var Vector2f_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var Vector2f = (function () {
	    function Vector2f(x, y) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        this.x = x;
	        this.y = y;
	    }
	    Object.defineProperty(Vector2f.prototype, "x", {
	        get: function () {
	            return this._x;
	        },
	        set: function (value) {
	            this._x = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector2f.prototype, "y", {
	        get: function () {
	            return this._y;
	        },
	        set: function (value) {
	            this._y = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector2f.prototype.setVector2f = function (vec) {
	        this.x = vec.x;
	        this.y = vec.y;
	    };
	    Vector2f.prototype.getAngela = function () {
	        return -Math.atan2(this.y, this.x);
	    };
	    Vector2f.prototype.length = function () {
	        return Math.sqrt(this.lengthSquared());
	    };
	    Vector2f.prototype.lengthSquared = function () {
	        return this.x * this.x + this.y * this.y;
	    };
	    Vector2f.prototype.distanceSquared = function (v) {
	        var dx = this.x - v.x;
	        var dy = this.y - v.y;
	        return dx * dx + dy * dy;
	    };
	    Vector2f.prototype.negate = function () {
	        return new Vector2f(-this.x, -this.y);
	    };
	    Vector2f.prototype.negateLocal = function () {
	        this.x -= this.x;
	        this.y -= this.y;
	        return this;
	    };
	    Vector2f.prototype.add = function (vec) {
	        if (null == vec) {
	            return null;
	        }
	        return new Vector2f(this.x + vec.x, this.y + vec.y);
	    };
	    Vector2f.prototype.addLocal = function (vec) {
	        if (null == vec) {
	            return null;
	        }
	        this.x += vec.x;
	        this.y += vec.y;
	        return this;
	    };
	    Vector2f.prototype.subtract = function (vec) {
	        return new Vector2f(this.x - vec.x, this.y - vec.y);
	    };
	    Vector2f.prototype.subtractLocal = function (vec) {
	        if (null == vec) {
	            return null;
	        }
	        this.x -= vec.x;
	        this.y -= vec.y;
	        return this;
	    };
	    Vector2f.prototype.dot = function (vec) {
	        if (null == vec) {
	            return 0;
	        }
	        return this.x * vec.x + this.y * vec.y;
	    };
	    Vector2f.prototype.mult = function (scalar) {
	        return new Vector2f(this.x * scalar, this.y * scalar);
	    };
	    Vector2f.prototype.multLocal = function (scalar) {
	        this.x *= scalar;
	        this.y *= scalar;
	        return this;
	    };
	    Vector2f.prototype.multLocalV = function (vec) {
	        if (null == vec) {
	            return null;
	        }
	        this.x *= vec.x;
	        this.y *= vec.y;
	        return this;
	    };
	    Vector2f.prototype.multV = function (scalar, product) {
	        if (null == product) {
	            product = new Vector2f();
	        }
	        product.x = this.x * scalar;
	        product.y = this.y * scalar;
	        return product;
	    };
	    Vector2f.prototype.divide = function (scalar) {
	        return new Vector2f(this.x / scalar, this.y / scalar);
	    };
	    Vector2f.prototype.divideLocal = function (scalar) {
	        this.x /= scalar;
	        this.y /= scalar;
	        return this;
	    };
	    Vector2f.prototype.normalize = function () {
	        var length = this.length();
	        if (length !== 0) {
	            return this.divide(length);
	        }
	        return this.divide(1);
	    };
	    Vector2f.prototype.normalizeLocal = function () {
	        var length = this.length();
	        if (length !== 0) {
	            return this.divideLocal(length);
	        }
	        return this.divideLocal(1);
	    };
	    Vector2f.prototype.smallestAngleBetween = function (otherVector) {
	        var dotProduct = this.dot(otherVector);
	        return Math.acos(dotProduct);
	    };
	    Vector2f.prototype.angleBetween = function (otherVector) {
	        return Math.atan2(otherVector.y, otherVector.x) - Math.atan2(this.y, this.x);
	    };
	    Vector2f.prototype.interpolate = function (finalVec, changeAmnt) {
	        this.x = (1 - changeAmnt) * this.x + changeAmnt * finalVec.x;
	        this.y = (1 - changeAmnt) * this.y + changeAmnt * finalVec.y;
	    };
	    Vector2f.prototype.zero = function () {
	        this.x = this.y = 0;
	    };
	    Vector2f.prototype.toArray = function (v) {
	        if (v == null) {
	            v = [];
	        }
	        v[0] = this.x;
	        v[1] = this.y;
	        return v;
	    };
	    Vector2f.prototype.rotateAroundOrigin = function (angle, cw) {
	        if (cw)
	            angle = -angle;
	        var newX = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
	        var newY = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
	        this.x = newX;
	        this.y = newY;
	    };
	    Vector2f.prototype.equals = function (vec, epsilon) {
	        if (epsilon === void 0) { epsilon = 0.000001; }
	        return Math.abs(this.x - vec.x) < epsilon && Math.abs(this.y - vec.y) < epsilon;
	    };
	    Vector2f.prototype.clone = function () {
	        return new Vector2f(this.x, this.y);
	    };
	    Vector2f.prototype.toPoint = function () {
	        return new Point_1$1.Point(this.x, this.y);
	    };
	    Vector2f.prototype.toString = function () {
	        return "(" + this.x + "," + this.y + ")";
	    };
	    return Vector2f;
	}());
	exports.Vector2f = Vector2f;

	});

	unwrapExports(Vector2f_1);
	var Vector2f_2 = Vector2f_1.Vector2f;

	var PointClassification_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var PointClassification = (function () {
	    function PointClassification() {
	    }
	    PointClassification.ON_LINE = 0;
	    PointClassification.LEFT_SIDE = 1;
	    PointClassification.RIGHT_SIDE = 2;
	    return PointClassification;
	}());
	exports.PointClassification = PointClassification;

	});

	unwrapExports(PointClassification_1);
	var PointClassification_2 = PointClassification_1.PointClassification;

	var LineClassification_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var LineClassification = (function () {
	    function LineClassification() {
	    }
	    LineClassification.COLLINEAR = 0;
	    LineClassification.LINES_INTERSECT = 1;
	    LineClassification.SEGMENTS_INTERSECT = 2;
	    LineClassification.A_BISECTS_B = 3;
	    LineClassification.B_BISECTS_A = 4;
	    LineClassification.PARALELL = 5;
	    return LineClassification;
	}());
	exports.LineClassification = LineClassification;

	});

	unwrapExports(LineClassification_1);
	var LineClassification_2 = LineClassification_1.LineClassification;

	var Vector2f_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var Vector2f = (function () {
	    function Vector2f(x, y) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        this.x = x;
	        this.y = y;
	    }
	    Object.defineProperty(Vector2f.prototype, "x", {
	        get: function () {
	            return this._x;
	        },
	        set: function (value) {
	            this._x = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector2f.prototype, "y", {
	        get: function () {
	            return this._y;
	        },
	        set: function (value) {
	            this._y = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector2f.prototype.setVector2f = function (vec) {
	        this.x = vec.x;
	        this.y = vec.y;
	    };
	    Vector2f.prototype.getAngela = function () {
	        return -Math.atan2(this.y, this.x);
	    };
	    Vector2f.prototype.length = function () {
	        return Math.sqrt(this.lengthSquared());
	    };
	    Vector2f.prototype.lengthSquared = function () {
	        return this.x * this.x + this.y * this.y;
	    };
	    Vector2f.prototype.distanceSquared = function (v) {
	        var dx = this.x - v.x;
	        var dy = this.y - v.y;
	        return dx * dx + dy * dy;
	    };
	    Vector2f.prototype.negate = function () {
	        return new Vector2f(-this.x, -this.y);
	    };
	    Vector2f.prototype.negateLocal = function () {
	        this.x -= this.x;
	        this.y -= this.y;
	        return this;
	    };
	    Vector2f.prototype.add = function (vec) {
	        if (null == vec) {
	            return null;
	        }
	        return new Vector2f(this.x + vec.x, this.y + vec.y);
	    };
	    Vector2f.prototype.addLocal = function (vec) {
	        if (null == vec) {
	            return null;
	        }
	        this.x += vec.x;
	        this.y += vec.y;
	        return this;
	    };
	    Vector2f.prototype.subtract = function (vec) {
	        return new Vector2f(this.x - vec.x, this.y - vec.y);
	    };
	    Vector2f.prototype.subtractLocal = function (vec) {
	        if (null == vec) {
	            return null;
	        }
	        this.x -= vec.x;
	        this.y -= vec.y;
	        return this;
	    };
	    Vector2f.prototype.dot = function (vec) {
	        if (null == vec) {
	            return 0;
	        }
	        return this.x * vec.x + this.y * vec.y;
	    };
	    Vector2f.prototype.mult = function (scalar) {
	        return new Vector2f(this.x * scalar, this.y * scalar);
	    };
	    Vector2f.prototype.multLocal = function (scalar) {
	        this.x *= scalar;
	        this.y *= scalar;
	        return this;
	    };
	    Vector2f.prototype.multLocalV = function (vec) {
	        if (null == vec) {
	            return null;
	        }
	        this.x *= vec.x;
	        this.y *= vec.y;
	        return this;
	    };
	    Vector2f.prototype.multV = function (scalar, product) {
	        if (null == product) {
	            product = new Vector2f();
	        }
	        product.x = this.x * scalar;
	        product.y = this.y * scalar;
	        return product;
	    };
	    Vector2f.prototype.divide = function (scalar) {
	        return new Vector2f(this.x / scalar, this.y / scalar);
	    };
	    Vector2f.prototype.divideLocal = function (scalar) {
	        this.x /= scalar;
	        this.y /= scalar;
	        return this;
	    };
	    Vector2f.prototype.normalize = function () {
	        var length = this.length();
	        if (length !== 0) {
	            return this.divide(length);
	        }
	        return this.divide(1);
	    };
	    Vector2f.prototype.normalizeLocal = function () {
	        var length = this.length();
	        if (length !== 0) {
	            return this.divideLocal(length);
	        }
	        return this.divideLocal(1);
	    };
	    Vector2f.prototype.smallestAngleBetween = function (otherVector) {
	        var dotProduct = this.dot(otherVector);
	        return Math.acos(dotProduct);
	    };
	    Vector2f.prototype.angleBetween = function (otherVector) {
	        return Math.atan2(otherVector.y, otherVector.x) - Math.atan2(this.y, this.x);
	    };
	    Vector2f.prototype.interpolate = function (finalVec, changeAmnt) {
	        this.x = (1 - changeAmnt) * this.x + changeAmnt * finalVec.x;
	        this.y = (1 - changeAmnt) * this.y + changeAmnt * finalVec.y;
	    };
	    Vector2f.prototype.zero = function () {
	        this.x = this.y = 0;
	    };
	    Vector2f.prototype.toArray = function (v) {
	        if (v == null) {
	            v = [];
	        }
	        v[0] = this.x;
	        v[1] = this.y;
	        return v;
	    };
	    Vector2f.prototype.rotateAroundOrigin = function (angle, cw) {
	        if (cw)
	            angle = -angle;
	        var newX = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
	        var newY = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
	        this.x = newX;
	        this.y = newY;
	    };
	    Vector2f.prototype.equals = function (vec, epsilon) {
	        if (epsilon === void 0) { epsilon = 0.000001; }
	        return Math.abs(this.x - vec.x) < epsilon && Math.abs(this.y - vec.y) < epsilon;
	    };
	    Vector2f.prototype.clone = function () {
	        return new Vector2f(this.x, this.y);
	    };
	    Vector2f.prototype.toPoint = function () {
	        return new Point_1$1.Point(this.x, this.y);
	    };
	    Vector2f.prototype.toString = function () {
	        return "(" + this.x + "," + this.y + ")";
	    };
	    return Vector2f;
	}());
	exports.Vector2f = Vector2f;

	});

	unwrapExports(Vector2f_1$1);
	var Vector2f_2$1 = Vector2f_1$1.Vector2f;

	var PointClassification_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var PointClassification = (function () {
	    function PointClassification() {
	    }
	    PointClassification.ON_LINE = 0;
	    PointClassification.LEFT_SIDE = 1;
	    PointClassification.RIGHT_SIDE = 2;
	    return PointClassification;
	}());
	exports.PointClassification = PointClassification;

	});

	unwrapExports(PointClassification_1$1);
	var PointClassification_2$1 = PointClassification_1$1.PointClassification;

	var LineClassification_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var LineClassification = (function () {
	    function LineClassification() {
	    }
	    LineClassification.COLLINEAR = 0;
	    LineClassification.LINES_INTERSECT = 1;
	    LineClassification.SEGMENTS_INTERSECT = 2;
	    LineClassification.A_BISECTS_B = 3;
	    LineClassification.B_BISECTS_A = 4;
	    LineClassification.PARALELL = 5;
	    return LineClassification;
	}());
	exports.LineClassification = LineClassification;

	});

	unwrapExports(LineClassification_1$1);
	var LineClassification_2$1 = LineClassification_1$1.LineClassification;

	var Line2D_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var Line2D = (function () {
	    function Line2D(pointA, pointB) {
	        if (pointA === void 0) { pointA = null; }
	        if (pointB === void 0) { pointB = null; }
	        this.m_NormalCalculated = false;
	        this.pointA = pointA.clone();
	        this.pointB = pointB.clone();
	        this.m_NormalCalculated = false;
	    }
	    Line2D.prototype.setPointA = function (point) {
	        this.pointA = point.clone();
	        this.m_NormalCalculated = false;
	    };
	    Line2D.prototype.setPointB = function (point) {
	        this.pointB = point.clone();
	        this.m_NormalCalculated = false;
	    };
	    Line2D.prototype.setPoints = function (pointA, pointB) {
	        this.pointA = pointA.clone();
	        this.pointB = pointB.clone();
	        this.m_NormalCalculated = false;
	    };
	    Line2D.prototype.getNormal = function () {
	        if (!this.m_NormalCalculated) {
	            this.computeNormal();
	        }
	        return (this.m_Normal);
	    };
	    Line2D.prototype.signedDistance = function (point) {
	        if (!this.m_NormalCalculated) {
	            this.computeNormal();
	        }
	        var v2f = point.subtract(this.pointA);
	        var testVector = new Vector2f_1$1.Vector2f(v2f.x, v2f.y);
	        return testVector.dot(this.m_Normal);
	    };
	    Line2D.prototype.classifyPoint = function (point, epsilon) {
	        if (epsilon === void 0) { epsilon = 0.000001; }
	        var result = PointClassification_1$1.PointClassification.ON_LINE;
	        var distance = this.signedDistance(point);
	        if (distance > epsilon) {
	            result = PointClassification_1$1.PointClassification.RIGHT_SIDE;
	        }
	        else if (distance < -epsilon) {
	            result = PointClassification_1$1.PointClassification.LEFT_SIDE;
	        }
	        return result;
	    };
	    Line2D.prototype.intersection = function (other, pIntersectPoint) {
	        if (pIntersectPoint === void 0) { pIntersectPoint = null; }
	        var denom = (other.pointB.y - other.pointA.y) * (this.pointB.x - this.pointA.x)
	            -
	                (other.pointB.x - other.pointA.x) * (this.pointB.y - this.pointA.y);
	        var u0 = (other.pointB.x - other.pointA.x) * (this.pointA.y - other.pointA.y)
	            -
	                (other.pointB.y - other.pointA.y) * (this.pointA.x - other.pointA.x);
	        var u1 = (other.pointA.x - this.pointA.x) * (this.pointB.y - this.pointA.y)
	            -
	                (other.pointA.y - this.pointA.y) * (this.pointB.x - this.pointA.x);
	        if (denom === 0.0) {
	            if (u0 === 0.0 && u1 === 0.0)
	                return LineClassification_1$1.LineClassification.COLLINEAR;
	            else
	                return LineClassification_1$1.LineClassification.PARALELL;
	        }
	        else {
	            u0 = u0 / denom;
	            u1 = u1 / denom;
	            var x = this.pointA.x + u0 * (this.pointB.x - this.pointA.x);
	            var y = this.pointA.y + u0 * (this.pointB.y - this.pointA.y);
	            if (pIntersectPoint != null) {
	                pIntersectPoint.x = x;
	                pIntersectPoint.y = y;
	            }
	            if ((u0 >= 0.0) && (u0 <= 1.0) && (u1 >= 0.0) && (u1 <= 1.0)) {
	                return LineClassification_1$1.LineClassification.SEGMENTS_INTERSECT;
	            }
	            else if ((u1 >= 0.0) && (u1 <= 1.0)) {
	                return (LineClassification_1$1.LineClassification.A_BISECTS_B);
	            }
	            else if ((u0 >= 0.0) && (u0 <= 1.0)) {
	                return (LineClassification_1$1.LineClassification.B_BISECTS_A);
	            }
	            return LineClassification_1$1.LineClassification.LINES_INTERSECT;
	        }
	    };
	    Line2D.prototype.getPointA = function () {
	        return (this.pointA);
	    };
	    Line2D.prototype.getPointB = function () {
	        return (this.pointB);
	    };
	    Line2D.prototype.length = function () {
	        var xdist = this.pointB.x - this.pointA.x;
	        var ydist = this.pointB.y - this.pointA.y;
	        xdist *= xdist;
	        ydist *= ydist;
	        return Math.sqrt(xdist + ydist);
	    };
	    Line2D.prototype.getDirection = function () {
	        var pt = this.pointB.subtract(this.pointA);
	        var direction = new Vector2f_1$1.Vector2f(pt.x, pt.y);
	        return direction.normalize();
	    };
	    Line2D.prototype.computeNormal = function () {
	        this.m_Normal = this.getDirection();
	        var oldYValue = this.m_Normal.y;
	        this.m_Normal.y = this.m_Normal.x;
	        this.m_Normal.x = -oldYValue;
	        this.m_NormalCalculated = true;
	    };
	    Line2D.prototype.equals = function (line) {
	        return (this.pointA.equals(line.getPointA()) && this.pointB.equals(line.getPointB())) ||
	            (this.pointA.equals(line.getPointB()) && this.pointB.equals(line.getPointA()));
	    };
	    Line2D.prototype.clone = function () {
	        return new Line2D(this.pointA.clone(), this.pointB.clone());
	    };
	    Line2D.prototype.toString = function () {
	        return "Line:" + this.pointA + " -> " + this.pointB;
	    };
	    return Line2D;
	}());
	exports.Line2D = Line2D;

	});

	unwrapExports(Line2D_1);
	var Line2D_2 = Line2D_1.Line2D;

	var Line2D_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var Line2D = (function () {
	    function Line2D(pointA, pointB) {
	        if (pointA === void 0) { pointA = null; }
	        if (pointB === void 0) { pointB = null; }
	        this.m_NormalCalculated = false;
	        this.pointA = pointA.clone();
	        this.pointB = pointB.clone();
	        this.m_NormalCalculated = false;
	    }
	    Line2D.prototype.setPointA = function (point) {
	        this.pointA = point.clone();
	        this.m_NormalCalculated = false;
	    };
	    Line2D.prototype.setPointB = function (point) {
	        this.pointB = point.clone();
	        this.m_NormalCalculated = false;
	    };
	    Line2D.prototype.setPoints = function (pointA, pointB) {
	        this.pointA = pointA.clone();
	        this.pointB = pointB.clone();
	        this.m_NormalCalculated = false;
	    };
	    Line2D.prototype.getNormal = function () {
	        if (!this.m_NormalCalculated) {
	            this.computeNormal();
	        }
	        return (this.m_Normal);
	    };
	    Line2D.prototype.signedDistance = function (point) {
	        if (!this.m_NormalCalculated) {
	            this.computeNormal();
	        }
	        var v2f = point.subtract(this.pointA);
	        var testVector = new Vector2f_1$1.Vector2f(v2f.x, v2f.y);
	        return testVector.dot(this.m_Normal);
	    };
	    Line2D.prototype.classifyPoint = function (point, epsilon) {
	        if (epsilon === void 0) { epsilon = 0.000001; }
	        var result = PointClassification_1$1.PointClassification.ON_LINE;
	        var distance = this.signedDistance(point);
	        if (distance > epsilon) {
	            result = PointClassification_1$1.PointClassification.RIGHT_SIDE;
	        }
	        else if (distance < -epsilon) {
	            result = PointClassification_1$1.PointClassification.LEFT_SIDE;
	        }
	        return result;
	    };
	    Line2D.prototype.intersection = function (other, pIntersectPoint) {
	        if (pIntersectPoint === void 0) { pIntersectPoint = null; }
	        var denom = (other.pointB.y - other.pointA.y) * (this.pointB.x - this.pointA.x)
	            -
	                (other.pointB.x - other.pointA.x) * (this.pointB.y - this.pointA.y);
	        var u0 = (other.pointB.x - other.pointA.x) * (this.pointA.y - other.pointA.y)
	            -
	                (other.pointB.y - other.pointA.y) * (this.pointA.x - other.pointA.x);
	        var u1 = (other.pointA.x - this.pointA.x) * (this.pointB.y - this.pointA.y)
	            -
	                (other.pointA.y - this.pointA.y) * (this.pointB.x - this.pointA.x);
	        if (denom === 0.0) {
	            if (u0 === 0.0 && u1 === 0.0)
	                return LineClassification_1$1.LineClassification.COLLINEAR;
	            else
	                return LineClassification_1$1.LineClassification.PARALELL;
	        }
	        else {
	            u0 = u0 / denom;
	            u1 = u1 / denom;
	            var x = this.pointA.x + u0 * (this.pointB.x - this.pointA.x);
	            var y = this.pointA.y + u0 * (this.pointB.y - this.pointA.y);
	            if (pIntersectPoint != null) {
	                pIntersectPoint.x = x;
	                pIntersectPoint.y = y;
	            }
	            if ((u0 >= 0.0) && (u0 <= 1.0) && (u1 >= 0.0) && (u1 <= 1.0)) {
	                return LineClassification_1$1.LineClassification.SEGMENTS_INTERSECT;
	            }
	            else if ((u1 >= 0.0) && (u1 <= 1.0)) {
	                return (LineClassification_1$1.LineClassification.A_BISECTS_B);
	            }
	            else if ((u0 >= 0.0) && (u0 <= 1.0)) {
	                return (LineClassification_1$1.LineClassification.B_BISECTS_A);
	            }
	            return LineClassification_1$1.LineClassification.LINES_INTERSECT;
	        }
	    };
	    Line2D.prototype.getPointA = function () {
	        return (this.pointA);
	    };
	    Line2D.prototype.getPointB = function () {
	        return (this.pointB);
	    };
	    Line2D.prototype.length = function () {
	        var xdist = this.pointB.x - this.pointA.x;
	        var ydist = this.pointB.y - this.pointA.y;
	        xdist *= xdist;
	        ydist *= ydist;
	        return Math.sqrt(xdist + ydist);
	    };
	    Line2D.prototype.getDirection = function () {
	        var pt = this.pointB.subtract(this.pointA);
	        var direction = new Vector2f_1$1.Vector2f(pt.x, pt.y);
	        return direction.normalize();
	    };
	    Line2D.prototype.computeNormal = function () {
	        this.m_Normal = this.getDirection();
	        var oldYValue = this.m_Normal.y;
	        this.m_Normal.y = this.m_Normal.x;
	        this.m_Normal.x = -oldYValue;
	        this.m_NormalCalculated = true;
	    };
	    Line2D.prototype.equals = function (line) {
	        return (this.pointA.equals(line.getPointA()) && this.pointB.equals(line.getPointB())) ||
	            (this.pointA.equals(line.getPointB()) && this.pointB.equals(line.getPointA()));
	    };
	    Line2D.prototype.clone = function () {
	        return new Line2D(this.pointA.clone(), this.pointB.clone());
	    };
	    Line2D.prototype.toString = function () {
	        return "Line:" + this.pointA + " -> " + this.pointB;
	    };
	    return Line2D;
	}());
	exports.Line2D = Line2D;

	});

	unwrapExports(Line2D_1$1);
	var Line2D_2$1 = Line2D_1$1.Line2D;

	var Triangle_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var Triangle = (function () {
	    function Triangle(p1, p2, p3) {
	        if (p1 === void 0) { p1 = null; }
	        if (p2 === void 0) { p2 = null; }
	        if (p3 === void 0) { p3 = null; }
	        this.EPSILON = 0.000001;
	        this.SIDE_AB = 0;
	        this.SIDE_BC = 1;
	        this.SIDE_CA = 2;
	        this.dataCalculated = false;
	        this.pointA = p1.clone();
	        this.pointB = p2.clone();
	        this.pointC = p3.clone();
	        this.dataCalculated = false;
	    }
	    Triangle.prototype.setPoints = function (p1, p2, p3) {
	        this.pointA = p1.clone();
	        this.pointB = p2.clone();
	        this.pointC = p3.clone();
	        this.dataCalculated = false;
	    };
	    Triangle.prototype.calculateData = function () {
	        if (this._center == null)
	            this._center = this.pointA.clone();
	        else
	            this._center.setVector2f(this.pointA);
	        this._center.addLocal(this.pointB).addLocal(this.pointC).multLocal(1.0 / 3.0);
	        if (this._sides == null) {
	            this._sides = new Array();
	        }
	        this._sides[this.SIDE_AB] = new Line2D_1$1.Line2D(this.pointA, this.pointB);
	        this._sides[this.SIDE_BC] = new Line2D_1$1.Line2D(this.pointB, this.pointC);
	        this._sides[this.SIDE_CA] = new Line2D_1$1.Line2D(this.pointC, this.pointA);
	        this.dataCalculated = true;
	    };
	    Triangle.prototype.getVertex = function (i) {
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
	    };
	    Triangle.prototype.setVertex = function (i, point) {
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
	    };
	    Triangle.prototype.getSide = function (sideIndex) {
	        if (this.dataCalculated === false) {
	            this.calculateData();
	        }
	        return this.sides[sideIndex];
	    };
	    Triangle.prototype.isPointIn = function (testPoint) {
	        if (this.dataCalculated === false) {
	            this.calculateData();
	        }
	        var interiorCount = 0;
	        for (var i = 0; i < 3; i++) {
	            if (this.sides[i].classifyPoint(testPoint, this.EPSILON) !== PointClassification_1$1.PointClassification.LEFT_SIDE) {
	                interiorCount++;
	            }
	        }
	        return (interiorCount === 3);
	    };
	    Triangle.prototype.clone = function () {
	        return new Triangle(this.pointA.clone(), this.pointB.clone(), this.pointC.clone());
	    };
	    Triangle.prototype.toString = function () {
	        return "Triangle:" + this.pointA + " -> " + this.pointB + " -> " + this.pointC;
	    };
	    Object.defineProperty(Triangle.prototype, "pointA", {
	        get: function () {
	            return this._pointA;
	        },
	        set: function (value) {
	            this._pointA = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Triangle.prototype, "pointB", {
	        get: function () {
	            return this._pointB;
	        },
	        set: function (value) {
	            this._pointB = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Triangle.prototype, "pointC", {
	        get: function () {
	            return this._pointC;
	        },
	        set: function (value) {
	            this._pointC = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Triangle.prototype, "center", {
	        get: function () {
	            if (this.dataCalculated === false) {
	                this.calculateData();
	            }
	            return this._center;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Triangle.prototype, "sides", {
	        get: function () {
	            return this._sides;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Triangle;
	}());
	exports.Triangle = Triangle;

	});

	unwrapExports(Triangle_1);
	var Triangle_2 = Triangle_1.Triangle;

	var Rectangle_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Rectangle = (function () {
	    function Rectangle(x, y, width, height) {
	        this.setValues(x, y, width, height);
	    }
	    Rectangle.prototype.setValues = function (x, y, width, height) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        if (width === void 0) { width = 0; }
	        if (height === void 0) { height = 0; }
	        this.x = x;
	        this.y = y;
	        this.width = width;
	        this.height = height;
	        return this;
	    };
	    Rectangle.prototype.extend = function (x, y, width, height) {
	        if (width === void 0) { width = 0; }
	        if (height === void 0) { height = 0; }
	        if (x + width > this.x + this.width) {
	            this.width = x + width - this.x;
	        }
	        if (y + height > this.y + this.height) {
	            this.height = y + height - this.y;
	        }
	        if (x < this.x) {
	            this.width += this.x - x;
	            this.x = x;
	        }
	        if (y < this.y) {
	            this.height += this.y - y;
	            this.y = y;
	        }
	        return this;
	    };
	    Rectangle.prototype.pad = function (top, left, bottom, right) {
	        this.x -= left;
	        this.y -= top;
	        this.width += left + right;
	        this.height += top + bottom;
	        return this;
	    };
	    Rectangle.prototype.copy = function (rectangle) {
	        return this.setValues(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
	    };
	    Rectangle.prototype.contains = function (x, y, width, height) {
	        if (width === void 0) { width = 0; }
	        if (height === void 0) { height = 0; }
	        return (x >= this.x && x + width <= this.x + this.width && y >= this.y && y + height <= this.y + this.height);
	    };
	    Rectangle.prototype.union = function (rect) {
	        return this.clone().extend(rect.x, rect.y, rect.width, rect.height);
	    };
	    Rectangle.prototype.intersection = function (rect) {
	        var x1 = rect.x, y1 = rect.y, x2 = x1 + rect.width, y2 = y1 + rect.height;
	        if (this.x > x1) {
	            x1 = this.x;
	        }
	        if (this.y > y1) {
	            y1 = this.y;
	        }
	        if (this.x + this.width < x2) {
	            x2 = this.x + this.width;
	        }
	        if (this.y + this.height < y2) {
	            y2 = this.y + this.height;
	        }
	        return (x2 <= x1 || y2 <= y1) ? null : new Rectangle(x1, y1, x2 - x1, y2 - y1);
	    };
	    Rectangle.prototype.intersects = function (rect) {
	        return (rect.x <= this.x + this.width && this.x <= rect.x + rect.width && rect.y <= this.y + this.height && this.y <= rect.y + rect.height);
	    };
	    Rectangle.prototype.isEmpty = function () {
	        return this.width <= 0 || this.height <= 0;
	    };
	    Rectangle.prototype.clone = function () {
	        return new Rectangle(this.x, this.y, this.width, this.height);
	    };
	    Rectangle.prototype.toString = function () {
	        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
	    };
	    return Rectangle;
	}());
	exports.Rectangle = Rectangle;

	});

	unwrapExports(Rectangle_1);
	var Rectangle_2 = Rectangle_1.Rectangle;

	var Triangle_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var Triangle = (function () {
	    function Triangle(p1, p2, p3) {
	        if (p1 === void 0) { p1 = null; }
	        if (p2 === void 0) { p2 = null; }
	        if (p3 === void 0) { p3 = null; }
	        this.EPSILON = 0.000001;
	        this.SIDE_AB = 0;
	        this.SIDE_BC = 1;
	        this.SIDE_CA = 2;
	        this.dataCalculated = false;
	        this.pointA = p1.clone();
	        this.pointB = p2.clone();
	        this.pointC = p3.clone();
	        this.dataCalculated = false;
	    }
	    Triangle.prototype.setPoints = function (p1, p2, p3) {
	        this.pointA = p1.clone();
	        this.pointB = p2.clone();
	        this.pointC = p3.clone();
	        this.dataCalculated = false;
	    };
	    Triangle.prototype.calculateData = function () {
	        if (this._center == null)
	            this._center = this.pointA.clone();
	        else
	            this._center.setVector2f(this.pointA);
	        this._center.addLocal(this.pointB).addLocal(this.pointC).multLocal(1.0 / 3.0);
	        if (this._sides == null) {
	            this._sides = new Array();
	        }
	        this._sides[this.SIDE_AB] = new Line2D_1$1.Line2D(this.pointA, this.pointB);
	        this._sides[this.SIDE_BC] = new Line2D_1$1.Line2D(this.pointB, this.pointC);
	        this._sides[this.SIDE_CA] = new Line2D_1$1.Line2D(this.pointC, this.pointA);
	        this.dataCalculated = true;
	    };
	    Triangle.prototype.getVertex = function (i) {
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
	    };
	    Triangle.prototype.setVertex = function (i, point) {
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
	    };
	    Triangle.prototype.getSide = function (sideIndex) {
	        if (this.dataCalculated === false) {
	            this.calculateData();
	        }
	        return this.sides[sideIndex];
	    };
	    Triangle.prototype.isPointIn = function (testPoint) {
	        if (this.dataCalculated === false) {
	            this.calculateData();
	        }
	        var interiorCount = 0;
	        for (var i = 0; i < 3; i++) {
	            if (this.sides[i].classifyPoint(testPoint, this.EPSILON) !== PointClassification_1$1.PointClassification.LEFT_SIDE) {
	                interiorCount++;
	            }
	        }
	        return (interiorCount === 3);
	    };
	    Triangle.prototype.clone = function () {
	        return new Triangle(this.pointA.clone(), this.pointB.clone(), this.pointC.clone());
	    };
	    Triangle.prototype.toString = function () {
	        return "Triangle:" + this.pointA + " -> " + this.pointB + " -> " + this.pointC;
	    };
	    Object.defineProperty(Triangle.prototype, "pointA", {
	        get: function () {
	            return this._pointA;
	        },
	        set: function (value) {
	            this._pointA = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Triangle.prototype, "pointB", {
	        get: function () {
	            return this._pointB;
	        },
	        set: function (value) {
	            this._pointB = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Triangle.prototype, "pointC", {
	        get: function () {
	            return this._pointC;
	        },
	        set: function (value) {
	            this._pointC = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Triangle.prototype, "center", {
	        get: function () {
	            if (this.dataCalculated === false) {
	                this.calculateData();
	            }
	            return this._center;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Triangle.prototype, "sides", {
	        get: function () {
	            return this._sides;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Triangle;
	}());
	exports.Triangle = Triangle;

	});

	unwrapExports(Triangle_1$1);
	var Triangle_2$1 = Triangle_1$1.Triangle;

	var Rectangle_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Rectangle = (function () {
	    function Rectangle(x, y, width, height) {
	        this.setValues(x, y, width, height);
	    }
	    Rectangle.prototype.setValues = function (x, y, width, height) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        if (width === void 0) { width = 0; }
	        if (height === void 0) { height = 0; }
	        this.x = x;
	        this.y = y;
	        this.width = width;
	        this.height = height;
	        return this;
	    };
	    Rectangle.prototype.extend = function (x, y, width, height) {
	        if (width === void 0) { width = 0; }
	        if (height === void 0) { height = 0; }
	        if (x + width > this.x + this.width) {
	            this.width = x + width - this.x;
	        }
	        if (y + height > this.y + this.height) {
	            this.height = y + height - this.y;
	        }
	        if (x < this.x) {
	            this.width += this.x - x;
	            this.x = x;
	        }
	        if (y < this.y) {
	            this.height += this.y - y;
	            this.y = y;
	        }
	        return this;
	    };
	    Rectangle.prototype.pad = function (top, left, bottom, right) {
	        this.x -= left;
	        this.y -= top;
	        this.width += left + right;
	        this.height += top + bottom;
	        return this;
	    };
	    Rectangle.prototype.copy = function (rectangle) {
	        return this.setValues(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
	    };
	    Rectangle.prototype.contains = function (x, y, width, height) {
	        if (width === void 0) { width = 0; }
	        if (height === void 0) { height = 0; }
	        return (x >= this.x && x + width <= this.x + this.width && y >= this.y && y + height <= this.y + this.height);
	    };
	    Rectangle.prototype.union = function (rect) {
	        return this.clone().extend(rect.x, rect.y, rect.width, rect.height);
	    };
	    Rectangle.prototype.intersection = function (rect) {
	        var x1 = rect.x, y1 = rect.y, x2 = x1 + rect.width, y2 = y1 + rect.height;
	        if (this.x > x1) {
	            x1 = this.x;
	        }
	        if (this.y > y1) {
	            y1 = this.y;
	        }
	        if (this.x + this.width < x2) {
	            x2 = this.x + this.width;
	        }
	        if (this.y + this.height < y2) {
	            y2 = this.y + this.height;
	        }
	        return (x2 <= x1 || y2 <= y1) ? null : new Rectangle(x1, y1, x2 - x1, y2 - y1);
	    };
	    Rectangle.prototype.intersects = function (rect) {
	        return (rect.x <= this.x + this.width && this.x <= rect.x + rect.width && rect.y <= this.y + this.height && this.y <= rect.y + rect.height);
	    };
	    Rectangle.prototype.isEmpty = function () {
	        return this.width <= 0 || this.height <= 0;
	    };
	    Rectangle.prototype.clone = function () {
	        return new Rectangle(this.x, this.y, this.width, this.height);
	    };
	    Rectangle.prototype.toString = function () {
	        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
	    };
	    return Rectangle;
	}());
	exports.Rectangle = Rectangle;

	});

	unwrapExports(Rectangle_1$1);
	var Rectangle_2$1 = Rectangle_1$1.Rectangle;

	var Delaunay_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	var Delaunay = (function () {
	    function Delaunay() {
	        this.EPSILON = 0.000001;
	    }
	    Delaunay.prototype.createDelaunay = function (polyV) {
	        this.initData(polyV);
	        var initEdge = this.getInitOutEdge();
	        this.lineV.push(initEdge);
	        var edge;
	        do {
	            edge = this.lineV.pop();
	            var p3 = this.findDT(edge);
	            if (p3 == null)
	                continue;
	            var line13 = new Line2D_1$1.Line2D(edge.getPointA(), p3);
	            var line32 = new Line2D_1$1.Line2D(p3, edge.getPointB());
	            var trg = new Triangle_1$1.Triangle(edge.getPointA(), edge.getPointB(), p3);
	            this.triangleV.push(trg);
	            var index = void 0;
	            if (this.indexOfVector(line13, this.edgeV) < 0) {
	                index = this.indexOfVector(line13, this.lineV);
	                if (index > -1) {
	                    this.lineV.splice(index, 1);
	                }
	                else {
	                    this.lineV.push(line13);
	                }
	            }
	            if (this.indexOfVector(line32, this.edgeV) < 0) {
	                index = this.indexOfVector(line32, this.lineV);
	                if (index > -1) {
	                    this.lineV.splice(index, 1);
	                }
	                else {
	                    this.lineV.push(line32);
	                }
	            }
	        } while (this.lineV.length > 0);
	        return this.triangleV;
	    };
	    Delaunay.prototype.initData = function (polyV) {
	        this.vertexV = new Array();
	        this.edgeV = new Array();
	        var poly;
	        for (var i = 0; i < polyV.length; i++) {
	            poly = polyV[i];
	            this.putVertex(this.vertexV, poly.vertexV);
	            this.putEdge(this.edgeV, poly.vertexV);
	        }
	        this.outEdgeVecNmu = polyV[0].vertexNmu;
	        this.lineV = new Array();
	        this.triangleV = new Array();
	    };
	    Delaunay.prototype.getInitOutEdge = function () {
	        var initEdge = this.edgeV[0];
	        var loopSign;
	        var loopIdx = 0;
	        var self = this;
	        do {
	            loopSign = false;
	            loopIdx++;
	            for (var _i = 0, _a = this.vertexV; _i < _a.length; _i++) {
	                var testV = _a[_i];
	                if (testV.equals(initEdge.getPointA()) || testV.equals(initEdge.getPointB())) ;
	                if (initEdge.classifyPoint(testV, self.EPSILON) === PointClassification_1$1.PointClassification.ON_LINE) {
	                    loopSign = true;
	                    initEdge = self.edgeV[loopIdx];
	                    break;
	                }
	            }
	        } while (loopSign && loopIdx < this.outEdgeVecNmu - 1);
	        return initEdge;
	    };
	    Delaunay.prototype.putVertex = function (dstV, srcV) {
	        srcV.forEach(function (item) {
	            dstV.push(item);
	        });
	    };
	    Delaunay.prototype.putEdge = function (dstV, srcV) {
	        if (srcV.length < 3)
	            return;
	        var p1 = srcV[0];
	        var p2;
	        for (var i = 1; i < srcV.length; i++) {
	            p2 = srcV[i];
	            dstV.push(new Line2D_1$1.Line2D(p1, p2));
	            p1 = p2;
	        }
	        p2 = srcV[0];
	        dstV.push(new Line2D_1$1.Line2D(p1, p2));
	    };
	    Delaunay.prototype.indexOfVector = function (line, vector) {
	        var lt;
	        for (var i = 0; i < vector.length; i++) {
	            lt = vector[i];
	            if (lt.equals(line))
	                return i;
	        }
	        return -1;
	    };
	    Delaunay.prototype.findDT = function (line) {
	        var p1 = line.getPointA();
	        var p2 = line.getPointB();
	        var allVPoint = new Array();
	        var self = this;
	        this.vertexV.forEach(function (vt) {
	            if (self.isVisiblePointOfLine(vt, line)) {
	                allVPoint.push(vt);
	            }
	        });
	        if (allVPoint.length === 0)
	            return null;
	        var p3 = allVPoint[0];
	        var loopSign = false;
	        var sameAnglePointsMap = {};
	        do {
	            loopSign = false;
	            var circle = this.circumCircle(p1, p2, p3);
	            var boundsBox = this.circleBounds(circle);
	            var angle132 = this.lineAngle(p1, p3, p2);
	            for (var _i = 0, allVPoint_1 = allVPoint; _i < allVPoint_1.length; _i++) {
	                var vec = allVPoint_1[_i];
	                if (vec.equals(p1) || vec.equals(p2) || vec.equals(p3)) {
	                    continue;
	                }
	                if (boundsBox.contains(vec.x, vec.y) === false) {
	                    continue;
	                }
	                var a1 = this.lineAngle(p1, vec, p2);
	                if (Math.abs(a1) > Math.abs(angle132)) {
	                    p3 = vec;
	                    loopSign = true;
	                    sameAnglePointsMap = {};
	                    break;
	                }
	                else if (Math.abs(a1) == Math.abs(angle132)) {
	                    var arg = Math.abs(a1);
	                    if (a1 > 0) {
	                        sameAnglePointsMap[arg] = vec;
	                    }
	                    else {
	                        sameAnglePointsMap[arg] = p3;
	                    }
	                }
	            }
	        } while (loopSign);
	        var p3Angle = this.lineAngle(p1, p3, p2);
	        return sameAnglePointsMap[p3Angle] || p3;
	    };
	    Delaunay.prototype.lineAngle = function (s, o, e) {
	        var cosfi, fi, norm;
	        var dsx = s.x - o.x;
	        var dsy = s.y - o.y;
	        var dex = e.x - o.x;
	        var dey = e.y - o.y;
	        cosfi = dsx * dex + dsy * dey;
	        norm = (dsx * dsx + dsy * dsy) * (dex * dex + dey * dey);
	        cosfi /= Math.sqrt(norm);
	        if (cosfi >= 1.0)
	            return 0;
	        if (cosfi <= -1.0)
	            return -Math.PI;
	        fi = Math.acos(cosfi);
	        if (dsx * dey - dsy * dex > 0)
	            return fi;
	        return -fi;
	    };
	    Delaunay.prototype.circleBounds = function (c) {
	        return new Rectangle_1$1.Rectangle(c.center.x - c.r, c.center.y - c.r, c.r * 2, c.r * 2);
	    };
	    Delaunay.prototype.circumCircle = function (p1, p2, p3) {
	        var m1, m2, mx1, mx2, my1, my2;
	        var dx, dy, rsqr;
	        var xc, yc, r;
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
	        }
	        else if (Math.abs(p3.y - p2.y) < this.EPSILON) {
	            xc = (p3.x + p2.x) / 2.0;
	            yc = m1 * (xc - mx1) + my1;
	        }
	        else {
	            xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
	            yc = m1 * (xc - mx1) + my1;
	        }
	        dx = p2.x - xc;
	        dy = p2.y - yc;
	        rsqr = dx * dx + dy * dy;
	        r = Math.sqrt(rsqr);
	        return new Circle(new Vector2f_1$1.Vector2f(xc, yc), r);
	    };
	    Delaunay.prototype.isVisiblePointOfLine = function (vec, line) {
	        if (vec.equals(line.getPointA()) || vec.equals(line.getPointB())) {
	            return false;
	        }
	        if (line.classifyPoint(vec, this.EPSILON) !== PointClassification_1$1.PointClassification.RIGHT_SIDE) {
	            return false;
	        }
	        if (this.isVisibleIn2Point(line.getPointA(), vec) === false) {
	            return false;
	        }
	        return this.isVisibleIn2Point(line.getPointB(), vec) !== false;
	    };
	    Delaunay.prototype.isVisibleIn2Point = function (pa, pb) {
	        var linepapb = new Line2D_1$1.Line2D(pa, pb);
	        var interscetVector = new Vector2f_1$1.Vector2f();
	        for (var _i = 0, _a = this.edgeV; _i < _a.length; _i++) {
	            var lineTmp = _a[_i];
	            if (linepapb.intersection(lineTmp, interscetVector) === LineClassification_1$1.LineClassification.SEGMENTS_INTERSECT) {
	                if (!pa.equals(interscetVector) && !pb.equals(interscetVector)) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    };
	    return Delaunay;
	}());
	exports.Delaunay = Delaunay;
	var Circle = (function () {
	    function Circle(cen, r) {
	        this.center = cen;
	        this.r = r;
	    }
	    return Circle;
	}());

	});

	unwrapExports(Delaunay_1);
	var Delaunay_2 = Delaunay_1.Delaunay;

	var Polygon_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var InnerNode = (function () {
	    function InnerNode(pt, isInters, main) {
	        this.p = false;
	        this.o = false;
	        this.v = pt;
	        this.i = isInters;
	        this.isMain = main;
	    }
	    InnerNode.prototype.toString = function () {
	        return this.v.toString() + "-->交点：" + this.i + "出点：" + this.o + "主：" + this.isMain + "处理：" + this.p;
	    };
	    return InnerNode;
	}());
	var Polygon = (function () {
	    function Polygon(vertexNmu, vertexV) {
	        this.vertexNmu = vertexNmu;
	        this.vertexV = vertexV;
	    }
	    Polygon.prototype.isSimplicity = function () {
	        var edges = new Array();
	        var len = this.vertexV.length - 1;
	        for (var i = 0; i < len; i++) {
	            edges.push(new Line2D_1$1.Line2D(this.vertexV[i], this.vertexV[i + 1]));
	        }
	        edges.push(new Line2D_1$1.Line2D(this.vertexV[len], this.vertexV[0]));
	        var itsPt = new Vector2f_1$1.Vector2f();
	        for (var _i = 0, edges_1 = edges; _i < edges_1.length; _i++) {
	            var testLine = edges_1[_i];
	            for (var j = 0; j < edges.length; j++) {
	                if (!testLine.equals(edges[j])) {
	                    if (testLine.intersection(edges[j], itsPt) === LineClassification_1$1.LineClassification.SEGMENTS_INTERSECT) {
	                        if (itsPt.equals(testLine.getPointA()) || itsPt.equals(testLine.getPointB())
	                            || itsPt.equals(edges[j].getPointA()) || itsPt.equals(edges[j].getPointB())) ;
	                        else {
	                            return false;
	                        }
	                    }
	                }
	            }
	        }
	        return true;
	    };
	    Polygon.prototype.cw = function () {
	        if (this.isCW() === false) {
	            this.vertexV.reverse();
	        }
	    };
	    Polygon.prototype.isCW = function () {
	        if (this.vertexV == null || this.vertexV.length < 0)
	            return false;
	        var topPt = this.vertexV[0];
	        var topPtId = 0;
	        for (var i = 1; i < this.vertexV.length; i++) {
	            if (topPt.y > this.vertexV[i].y) {
	                topPt = this.vertexV[i];
	                topPtId = i;
	            }
	            else if (topPt.y === this.vertexV[i].y) {
	                if (topPt.x > this.vertexV[i].x) {
	                    topPt = this.vertexV[i];
	                    topPtId = i;
	                }
	            }
	        }
	        var lastId = topPtId - 1 >= 0 ? topPtId - 1 : this.vertexV.length - 1;
	        var nextId = topPtId + 1 >= this.vertexV.length ? 0 : topPtId + 1;
	        var last = this.vertexV[lastId];
	        var next = this.vertexV[nextId];
	        var r = Polygon.multiply(last, next, topPt);
	        return r < 0;
	    };
	    Polygon.multiply = function (sp, ep, op) {
	        return ((sp.x - op.x) * (ep.y - op.y) - (ep.x - op.x) * (sp.y - op.y));
	    };
	    Polygon.prototype.rectangle = function () {
	        if (this.vertexV == null || this.vertexV.length < 0)
	            return null;
	        if (this.rect != null)
	            return this.rect;
	        var lx = this.vertexV[0].x;
	        var rx = this.vertexV[0].x;
	        var ty = this.vertexV[0].y;
	        var by = this.vertexV[0].y;
	        var v;
	        for (var i = 1; i < this.vertexV.length; i++) {
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
	        this.rect = new Rectangle_1$1.Rectangle(lx, ty, rx - lx, by - ty);
	        return this.rect;
	    };
	    Polygon.prototype.union = function (polygon) {
	        var intersectRect = this.rectangle().intersection(polygon.rectangle());
	        if (!intersectRect || intersectRect.isEmpty() === true) {
	            return null;
	        }
	        var cv0 = new Array();
	        var cv1 = new Array();
	        var node;
	        for (var i = 0; i < this.vertexV.length; i++) {
	            node = new InnerNode(this.vertexV[i], false, true);
	            if (i > 0) {
	                cv0[i - 1].next = node;
	            }
	            cv0.push(node);
	        }
	        for (var j = 0; j < polygon.vertexV.length; j++) {
	            node = new InnerNode(polygon.vertexV[j], false, false);
	            if (j > 0) {
	                cv1[j - 1].next = node;
	            }
	            cv1.push(node);
	        }
	        var insCnt = Polygon.intersectPoint(cv0, cv1);
	        if (insCnt > 0) {
	            return this.linkToPolygon(cv0, cv1);
	        }
	        else {
	            return null;
	        }
	    };
	    Polygon.prototype.linkToPolygon = function (cv0, cv1) {
	        var rtV = new Array();
	        cv0.forEach(function (testNode) {
	            if (testNode.i === true && testNode.p === false) {
	                var rcNodes = new Array();
	                while (testNode) {
	                    testNode.p = true;
	                    if (testNode.i === true) {
	                        testNode.other.p = true;
	                        if (testNode.o === false) {
	                            if (testNode.isMain === true) {
	                                testNode = testNode.other;
	                            }
	                        }
	                        else {
	                            if (testNode.isMain === false) {
	                                testNode = testNode.other;
	                            }
	                        }
	                    }
	                    rcNodes.push(testNode.v);
	                    if (testNode.next == null) {
	                        if (testNode.isMain) {
	                            testNode = cv0[0];
	                        }
	                        else {
	                            testNode = cv1[0];
	                        }
	                    }
	                    else {
	                        testNode = testNode.next;
	                    }
	                    if (testNode.v.equals(rcNodes[0]))
	                        break;
	                }
	                rtV.push(new Polygon(rcNodes.length, rcNodes));
	            }
	        });
	        return rtV;
	    };
	    Polygon.intersectPoint = function (cv0, cv1) {
	        var insCnt = 0;
	        var startNode0 = cv0[0];
	        var startNode1;
	        var line0;
	        var line1;
	        var ins;
	        var hasIns;
	        while (startNode0 != null) {
	            if (startNode0.next == null) {
	                line0 = new Line2D_1$1.Line2D(startNode0.v, cv0[0].v);
	            }
	            else {
	                line0 = new Line2D_1$1.Line2D(startNode0.v, startNode0.next.v);
	            }
	            startNode1 = cv1[0];
	            hasIns = false;
	            while (startNode1 != null) {
	                if (startNode1.next == null) {
	                    line1 = new Line2D_1$1.Line2D(startNode1.v, cv1[0].v);
	                }
	                else {
	                    line1 = new Line2D_1$1.Line2D(startNode1.v, startNode1.next.v);
	                }
	                ins = new Vector2f_1$1.Vector2f();
	                if (line0.intersection(line1, ins) === LineClassification_1$1.LineClassification.SEGMENTS_INTERSECT) {
	                    if (Polygon.getNodeIndex(cv0, ins) === -1) {
	                        insCnt++;
	                        var node0 = new InnerNode(ins, true, true);
	                        var node1 = new InnerNode(ins, true, false);
	                        cv0.push(node0);
	                        cv1.push(node1);
	                        node0.other = node1;
	                        node1.other = node0;
	                        node0.next = startNode0.next;
	                        startNode0.next = node0;
	                        node1.next = startNode1.next;
	                        startNode1.next = node1;
	                        if (line0.classifyPoint(line1.getPointB()) === PointClassification_1$1.PointClassification.RIGHT_SIDE) {
	                            node0.o = true;
	                            node1.o = true;
	                        }
	                        hasIns = true;
	                        break;
	                    }
	                }
	                startNode1 = startNode1.next;
	            }
	            if (hasIns === false) {
	                startNode0 = startNode0.next;
	            }
	        }
	        return insCnt;
	    };
	    Polygon.getNodeIndex = function (cv, node) {
	        for (var i = 0; i < cv.length; i++) {
	            if (cv[i].v.equals(node)) {
	                return i;
	            }
	        }
	        return -1;
	    };
	    Polygon.prototype.toString = function () {
	        var rs = "Polygon:";
	        for (var i = 0; i < this.vertexV.length; i++) {
	            rs += " -> " + this.vertexV[i];
	        }
	        return rs;
	    };
	    return Polygon;
	}());
	exports.Polygon = Polygon;

	});

	unwrapExports(Polygon_1);
	var Polygon_2 = Polygon_1.Polygon;

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __rest(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	}

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __param(paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	}

	function __metadata(metadataKey, metadataValue) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	}

	function __awaiter(thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	function __exportStar(m, exports) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}

	function __values(o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	}

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	function __spreadArrays() {
	    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	    for (var r = Array(s), k = 0, i = 0; i < il; i++)
	        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	            r[k] = a[j];
	    return r;
	}
	function __await(v) {
	    return this instanceof __await ? (this.v = v, this) : new __await(v);
	}

	function __asyncGenerator(thisArg, _arguments, generator) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var g = generator.apply(thisArg, _arguments || []), i, q = [];
	    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
	    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
	    function fulfill(value) { resume("next", value); }
	    function reject(value) { resume("throw", value); }
	    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	}

	function __asyncDelegator(o) {
	    var i, p;
	    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
	    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
	}

	function __asyncValues(o) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var m = o[Symbol.asyncIterator], i;
	    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	}

	function __makeTemplateObject(cooked, raw) {
	    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
	    return cooked;
	}
	function __importStar(mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result.default = mod;
	    return result;
	}

	function __importDefault(mod) {
	    return (mod && mod.__esModule) ? mod : { default: mod };
	}

	var tslib_es6 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		__extends: __extends,
		get __assign () { return __assign; },
		__rest: __rest,
		__decorate: __decorate,
		__param: __param,
		__metadata: __metadata,
		__awaiter: __awaiter,
		__generator: __generator,
		__exportStar: __exportStar,
		__values: __values,
		__read: __read,
		__spread: __spread,
		__spreadArrays: __spreadArrays,
		__await: __await,
		__asyncGenerator: __asyncGenerator,
		__asyncDelegator: __asyncDelegator,
		__asyncValues: __asyncValues,
		__makeTemplateObject: __makeTemplateObject,
		__importStar: __importStar,
		__importDefault: __importDefault
	});

	var Cell_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var Cell = (function (_super) {
	    tslib_es6.__extends(Cell, _super);
	    function Cell(p1, p2, p3) {
	        if (p1 === void 0) { p1 = null; }
	        if (p2 === void 0) { p2 = null; }
	        if (p3 === void 0) { p3 = null; }
	        var _this = _super.call(this, p1, p2, p3) || this;
	        _this.isOpen = false;
	        _this.init();
	        return _this;
	    }
	    Object.defineProperty(Cell.prototype, "links", {
	        get: function () {
	            return this._links;
	        },
	        set: function (value) {
	            this._links = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Cell.prototype.init = function () {
	        this.links = new Array();
	        this.links.push(-1);
	        this.links.push(-1);
	        this.links.push(-1);
	        this.calculateData();
	        this.m_WallMidpoint = new Array();
	        this.m_WallDistance = new Array();
	        this.m_WallMidpoint[0] = new Vector2f_1$1.Vector2f((this.pointA.x + this.pointB.x) / 2.0, (this.pointA.y + this.pointB.y) / 2.0);
	        this.m_WallMidpoint[1] = new Vector2f_1$1.Vector2f((this.pointC.x + this.pointB.x) / 2.0, (this.pointC.y + this.pointB.y) / 2.0);
	        this.m_WallMidpoint[2] = new Vector2f_1$1.Vector2f((this.pointC.x + this.pointA.x) / 2.0, (this.pointC.y + this.pointA.y) / 2.0);
	        var wallVector;
	        wallVector = this.m_WallMidpoint[0].subtract(this.m_WallMidpoint[1]);
	        this.m_WallDistance[0] = wallVector.length();
	        wallVector = this.m_WallMidpoint[1].subtract(this.m_WallMidpoint[2]);
	        this.m_WallDistance[1] = wallVector.length();
	        wallVector = this.m_WallMidpoint[2].subtract(this.m_WallMidpoint[0]);
	        this.m_WallDistance[2] = wallVector.length();
	    };
	    Cell.prototype.requestLink = function (pA, pB, caller) {
	        if (this.pointA.equals(pA)) {
	            if (this.pointB.equals(pB)) {
	                this.links[this.SIDE_AB] = caller.index;
	                return true;
	            }
	            else if (this.pointC.equals(pB)) {
	                this.links[this.SIDE_CA] = caller.index;
	                return true;
	            }
	        }
	        else if (this.pointB.equals(pA)) {
	            if (this.pointA.equals(pB)) {
	                this.links[this.SIDE_AB] = caller.index;
	                return true;
	            }
	            else if (this.pointC.equals(pB)) {
	                this.links[this.SIDE_BC] = caller.index;
	                return true;
	            }
	        }
	        else if (this.pointC.equals(pA)) {
	            if (this.pointA.equals(pB)) {
	                this.links[this.SIDE_CA] = caller.index;
	                return true;
	            }
	            else if (this.pointB.equals(pB)) {
	                this.links[this.SIDE_BC] = caller.index;
	                return true;
	            }
	        }
	        return false;
	    };
	    Cell.prototype.getLink = function (side) {
	        return this.links[side];
	    };
	    Cell.prototype.checkAndLink = function (cellB) {
	        if (this.getLink(this.SIDE_AB) === -1 && cellB.requestLink(this.pointA, this.pointB, this)) {
	            this.setLink(this.SIDE_AB, cellB);
	        }
	        else if (this.getLink(this.SIDE_BC) === -1 && cellB.requestLink(this.pointB, this.pointC, this)) {
	            this.setLink(this.SIDE_BC, cellB);
	        }
	        else if (this.getLink(this.SIDE_CA) === -1 && cellB.requestLink(this.pointC, this.pointA, this)) {
	            this.setLink(this.SIDE_CA, cellB);
	        }
	    };
	    Cell.prototype.setLink = function (side, caller) {
	        this.links[side] = caller.index;
	    };
	    Cell.prototype.setAndGetArrivalWall = function (index) {
	        if (index === this.links[0]) {
	            this.m_ArrivalWall = 0;
	            return 0;
	        }
	        else if (index === this.links[1]) {
	            this.m_ArrivalWall = 1;
	            return 1;
	        }
	        else if (index === this.links[2]) {
	            this.m_ArrivalWall = 2;
	            return 2;
	        }
	        return -1;
	    };
	    Cell.prototype.computeHeuristic = function (goal) {
	        var XDelta = Math.abs(goal.x - this.center.x);
	        var YDelta = Math.abs(goal.y - this.center.y);
	        this.h = XDelta + YDelta;
	    };
	    Object.defineProperty(Cell.prototype, "index", {
	        get: function () {
	            return this._index;
	        },
	        set: function (value) {
	            this._index = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Cell.prototype.clone = function () {
	        return new Cell(this.pointA.clone(), this.pointB.clone(), this.pointC.clone());
	    };
	    return Cell;
	}(Triangle_1$1.Triangle));
	exports.Cell = Cell;

	});

	unwrapExports(Cell_1);
	var Cell_2 = Cell_1.Cell;

	var WayPoint_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var WayPoint = (function () {
	    function WayPoint(cell, position) {
	        this.cell = cell;
	        this.position = position;
	    }
	    return WayPoint;
	}());
	exports.WayPoint = WayPoint;

	});

	unwrapExports(WayPoint_1);
	var WayPoint_2 = WayPoint_1.WayPoint;

	var Heap_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var HeapIterator = (function () {
	    function HeapIterator(heap) {
	        this._values = heap.toArray();
	        this._length = this._values.length;
	        this._cursor = 0;
	    }
	    Object.defineProperty(HeapIterator.prototype, "data", {
	        get: function () {
	            return this._values[this._cursor];
	        },
	        set: function (obj) {
	            this._values[this._cursor] = obj;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    HeapIterator.prototype.start = function () {
	        this._cursor = 0;
	    };
	    HeapIterator.prototype.hasNext = function () {
	        return this._cursor < this._length;
	    };
	    HeapIterator.prototype.next = function () {
	        return this._values[this._cursor++];
	    };
	    return HeapIterator;
	}());
	exports.HeapIterator = HeapIterator;
	var Heap = (function () {
	    function Heap(size, compare) {
	        if (compare === void 0) { compare = null; }
	        this._heap = new Array(this._size = size + 1);
	        this._count = 0;
	        if (compare == null)
	            this._compare = function (a, b) {
	                return a - b;
	            };
	        else
	            this._compare = compare;
	    }
	    Heap.prototype.peek = function () {
	        return this._heap[1];
	    };
	    Heap.prototype.maxSize = function () {
	        return this._size;
	    };
	    Heap.prototype.put = function (obj) {
	        if (this._count + 1 < this._size) {
	            this._heap[++this._count] = obj;
	            var i = this._count;
	            var parent = i >> 1;
	            var tmp = this._heap[i];
	            var v = void 0;
	            if (this._compare != null) {
	                while (parent > 0) {
	                    v = this._heap[parent];
	                    if (this._compare(tmp, v) > 0) {
	                        this._heap[i] = v;
	                        i = parent;
	                        parent >>= 1;
	                    }
	                    else
	                        break;
	                }
	            }
	            else {
	                while (parent > 0) {
	                    v = this._heap[parent];
	                    if (tmp - v > 0) {
	                        this._heap[i] = v;
	                        i = parent;
	                        parent >>= 1;
	                    }
	                    else
	                        break;
	                }
	            }
	            this._heap[i] = tmp;
	            return true;
	        }
	        return false;
	    };
	    Heap.prototype.pop = function () {
	        if (this._count >= 1) {
	            var o = this._heap[1];
	            this._heap[1] = this._heap[this._count];
	            delete this._heap[this._count];
	            var i = 1;
	            var child = i << 1;
	            var tmp = this._heap[i];
	            var v = void 0;
	            if (this._compare != null) {
	                while (child < this._count) {
	                    if (child < this._count - 1) {
	                        if (this._compare(this._heap[child], this._heap[child + 1]) < 0)
	                            child++;
	                    }
	                    v = this._heap[child];
	                    if (this._compare(tmp, v) < 0) {
	                        this._heap[i] = v;
	                        i = child;
	                        child <<= 1;
	                    }
	                    else
	                        break;
	                }
	            }
	            else {
	                while (child < this._count) {
	                    if (child < this._count - 1) {
	                        if (this._heap[child] - this._heap[child + 1] < 0)
	                            child++;
	                    }
	                    v = this._heap[child];
	                    if (tmp - v < 0) {
	                        this._heap[i] = v;
	                        i = child;
	                        child <<= 1;
	                    }
	                    else
	                        break;
	                }
	            }
	            this._heap[i] = tmp;
	            this._count--;
	            return o;
	        }
	        return null;
	    };
	    Heap.prototype.contains = function (obj) {
	        for (var i = 1; i <= this._count; i++) {
	            if (this._heap[i] === obj)
	                return true;
	        }
	        return false;
	    };
	    Heap.prototype.clear = function () {
	        this._heap = new Array(this._size);
	        this._count = 0;
	    };
	    Heap.prototype.getIterator = function () {
	        return new HeapIterator(this);
	    };
	    Object.defineProperty(Heap.prototype, "size", {
	        get: function () {
	            return this._count;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Heap.prototype.isEmpty = function () {
	        return false;
	    };
	    Heap.prototype.toArray = function () {
	        return this._heap.slice(1, this._count + 1);
	    };
	    Heap.prototype.toString = function () {
	        return "[Heap, size=" + this._size + "]";
	    };
	    Heap.prototype.dump = function () {
	        var s = "Heap\n{\n";
	        var k = this._count + 1;
	        for (var i = 1; i < k; i++)
	            s += "\t" + this._heap[i] + "\n";
	        s += "\n}";
	        return s;
	    };
	    return Heap;
	}());
	exports.Heap = Heap;

	});

	unwrapExports(Heap_1);
	var Heap_2 = Heap_1.HeapIterator;
	var Heap_3 = Heap_1.Heap;

	var WayPoint_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var WayPoint = (function () {
	    function WayPoint(cell, position) {
	        this.cell = cell;
	        this.position = position;
	    }
	    return WayPoint;
	}());
	exports.WayPoint = WayPoint;

	});

	unwrapExports(WayPoint_1$1);
	var WayPoint_2$1 = WayPoint_1$1.WayPoint;

	var Heap_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var HeapIterator = (function () {
	    function HeapIterator(heap) {
	        this._values = heap.toArray();
	        this._length = this._values.length;
	        this._cursor = 0;
	    }
	    Object.defineProperty(HeapIterator.prototype, "data", {
	        get: function () {
	            return this._values[this._cursor];
	        },
	        set: function (obj) {
	            this._values[this._cursor] = obj;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    HeapIterator.prototype.start = function () {
	        this._cursor = 0;
	    };
	    HeapIterator.prototype.hasNext = function () {
	        return this._cursor < this._length;
	    };
	    HeapIterator.prototype.next = function () {
	        return this._values[this._cursor++];
	    };
	    return HeapIterator;
	}());
	exports.HeapIterator = HeapIterator;
	var Heap = (function () {
	    function Heap(size, compare) {
	        if (compare === void 0) { compare = null; }
	        this._heap = new Array(this._size = size + 1);
	        this._count = 0;
	        if (compare == null)
	            this._compare = function (a, b) {
	                return a - b;
	            };
	        else
	            this._compare = compare;
	    }
	    Heap.prototype.peek = function () {
	        return this._heap[1];
	    };
	    Heap.prototype.maxSize = function () {
	        return this._size;
	    };
	    Heap.prototype.put = function (obj) {
	        if (this._count + 1 < this._size) {
	            this._heap[++this._count] = obj;
	            var i = this._count;
	            var parent = i >> 1;
	            var tmp = this._heap[i];
	            var v = void 0;
	            if (this._compare != null) {
	                while (parent > 0) {
	                    v = this._heap[parent];
	                    if (this._compare(tmp, v) > 0) {
	                        this._heap[i] = v;
	                        i = parent;
	                        parent >>= 1;
	                    }
	                    else
	                        break;
	                }
	            }
	            else {
	                while (parent > 0) {
	                    v = this._heap[parent];
	                    if (tmp - v > 0) {
	                        this._heap[i] = v;
	                        i = parent;
	                        parent >>= 1;
	                    }
	                    else
	                        break;
	                }
	            }
	            this._heap[i] = tmp;
	            return true;
	        }
	        return false;
	    };
	    Heap.prototype.pop = function () {
	        if (this._count >= 1) {
	            var o = this._heap[1];
	            this._heap[1] = this._heap[this._count];
	            delete this._heap[this._count];
	            var i = 1;
	            var child = i << 1;
	            var tmp = this._heap[i];
	            var v = void 0;
	            if (this._compare != null) {
	                while (child < this._count) {
	                    if (child < this._count - 1) {
	                        if (this._compare(this._heap[child], this._heap[child + 1]) < 0)
	                            child++;
	                    }
	                    v = this._heap[child];
	                    if (this._compare(tmp, v) < 0) {
	                        this._heap[i] = v;
	                        i = child;
	                        child <<= 1;
	                    }
	                    else
	                        break;
	                }
	            }
	            else {
	                while (child < this._count) {
	                    if (child < this._count - 1) {
	                        if (this._heap[child] - this._heap[child + 1] < 0)
	                            child++;
	                    }
	                    v = this._heap[child];
	                    if (tmp - v < 0) {
	                        this._heap[i] = v;
	                        i = child;
	                        child <<= 1;
	                    }
	                    else
	                        break;
	                }
	            }
	            this._heap[i] = tmp;
	            this._count--;
	            return o;
	        }
	        return null;
	    };
	    Heap.prototype.contains = function (obj) {
	        for (var i = 1; i <= this._count; i++) {
	            if (this._heap[i] === obj)
	                return true;
	        }
	        return false;
	    };
	    Heap.prototype.clear = function () {
	        this._heap = new Array(this._size);
	        this._count = 0;
	    };
	    Heap.prototype.getIterator = function () {
	        return new HeapIterator(this);
	    };
	    Object.defineProperty(Heap.prototype, "size", {
	        get: function () {
	            return this._count;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Heap.prototype.isEmpty = function () {
	        return false;
	    };
	    Heap.prototype.toArray = function () {
	        return this._heap.slice(1, this._count + 1);
	    };
	    Heap.prototype.toString = function () {
	        return "[Heap, size=" + this._size + "]";
	    };
	    Heap.prototype.dump = function () {
	        var s = "Heap\n{\n";
	        var k = this._count + 1;
	        for (var i = 1; i < k; i++)
	            s += "\t" + this._heap[i] + "\n";
	        s += "\n}";
	        return s;
	    };
	    return Heap;
	}());
	exports.Heap = Heap;

	});

	unwrapExports(Heap_1$1);
	var Heap_2$1 = Heap_1$1.HeapIterator;
	var Heap_3$1 = Heap_1$1.Heap;

	var NavMesh_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var NavMesh = (function () {
	    function NavMesh(cellVector) {
	        this.EPSILON = 0.000001;
	        this.pathSessionId = 0;
	        this.m_CellVector = new Array();
	        this.m_CellVector = cellVector;
	        this.openList = new Heap_1$1.Heap(this.m_CellVector.length, function (a, b) {
	            return b.f - a.f;
	        });
	        this.closeList = [];
	    }
	    NavMesh.prototype.getCell = function (index) {
	        return this.m_CellVector[index];
	    };
	    NavMesh.prototype.findClosestCell = function (pt) {
	        for (var _i = 0, _a = this.m_CellVector; _i < _a.length; _i++) {
	            var pCell = _a[_i];
	            if (pCell.isPointIn(pt)) {
	                return pCell;
	            }
	        }
	        return null;
	    };
	    NavMesh.prototype.findPath = function (startPointPx, endPointPx) {
	        var stime = new Date().getTime();
	        this.pathSessionId++;
	        var startPos = new Vector2f_1$1.Vector2f(startPointPx.x, startPointPx.y);
	        var endPos = new Vector2f_1$1.Vector2f(endPointPx.x, endPointPx.y);
	        var startCell = this.findClosestCell(startPos);
	        var endCell = this.findClosestCell(endPos);
	        if (startCell == null || endCell == null) {
	            console.log("没有路径。");
	            return null;
	        }
	        var outPath;
	        if (startCell === endCell) {
	            outPath = [startPointPx, endPointPx];
	        }
	        else {
	            outPath = this.buildPath(startCell, startPos, endCell, endPos);
	        }
	        console.log("寻路时间：", new Date().getTime() - stime);
	        console.log(outPath);
	        for (var _i = 0, _a = this.m_CellVector; _i < _a.length; _i++) {
	            var cell = _a[_i];
	            cell.isOpen = false;
	            cell.parent = null;
	            cell.sessionId = 0;
	            cell.h = 0;
	            cell.f = 0;
	        }
	        return outPath;
	    };
	    NavMesh.prototype.buildPath = function (startCell, startPos, endCell, endPos) {
	        this.openList.clear();
	        this.closeList.length = 0;
	        this.openList.put(endCell);
	        endCell.f = 0;
	        endCell.h = 0;
	        endCell.isOpen = false;
	        endCell.parent = null;
	        endCell.sessionId = this.pathSessionId;
	        var foundPath = false;
	        var currNode;
	        var adjacentTmp = null;
	        while (this.openList.size > 0) {
	            currNode = this.openList.pop();
	            this.closeList.push(currNode);
	            if (currNode === startCell) {
	                foundPath = true;
	                break;
	            }
	            var adjacentId = void 0;
	            for (var i = 0; i < 3; i++) {
	                adjacentId = currNode.links[i];
	                if (adjacentId < 0) {
	                    continue;
	                }
	                else {
	                    adjacentTmp = this.m_CellVector[adjacentId];
	                }
	                if (adjacentTmp != null) {
	                    if (adjacentTmp.sessionId !== this.pathSessionId) {
	                        adjacentTmp.sessionId = this.pathSessionId;
	                        adjacentTmp.parent = currNode;
	                        adjacentTmp.isOpen = true;
	                        adjacentTmp.computeHeuristic(startPos);
	                        adjacentTmp.f = currNode.f + adjacentTmp.m_WallDistance[Math.abs(i - currNode.m_ArrivalWall)];
	                        this.openList.put(adjacentTmp);
	                        adjacentTmp.setAndGetArrivalWall(currNode.index);
	                    }
	                    else {
	                        if (adjacentTmp.isOpen) {
	                            if (currNode.f + adjacentTmp.m_WallDistance[Math.abs(i - currNode.m_ArrivalWall)] < adjacentTmp.f) {
	                                adjacentTmp.f = currNode.f;
	                                adjacentTmp.parent = currNode;
	                                adjacentTmp.setAndGetArrivalWall(currNode.index);
	                            }
	                        }
	                        else {
	                            adjacentTmp = null;
	                        }
	                    }
	                }
	            }
	        }
	        if (foundPath) {
	            return this.getPath(startPos, endPos);
	        }
	        else {
	            return null;
	        }
	    };
	    NavMesh.prototype.getCellPath = function () {
	        var pth = new Array();
	        var st = this.closeList[this.closeList.length - 1];
	        pth.push(st);
	        while (st.parent != null) {
	            pth.push(st.parent);
	            st = st.parent;
	        }
	        return pth;
	    };
	    NavMesh.prototype.getPath = function (start, end) {
	        var cellPath = this.getCellPath();
	        if (cellPath == null || cellPath.length === 0) {
	            return null;
	        }
	        var pathArr = new Array();
	        pathArr.push(start.toPoint());
	        if (cellPath.length === 1) {
	            pathArr.push(end.toPoint());
	            return pathArr;
	        }
	        var wayPoint = new WayPoint_1$1.WayPoint(cellPath[0], start);
	        while (!wayPoint.position.equals(end)) {
	            wayPoint = this.getFurthestWayPoint(wayPoint, cellPath, end);
	            pathArr.push(wayPoint.position.toPoint());
	        }
	        return pathArr;
	    };
	    NavMesh.prototype.getFurthestWayPoint = function (wayPoint, cellPath, end) {
	        var startPt = wayPoint.position;
	        var cell = wayPoint.cell;
	        var lastCell = cell;
	        var startIndex = cellPath.indexOf(cell);
	        var outSide = cell.sides[cell.m_ArrivalWall];
	        var lastPtA = outSide.getPointA();
	        var lastPtB = outSide.getPointB();
	        var lastLineA = new Line2D_1$1.Line2D(startPt, lastPtA);
	        var lastLineB = new Line2D_1$1.Line2D(startPt, lastPtB);
	        var testPtA, testPtB;
	        for (var i = startIndex + 1; i < cellPath.length; i++) {
	            cell = cellPath[i];
	            outSide = cell.sides[cell.m_ArrivalWall];
	            if (i === cellPath.length - 1) {
	                testPtA = end;
	                testPtB = end;
	            }
	            else {
	                testPtA = outSide.getPointA();
	                testPtB = outSide.getPointB();
	            }
	            if (!lastPtA.equals(testPtA)) {
	                if (lastLineB.classifyPoint(testPtA, this.EPSILON) === PointClassification_1$1.PointClassification.RIGHT_SIDE) {
	                    return new WayPoint_1$1.WayPoint(lastCell, lastPtB);
	                }
	                else {
	                    if (lastLineA.classifyPoint(testPtA, this.EPSILON) !== PointClassification_1$1.PointClassification.LEFT_SIDE) {
	                        lastPtA = testPtA;
	                        lastCell = cell;
	                        lastLineA.setPointB(lastPtA);
	                    }
	                }
	            }
	            if (!lastPtB.equals(testPtB)) {
	                if (lastLineA.classifyPoint(testPtB, this.EPSILON) === PointClassification_1$1.PointClassification.LEFT_SIDE) {
	                    return new WayPoint_1$1.WayPoint(lastCell, lastPtA);
	                }
	                else {
	                    if (lastLineB.classifyPoint(testPtB, this.EPSILON) !== PointClassification_1$1.PointClassification.RIGHT_SIDE) {
	                        lastPtB = testPtB;
	                        lastCell = cell;
	                        lastLineB.setPointB(lastPtB);
	                    }
	                }
	            }
	        }
	        return new WayPoint_1$1.WayPoint(cellPath[cellPath.length - 1], end);
	    };
	    return NavMesh;
	}());
	exports.NavMesh = NavMesh;

	});

	unwrapExports(NavMesh_1);
	var NavMesh_2 = NavMesh_1.NavMesh;

	var Delaunay_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	var Delaunay = (function () {
	    function Delaunay() {
	        this.EPSILON = 0.000001;
	    }
	    Delaunay.prototype.createDelaunay = function (polyV) {
	        this.initData(polyV);
	        var initEdge = this.getInitOutEdge();
	        this.lineV.push(initEdge);
	        var edge;
	        do {
	            edge = this.lineV.pop();
	            var p3 = this.findDT(edge);
	            if (p3 == null)
	                continue;
	            var line13 = new Line2D_1$1.Line2D(edge.getPointA(), p3);
	            var line32 = new Line2D_1$1.Line2D(p3, edge.getPointB());
	            var trg = new Triangle_1$1.Triangle(edge.getPointA(), edge.getPointB(), p3);
	            this.triangleV.push(trg);
	            var index = void 0;
	            if (this.indexOfVector(line13, this.edgeV) < 0) {
	                index = this.indexOfVector(line13, this.lineV);
	                if (index > -1) {
	                    this.lineV.splice(index, 1);
	                }
	                else {
	                    this.lineV.push(line13);
	                }
	            }
	            if (this.indexOfVector(line32, this.edgeV) < 0) {
	                index = this.indexOfVector(line32, this.lineV);
	                if (index > -1) {
	                    this.lineV.splice(index, 1);
	                }
	                else {
	                    this.lineV.push(line32);
	                }
	            }
	        } while (this.lineV.length > 0);
	        return this.triangleV;
	    };
	    Delaunay.prototype.initData = function (polyV) {
	        this.vertexV = new Array();
	        this.edgeV = new Array();
	        var poly;
	        for (var i = 0; i < polyV.length; i++) {
	            poly = polyV[i];
	            this.putVertex(this.vertexV, poly.vertexV);
	            this.putEdge(this.edgeV, poly.vertexV);
	        }
	        this.outEdgeVecNmu = polyV[0].vertexNmu;
	        this.lineV = new Array();
	        this.triangleV = new Array();
	    };
	    Delaunay.prototype.getInitOutEdge = function () {
	        var initEdge = this.edgeV[0];
	        var loopSign;
	        var loopIdx = 0;
	        var self = this;
	        do {
	            loopSign = false;
	            loopIdx++;
	            for (var _i = 0, _a = this.vertexV; _i < _a.length; _i++) {
	                var testV = _a[_i];
	                if (testV.equals(initEdge.getPointA()) || testV.equals(initEdge.getPointB())) ;
	                if (initEdge.classifyPoint(testV, self.EPSILON) === PointClassification_1$1.PointClassification.ON_LINE) {
	                    loopSign = true;
	                    initEdge = self.edgeV[loopIdx];
	                    break;
	                }
	            }
	        } while (loopSign && loopIdx < this.outEdgeVecNmu - 1);
	        return initEdge;
	    };
	    Delaunay.prototype.putVertex = function (dstV, srcV) {
	        srcV.forEach(function (item) {
	            dstV.push(item);
	        });
	    };
	    Delaunay.prototype.putEdge = function (dstV, srcV) {
	        if (srcV.length < 3)
	            return;
	        var p1 = srcV[0];
	        var p2;
	        for (var i = 1; i < srcV.length; i++) {
	            p2 = srcV[i];
	            dstV.push(new Line2D_1$1.Line2D(p1, p2));
	            p1 = p2;
	        }
	        p2 = srcV[0];
	        dstV.push(new Line2D_1$1.Line2D(p1, p2));
	    };
	    Delaunay.prototype.indexOfVector = function (line, vector) {
	        var lt;
	        for (var i = 0; i < vector.length; i++) {
	            lt = vector[i];
	            if (lt.equals(line))
	                return i;
	        }
	        return -1;
	    };
	    Delaunay.prototype.findDT = function (line) {
	        var p1 = line.getPointA();
	        var p2 = line.getPointB();
	        var allVPoint = new Array();
	        var self = this;
	        this.vertexV.forEach(function (vt) {
	            if (self.isVisiblePointOfLine(vt, line)) {
	                allVPoint.push(vt);
	            }
	        });
	        if (allVPoint.length === 0)
	            return null;
	        var p3 = allVPoint[0];
	        var loopSign = false;
	        var sameAnglePointsMap = {};
	        do {
	            loopSign = false;
	            var circle = this.circumCircle(p1, p2, p3);
	            var boundsBox = this.circleBounds(circle);
	            var angle132 = this.lineAngle(p1, p3, p2);
	            for (var _i = 0, allVPoint_1 = allVPoint; _i < allVPoint_1.length; _i++) {
	                var vec = allVPoint_1[_i];
	                if (vec.equals(p1) || vec.equals(p2) || vec.equals(p3)) {
	                    continue;
	                }
	                if (boundsBox.contains(vec.x, vec.y) === false) {
	                    continue;
	                }
	                var a1 = this.lineAngle(p1, vec, p2);
	                if (Math.abs(a1) > Math.abs(angle132)) {
	                    p3 = vec;
	                    loopSign = true;
	                    sameAnglePointsMap = {};
	                    break;
	                }
	                else if (Math.abs(a1) == Math.abs(angle132)) {
	                    var arg = Math.abs(a1);
	                    if (a1 > 0) {
	                        sameAnglePointsMap[arg] = vec;
	                    }
	                    else {
	                        sameAnglePointsMap[arg] = p3;
	                    }
	                }
	            }
	        } while (loopSign);
	        var p3Angle = this.lineAngle(p1, p3, p2);
	        return sameAnglePointsMap[p3Angle] || p3;
	    };
	    Delaunay.prototype.lineAngle = function (s, o, e) {
	        var cosfi, fi, norm;
	        var dsx = s.x - o.x;
	        var dsy = s.y - o.y;
	        var dex = e.x - o.x;
	        var dey = e.y - o.y;
	        cosfi = dsx * dex + dsy * dey;
	        norm = (dsx * dsx + dsy * dsy) * (dex * dex + dey * dey);
	        cosfi /= Math.sqrt(norm);
	        if (cosfi >= 1.0)
	            return 0;
	        if (cosfi <= -1.0)
	            return -Math.PI;
	        fi = Math.acos(cosfi);
	        if (dsx * dey - dsy * dex > 0)
	            return fi;
	        return -fi;
	    };
	    Delaunay.prototype.circleBounds = function (c) {
	        return new Rectangle_1$1.Rectangle(c.center.x - c.r, c.center.y - c.r, c.r * 2, c.r * 2);
	    };
	    Delaunay.prototype.circumCircle = function (p1, p2, p3) {
	        var m1, m2, mx1, mx2, my1, my2;
	        var dx, dy, rsqr;
	        var xc, yc, r;
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
	        }
	        else if (Math.abs(p3.y - p2.y) < this.EPSILON) {
	            xc = (p3.x + p2.x) / 2.0;
	            yc = m1 * (xc - mx1) + my1;
	        }
	        else {
	            xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
	            yc = m1 * (xc - mx1) + my1;
	        }
	        dx = p2.x - xc;
	        dy = p2.y - yc;
	        rsqr = dx * dx + dy * dy;
	        r = Math.sqrt(rsqr);
	        return new Circle(new Vector2f_1$1.Vector2f(xc, yc), r);
	    };
	    Delaunay.prototype.isVisiblePointOfLine = function (vec, line) {
	        if (vec.equals(line.getPointA()) || vec.equals(line.getPointB())) {
	            return false;
	        }
	        if (line.classifyPoint(vec, this.EPSILON) !== PointClassification_1$1.PointClassification.RIGHT_SIDE) {
	            return false;
	        }
	        if (this.isVisibleIn2Point(line.getPointA(), vec) === false) {
	            return false;
	        }
	        return this.isVisibleIn2Point(line.getPointB(), vec) !== false;
	    };
	    Delaunay.prototype.isVisibleIn2Point = function (pa, pb) {
	        var linepapb = new Line2D_1$1.Line2D(pa, pb);
	        var interscetVector = new Vector2f_1$1.Vector2f();
	        for (var _i = 0, _a = this.edgeV; _i < _a.length; _i++) {
	            var lineTmp = _a[_i];
	            if (linepapb.intersection(lineTmp, interscetVector) === LineClassification_1$1.LineClassification.SEGMENTS_INTERSECT) {
	                if (!pa.equals(interscetVector) && !pb.equals(interscetVector)) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    };
	    return Delaunay;
	}());
	exports.Delaunay = Delaunay;
	var Circle = (function () {
	    function Circle(cen, r) {
	        this.center = cen;
	        this.r = r;
	    }
	    return Circle;
	}());

	});

	unwrapExports(Delaunay_1$1);
	var Delaunay_2$1 = Delaunay_1$1.Delaunay;

	var Polygon_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var InnerNode = (function () {
	    function InnerNode(pt, isInters, main) {
	        this.p = false;
	        this.o = false;
	        this.v = pt;
	        this.i = isInters;
	        this.isMain = main;
	    }
	    InnerNode.prototype.toString = function () {
	        return this.v.toString() + "-->交点：" + this.i + "出点：" + this.o + "主：" + this.isMain + "处理：" + this.p;
	    };
	    return InnerNode;
	}());
	var Polygon = (function () {
	    function Polygon(vertexNmu, vertexV) {
	        this.vertexNmu = vertexNmu;
	        this.vertexV = vertexV;
	    }
	    Polygon.prototype.isSimplicity = function () {
	        var edges = new Array();
	        var len = this.vertexV.length - 1;
	        for (var i = 0; i < len; i++) {
	            edges.push(new Line2D_1$1.Line2D(this.vertexV[i], this.vertexV[i + 1]));
	        }
	        edges.push(new Line2D_1$1.Line2D(this.vertexV[len], this.vertexV[0]));
	        var itsPt = new Vector2f_1$1.Vector2f();
	        for (var _i = 0, edges_1 = edges; _i < edges_1.length; _i++) {
	            var testLine = edges_1[_i];
	            for (var j = 0; j < edges.length; j++) {
	                if (!testLine.equals(edges[j])) {
	                    if (testLine.intersection(edges[j], itsPt) === LineClassification_1$1.LineClassification.SEGMENTS_INTERSECT) {
	                        if (itsPt.equals(testLine.getPointA()) || itsPt.equals(testLine.getPointB())
	                            || itsPt.equals(edges[j].getPointA()) || itsPt.equals(edges[j].getPointB())) ;
	                        else {
	                            return false;
	                        }
	                    }
	                }
	            }
	        }
	        return true;
	    };
	    Polygon.prototype.cw = function () {
	        if (this.isCW() === false) {
	            this.vertexV.reverse();
	        }
	    };
	    Polygon.prototype.isCW = function () {
	        if (this.vertexV == null || this.vertexV.length < 0)
	            return false;
	        var topPt = this.vertexV[0];
	        var topPtId = 0;
	        for (var i = 1; i < this.vertexV.length; i++) {
	            if (topPt.y > this.vertexV[i].y) {
	                topPt = this.vertexV[i];
	                topPtId = i;
	            }
	            else if (topPt.y === this.vertexV[i].y) {
	                if (topPt.x > this.vertexV[i].x) {
	                    topPt = this.vertexV[i];
	                    topPtId = i;
	                }
	            }
	        }
	        var lastId = topPtId - 1 >= 0 ? topPtId - 1 : this.vertexV.length - 1;
	        var nextId = topPtId + 1 >= this.vertexV.length ? 0 : topPtId + 1;
	        var last = this.vertexV[lastId];
	        var next = this.vertexV[nextId];
	        var r = Polygon.multiply(last, next, topPt);
	        return r < 0;
	    };
	    Polygon.multiply = function (sp, ep, op) {
	        return ((sp.x - op.x) * (ep.y - op.y) - (ep.x - op.x) * (sp.y - op.y));
	    };
	    Polygon.prototype.rectangle = function () {
	        if (this.vertexV == null || this.vertexV.length < 0)
	            return null;
	        if (this.rect != null)
	            return this.rect;
	        var lx = this.vertexV[0].x;
	        var rx = this.vertexV[0].x;
	        var ty = this.vertexV[0].y;
	        var by = this.vertexV[0].y;
	        var v;
	        for (var i = 1; i < this.vertexV.length; i++) {
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
	        this.rect = new Rectangle_1$1.Rectangle(lx, ty, rx - lx, by - ty);
	        return this.rect;
	    };
	    Polygon.prototype.union = function (polygon) {
	        var intersectRect = this.rectangle().intersection(polygon.rectangle());
	        if (!intersectRect || intersectRect.isEmpty() === true) {
	            return null;
	        }
	        var cv0 = new Array();
	        var cv1 = new Array();
	        var node;
	        for (var i = 0; i < this.vertexV.length; i++) {
	            node = new InnerNode(this.vertexV[i], false, true);
	            if (i > 0) {
	                cv0[i - 1].next = node;
	            }
	            cv0.push(node);
	        }
	        for (var j = 0; j < polygon.vertexV.length; j++) {
	            node = new InnerNode(polygon.vertexV[j], false, false);
	            if (j > 0) {
	                cv1[j - 1].next = node;
	            }
	            cv1.push(node);
	        }
	        var insCnt = Polygon.intersectPoint(cv0, cv1);
	        if (insCnt > 0) {
	            return this.linkToPolygon(cv0, cv1);
	        }
	        else {
	            return null;
	        }
	    };
	    Polygon.prototype.linkToPolygon = function (cv0, cv1) {
	        var rtV = new Array();
	        cv0.forEach(function (testNode) {
	            if (testNode.i === true && testNode.p === false) {
	                var rcNodes = new Array();
	                while (testNode) {
	                    testNode.p = true;
	                    if (testNode.i === true) {
	                        testNode.other.p = true;
	                        if (testNode.o === false) {
	                            if (testNode.isMain === true) {
	                                testNode = testNode.other;
	                            }
	                        }
	                        else {
	                            if (testNode.isMain === false) {
	                                testNode = testNode.other;
	                            }
	                        }
	                    }
	                    rcNodes.push(testNode.v);
	                    if (testNode.next == null) {
	                        if (testNode.isMain) {
	                            testNode = cv0[0];
	                        }
	                        else {
	                            testNode = cv1[0];
	                        }
	                    }
	                    else {
	                        testNode = testNode.next;
	                    }
	                    if (testNode.v.equals(rcNodes[0]))
	                        break;
	                }
	                rtV.push(new Polygon(rcNodes.length, rcNodes));
	            }
	        });
	        return rtV;
	    };
	    Polygon.intersectPoint = function (cv0, cv1) {
	        var insCnt = 0;
	        var startNode0 = cv0[0];
	        var startNode1;
	        var line0;
	        var line1;
	        var ins;
	        var hasIns;
	        while (startNode0 != null) {
	            if (startNode0.next == null) {
	                line0 = new Line2D_1$1.Line2D(startNode0.v, cv0[0].v);
	            }
	            else {
	                line0 = new Line2D_1$1.Line2D(startNode0.v, startNode0.next.v);
	            }
	            startNode1 = cv1[0];
	            hasIns = false;
	            while (startNode1 != null) {
	                if (startNode1.next == null) {
	                    line1 = new Line2D_1$1.Line2D(startNode1.v, cv1[0].v);
	                }
	                else {
	                    line1 = new Line2D_1$1.Line2D(startNode1.v, startNode1.next.v);
	                }
	                ins = new Vector2f_1$1.Vector2f();
	                if (line0.intersection(line1, ins) === LineClassification_1$1.LineClassification.SEGMENTS_INTERSECT) {
	                    if (Polygon.getNodeIndex(cv0, ins) === -1) {
	                        insCnt++;
	                        var node0 = new InnerNode(ins, true, true);
	                        var node1 = new InnerNode(ins, true, false);
	                        cv0.push(node0);
	                        cv1.push(node1);
	                        node0.other = node1;
	                        node1.other = node0;
	                        node0.next = startNode0.next;
	                        startNode0.next = node0;
	                        node1.next = startNode1.next;
	                        startNode1.next = node1;
	                        if (line0.classifyPoint(line1.getPointB()) === PointClassification_1$1.PointClassification.RIGHT_SIDE) {
	                            node0.o = true;
	                            node1.o = true;
	                        }
	                        hasIns = true;
	                        break;
	                    }
	                }
	                startNode1 = startNode1.next;
	            }
	            if (hasIns === false) {
	                startNode0 = startNode0.next;
	            }
	        }
	        return insCnt;
	    };
	    Polygon.getNodeIndex = function (cv, node) {
	        for (var i = 0; i < cv.length; i++) {
	            if (cv[i].v.equals(node)) {
	                return i;
	            }
	        }
	        return -1;
	    };
	    Polygon.prototype.toString = function () {
	        var rs = "Polygon:";
	        for (var i = 0; i < this.vertexV.length; i++) {
	            rs += " -> " + this.vertexV[i];
	        }
	        return rs;
	    };
	    return Polygon;
	}());
	exports.Polygon = Polygon;

	});

	unwrapExports(Polygon_1$1);
	var Polygon_2$1 = Polygon_1$1.Polygon;

	var Cell_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var Cell = (function (_super) {
	    tslib_es6.__extends(Cell, _super);
	    function Cell(p1, p2, p3) {
	        if (p1 === void 0) { p1 = null; }
	        if (p2 === void 0) { p2 = null; }
	        if (p3 === void 0) { p3 = null; }
	        var _this = _super.call(this, p1, p2, p3) || this;
	        _this.isOpen = false;
	        _this.init();
	        return _this;
	    }
	    Object.defineProperty(Cell.prototype, "links", {
	        get: function () {
	            return this._links;
	        },
	        set: function (value) {
	            this._links = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Cell.prototype.init = function () {
	        this.links = new Array();
	        this.links.push(-1);
	        this.links.push(-1);
	        this.links.push(-1);
	        this.calculateData();
	        this.m_WallMidpoint = new Array();
	        this.m_WallDistance = new Array();
	        this.m_WallMidpoint[0] = new Vector2f_1$1.Vector2f((this.pointA.x + this.pointB.x) / 2.0, (this.pointA.y + this.pointB.y) / 2.0);
	        this.m_WallMidpoint[1] = new Vector2f_1$1.Vector2f((this.pointC.x + this.pointB.x) / 2.0, (this.pointC.y + this.pointB.y) / 2.0);
	        this.m_WallMidpoint[2] = new Vector2f_1$1.Vector2f((this.pointC.x + this.pointA.x) / 2.0, (this.pointC.y + this.pointA.y) / 2.0);
	        var wallVector;
	        wallVector = this.m_WallMidpoint[0].subtract(this.m_WallMidpoint[1]);
	        this.m_WallDistance[0] = wallVector.length();
	        wallVector = this.m_WallMidpoint[1].subtract(this.m_WallMidpoint[2]);
	        this.m_WallDistance[1] = wallVector.length();
	        wallVector = this.m_WallMidpoint[2].subtract(this.m_WallMidpoint[0]);
	        this.m_WallDistance[2] = wallVector.length();
	    };
	    Cell.prototype.requestLink = function (pA, pB, caller) {
	        if (this.pointA.equals(pA)) {
	            if (this.pointB.equals(pB)) {
	                this.links[this.SIDE_AB] = caller.index;
	                return true;
	            }
	            else if (this.pointC.equals(pB)) {
	                this.links[this.SIDE_CA] = caller.index;
	                return true;
	            }
	        }
	        else if (this.pointB.equals(pA)) {
	            if (this.pointA.equals(pB)) {
	                this.links[this.SIDE_AB] = caller.index;
	                return true;
	            }
	            else if (this.pointC.equals(pB)) {
	                this.links[this.SIDE_BC] = caller.index;
	                return true;
	            }
	        }
	        else if (this.pointC.equals(pA)) {
	            if (this.pointA.equals(pB)) {
	                this.links[this.SIDE_CA] = caller.index;
	                return true;
	            }
	            else if (this.pointB.equals(pB)) {
	                this.links[this.SIDE_BC] = caller.index;
	                return true;
	            }
	        }
	        return false;
	    };
	    Cell.prototype.getLink = function (side) {
	        return this.links[side];
	    };
	    Cell.prototype.checkAndLink = function (cellB) {
	        if (this.getLink(this.SIDE_AB) === -1 && cellB.requestLink(this.pointA, this.pointB, this)) {
	            this.setLink(this.SIDE_AB, cellB);
	        }
	        else if (this.getLink(this.SIDE_BC) === -1 && cellB.requestLink(this.pointB, this.pointC, this)) {
	            this.setLink(this.SIDE_BC, cellB);
	        }
	        else if (this.getLink(this.SIDE_CA) === -1 && cellB.requestLink(this.pointC, this.pointA, this)) {
	            this.setLink(this.SIDE_CA, cellB);
	        }
	    };
	    Cell.prototype.setLink = function (side, caller) {
	        this.links[side] = caller.index;
	    };
	    Cell.prototype.setAndGetArrivalWall = function (index) {
	        if (index === this.links[0]) {
	            this.m_ArrivalWall = 0;
	            return 0;
	        }
	        else if (index === this.links[1]) {
	            this.m_ArrivalWall = 1;
	            return 1;
	        }
	        else if (index === this.links[2]) {
	            this.m_ArrivalWall = 2;
	            return 2;
	        }
	        return -1;
	    };
	    Cell.prototype.computeHeuristic = function (goal) {
	        var XDelta = Math.abs(goal.x - this.center.x);
	        var YDelta = Math.abs(goal.y - this.center.y);
	        this.h = XDelta + YDelta;
	    };
	    Object.defineProperty(Cell.prototype, "index", {
	        get: function () {
	            return this._index;
	        },
	        set: function (value) {
	            this._index = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Cell.prototype.clone = function () {
	        return new Cell(this.pointA.clone(), this.pointB.clone(), this.pointC.clone());
	    };
	    return Cell;
	}(Triangle_1$1.Triangle));
	exports.Cell = Cell;

	});

	unwrapExports(Cell_1$1);
	var Cell_2$1 = Cell_1$1.Cell;

	var NavMesh_1$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var NavMesh = (function () {
	    function NavMesh(cellVector) {
	        this.EPSILON = 0.000001;
	        this.pathSessionId = 0;
	        this.m_CellVector = new Array();
	        this.m_CellVector = cellVector;
	        this.openList = new Heap_1$1.Heap(this.m_CellVector.length, function (a, b) {
	            return b.f - a.f;
	        });
	        this.closeList = [];
	    }
	    NavMesh.prototype.getCell = function (index) {
	        return this.m_CellVector[index];
	    };
	    NavMesh.prototype.findClosestCell = function (pt) {
	        for (var _i = 0, _a = this.m_CellVector; _i < _a.length; _i++) {
	            var pCell = _a[_i];
	            if (pCell.isPointIn(pt)) {
	                return pCell;
	            }
	        }
	        return null;
	    };
	    NavMesh.prototype.findPath = function (startPointPx, endPointPx) {
	        var stime = new Date().getTime();
	        this.pathSessionId++;
	        var startPos = new Vector2f_1$1.Vector2f(startPointPx.x, startPointPx.y);
	        var endPos = new Vector2f_1$1.Vector2f(endPointPx.x, endPointPx.y);
	        var startCell = this.findClosestCell(startPos);
	        var endCell = this.findClosestCell(endPos);
	        if (startCell == null || endCell == null) {
	            console.log("没有路径。");
	            return null;
	        }
	        var outPath;
	        if (startCell === endCell) {
	            outPath = [startPointPx, endPointPx];
	        }
	        else {
	            outPath = this.buildPath(startCell, startPos, endCell, endPos);
	        }
	        console.log("寻路时间：", new Date().getTime() - stime);
	        console.log(outPath);
	        for (var _i = 0, _a = this.m_CellVector; _i < _a.length; _i++) {
	            var cell = _a[_i];
	            cell.isOpen = false;
	            cell.parent = null;
	            cell.sessionId = 0;
	            cell.h = 0;
	            cell.f = 0;
	        }
	        return outPath;
	    };
	    NavMesh.prototype.buildPath = function (startCell, startPos, endCell, endPos) {
	        this.openList.clear();
	        this.closeList.length = 0;
	        this.openList.put(endCell);
	        endCell.f = 0;
	        endCell.h = 0;
	        endCell.isOpen = false;
	        endCell.parent = null;
	        endCell.sessionId = this.pathSessionId;
	        var foundPath = false;
	        var currNode;
	        var adjacentTmp = null;
	        while (this.openList.size > 0) {
	            currNode = this.openList.pop();
	            this.closeList.push(currNode);
	            if (currNode === startCell) {
	                foundPath = true;
	                break;
	            }
	            var adjacentId = void 0;
	            for (var i = 0; i < 3; i++) {
	                adjacentId = currNode.links[i];
	                if (adjacentId < 0) {
	                    continue;
	                }
	                else {
	                    adjacentTmp = this.m_CellVector[adjacentId];
	                }
	                if (adjacentTmp != null) {
	                    if (adjacentTmp.sessionId !== this.pathSessionId) {
	                        adjacentTmp.sessionId = this.pathSessionId;
	                        adjacentTmp.parent = currNode;
	                        adjacentTmp.isOpen = true;
	                        adjacentTmp.computeHeuristic(startPos);
	                        adjacentTmp.f = currNode.f + adjacentTmp.m_WallDistance[Math.abs(i - currNode.m_ArrivalWall)];
	                        this.openList.put(adjacentTmp);
	                        adjacentTmp.setAndGetArrivalWall(currNode.index);
	                    }
	                    else {
	                        if (adjacentTmp.isOpen) {
	                            if (currNode.f + adjacentTmp.m_WallDistance[Math.abs(i - currNode.m_ArrivalWall)] < adjacentTmp.f) {
	                                adjacentTmp.f = currNode.f;
	                                adjacentTmp.parent = currNode;
	                                adjacentTmp.setAndGetArrivalWall(currNode.index);
	                            }
	                        }
	                        else {
	                            adjacentTmp = null;
	                        }
	                    }
	                }
	            }
	        }
	        if (foundPath) {
	            return this.getPath(startPos, endPos);
	        }
	        else {
	            return null;
	        }
	    };
	    NavMesh.prototype.getCellPath = function () {
	        var pth = new Array();
	        var st = this.closeList[this.closeList.length - 1];
	        pth.push(st);
	        while (st.parent != null) {
	            pth.push(st.parent);
	            st = st.parent;
	        }
	        return pth;
	    };
	    NavMesh.prototype.getPath = function (start, end) {
	        var cellPath = this.getCellPath();
	        if (cellPath == null || cellPath.length === 0) {
	            return null;
	        }
	        var pathArr = new Array();
	        pathArr.push(start.toPoint());
	        if (cellPath.length === 1) {
	            pathArr.push(end.toPoint());
	            return pathArr;
	        }
	        var wayPoint = new WayPoint_1$1.WayPoint(cellPath[0], start);
	        while (!wayPoint.position.equals(end)) {
	            wayPoint = this.getFurthestWayPoint(wayPoint, cellPath, end);
	            pathArr.push(wayPoint.position.toPoint());
	        }
	        return pathArr;
	    };
	    NavMesh.prototype.getFurthestWayPoint = function (wayPoint, cellPath, end) {
	        var startPt = wayPoint.position;
	        var cell = wayPoint.cell;
	        var lastCell = cell;
	        var startIndex = cellPath.indexOf(cell);
	        var outSide = cell.sides[cell.m_ArrivalWall];
	        var lastPtA = outSide.getPointA();
	        var lastPtB = outSide.getPointB();
	        var lastLineA = new Line2D_1$1.Line2D(startPt, lastPtA);
	        var lastLineB = new Line2D_1$1.Line2D(startPt, lastPtB);
	        var testPtA, testPtB;
	        for (var i = startIndex + 1; i < cellPath.length; i++) {
	            cell = cellPath[i];
	            outSide = cell.sides[cell.m_ArrivalWall];
	            if (i === cellPath.length - 1) {
	                testPtA = end;
	                testPtB = end;
	            }
	            else {
	                testPtA = outSide.getPointA();
	                testPtB = outSide.getPointB();
	            }
	            if (!lastPtA.equals(testPtA)) {
	                if (lastLineB.classifyPoint(testPtA, this.EPSILON) === PointClassification_1$1.PointClassification.RIGHT_SIDE) {
	                    return new WayPoint_1$1.WayPoint(lastCell, lastPtB);
	                }
	                else {
	                    if (lastLineA.classifyPoint(testPtA, this.EPSILON) !== PointClassification_1$1.PointClassification.LEFT_SIDE) {
	                        lastPtA = testPtA;
	                        lastCell = cell;
	                        lastLineA.setPointB(lastPtA);
	                    }
	                }
	            }
	            if (!lastPtB.equals(testPtB)) {
	                if (lastLineA.classifyPoint(testPtB, this.EPSILON) === PointClassification_1$1.PointClassification.LEFT_SIDE) {
	                    return new WayPoint_1$1.WayPoint(lastCell, lastPtA);
	                }
	                else {
	                    if (lastLineB.classifyPoint(testPtB, this.EPSILON) !== PointClassification_1$1.PointClassification.RIGHT_SIDE) {
	                        lastPtB = testPtB;
	                        lastCell = cell;
	                        lastLineB.setPointB(lastPtB);
	                    }
	                }
	            }
	        }
	        return new WayPoint_1$1.WayPoint(cellPath[cellPath.length - 1], end);
	    };
	    return NavMesh;
	}());
	exports.NavMesh = NavMesh;

	});

	unwrapExports(NavMesh_1$1);
	var NavMesh_2$1 = NavMesh_1$1.NavMesh;

	var NavMeshPathFinding_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	var NavMeshPathFinding = (function () {
	    function NavMeshPathFinding(framePoints, obstacles) {
	        this.polygonV = new Array();
	        this.pushFrame(framePoints);
	        for (var _i = 0, obstacles_1 = obstacles; _i < obstacles_1.length; _i++) {
	            var obstacle = obstacles_1[_i];
	            var obstacleVts = NavMeshPathFinding.pointsConvertToVector(obstacle);
	            this.addPolygon(obstacleVts);
	        }
	        this.buildTriangle();
	    }
	    NavMeshPathFinding.prototype.pushFrame = function (framePoints) {
	        var frameVt = new Array();
	        for (var _i = 0, framePoints_1 = framePoints; _i < framePoints_1.length; _i++) {
	            var point = framePoints_1[_i];
	            frameVt.push(new Vector2f_1$1.Vector2f(point.x, point.y));
	        }
	        var polyFrame = new Polygon_1$1.Polygon(frameVt.length, frameVt);
	        polyFrame.cw();
	        this.polygonV.push(polyFrame);
	    };
	    NavMeshPathFinding.pointsConvertToVector = function (obstacle) {
	        var polygonPath = new Array();
	        for (var _i = 0, obstacle_1 = obstacle; _i < obstacle_1.length; _i++) {
	            var point = obstacle_1[_i];
	            var vt = new Vector2f_1$1.Vector2f(point.x, point.y);
	            polygonPath.push(vt);
	        }
	        return polygonPath;
	    };
	    NavMeshPathFinding.prototype.addPolygon = function (polygonPath) {
	        var pl = new Polygon_1$1.Polygon(polygonPath.length, polygonPath);
	        pl.cw();
	        this.polygonV.push(pl);
	    };
	    NavMeshPathFinding.prototype.unionAll = function () {
	        for (var n = 1; n < this.polygonV.length; n++) {
	            var p0 = this.polygonV[n];
	            for (var m = 1; m < this.polygonV.length; m++) {
	                var p1 = this.polygonV[m];
	                if (p0 !== p1 && p0.isCW() && p1.isCW()) {
	                    var v = p0.union(p1);
	                    if (v != null && v.length > 0) {
	                        console.log("delete");
	                        this.polygonV.splice(this.polygonV.indexOf(p0), 1);
	                        this.polygonV.splice(this.polygonV.indexOf(p1), 1);
	                        for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
	                            var pv = v_1[_i];
	                            this.polygonV.push(pv);
	                        }
	                        n = 1;
	                        break;
	                    }
	                }
	            }
	        }
	    };
	    NavMeshPathFinding.linkCells = function (pv) {
	        for (var _i = 0, pv_1 = pv; _i < pv_1.length; _i++) {
	            var pCellA = pv_1[_i];
	            for (var _a = 0, pv_2 = pv; _a < pv_2.length; _a++) {
	                var pCellB = pv_2[_a];
	                if (pCellA && pCellB && pCellA !== pCellB) {
	                    pCellA.checkAndLink(pCellB);
	                }
	            }
	        }
	    };
	    NavMeshPathFinding.prototype.buildTriangle = function () {
	        this.unionAll();
	        var d = new Delaunay_1$1.Delaunay();
	        this.triangleV = d.createDelaunay(this.polygonV);
	        this.cellV = new Array();
	        var trg;
	        var cell;
	        for (var j = 0; j < this.triangleV.length; j++) {
	            trg = this.triangleV[j];
	            cell = new Cell_1$1.Cell(trg.getVertex(0), trg.getVertex(1), trg.getVertex(2));
	            cell.index = j;
	            this.cellV.push(cell);
	        }
	        NavMeshPathFinding.linkCells(this.cellV);
	    };
	    NavMeshPathFinding.prototype.findPath = function (startPt, endPt) {
	        var startPtInner = new Point_1$1.Point(startPt[0], startPt[1]);
	        var endPtInner = new Point_1$1.Point(endPt[0], endPt[1]);
	        var nav = new NavMesh_1$1.NavMesh(this.cellV);
	        return nav.findPath(startPtInner, endPtInner);
	    };
	    return NavMeshPathFinding;
	}());
	module.exports = NavMeshPathFinding;

	});

	var NavMeshPathFinding = unwrapExports(NavMeshPathFinding_1);

	return NavMeshPathFinding;

}());
