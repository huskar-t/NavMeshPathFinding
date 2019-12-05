export class Rectangle {
    x;
    y;
    width;
    height;

    constructor(x, y, width, height) {
        this.setValues(x, y, width, height);
    }

    setValues(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        return this;
    };

    extend(x, y, width = 0, height = 0) {
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

    pad(top, left, bottom, right) {
        this.x -= left;
        this.y -= top;
        this.width += left + right;
        this.height += top + bottom;
        return this;
    };

    copy(rectangle) {
        return this.setValues(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    };

    contains(x, y, width = 0, height = 0) {
        return (x >= this.x && x + width <= this.x + this.width && y >= this.y && y + height <= this.y + this.height);
    };

    union(rect) {
        return this.clone().extend(rect.x, rect.y, rect.width, rect.height);
    };

    intersection(rect) {
        let x1 = rect.x, y1 = rect.y, x2 = x1 + rect.width, y2 = y1 + rect.height;
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

    intersects(rect) {
        return (rect.x <= this.x + this.width && this.x <= rect.x + rect.width && rect.y <= this.y + this.height && this.y <= rect.y + rect.height);
    };

    isEmpty() {
        return this.width <= 0 || this.height <= 0;
    };

    clone() {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };

    toString() {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
    };
}
