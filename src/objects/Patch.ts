import * as PIXI from "pixi.js";

export class Patch extends PIXI.Graphics {
    constructor(x: number, y: number, width: number, height: number, outlineThickness: number, outlineColor: number) {
        super();
        this.position.set(x, y)
        this.lineStyle(outlineThickness, outlineColor)
            .beginFill()
            .drawRect(0, 0, width, height)
            .endFill();
        this.interactive = false;
        this.buttonMode = true;
    }
}