import {Vector2f} from "../geom/Vector2f";
import {Cell} from "./Cell";

export class WayPoint {
    position:Vector2f;
    cell:Cell;

    constructor(cell:Cell, position:Vector2f)
    {
        this.cell = cell;
        this.position = position;
    }
}