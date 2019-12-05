export class LineClassification {
    static COLLINEAR: number = 0;			// both lines are parallel and overlap each other
    static LINES_INTERSECT: number = 1;	// lines intersect, but their segments do not
    static SEGMENTS_INTERSECT: number = 2;	// both line segments bisect each other
    static A_BISECTS_B: number = 3;		// line segment B is crossed by line A
    static B_BISECTS_A: number = 4;		// line segment A is crossed by line B
    static PARALELL: number = 5;			// the lines are paralell
    constructor() {

    }
}