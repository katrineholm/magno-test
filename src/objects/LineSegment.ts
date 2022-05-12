import * as PIXI from "pixi.js";
import { Psychophysics } from "../utils/Psychophysics";
import { Settings } from "../utils/Settings";

export class LineSegment extends PIXI.Sprite {
    private initAngle: number;
    private angleOffset: number;

    constructor(x: number, y: number, angle: number, angleOffset: number, texture: PIXI.Texture) {
        super(texture);
        this.anchor.set(0.5);
        this.x = x;
        this.y = y;
        this.initAngle = angle;

        this.width = Psychophysics.visualAngleToPixels(
            Settings.FORM_LINE_LENGTH,
            Settings.SCREEN_VIEWING_DISTANCE_MM,
            Settings.WINDOW_WIDTH_PX,
            Settings.WINDOW_WIDTH_MM
        )
        this.height = Settings.FORM_LINE_HEIGHT;

        this.angleOffset = angleOffset;
        this.angle = this.initAngle + this.angleOffset;
    }

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    setAngleOffset(offset: number) {
        this.angleOffset = offset;
        this.angle = this.initAngle + offset;
    }
}