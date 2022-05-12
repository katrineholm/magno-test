import * as PIXI from "pixi.js";
import { SPRITE_BUTTON_CLICKED_TINT, SPRITE_BUTTON_DISABLE_TINT_COLOR } from "../../utils/Constants";

export class SpriteButton extends PIXI.Sprite {
    isMouseDown: boolean = false;
    hoverColor: number | undefined;
    disabled: boolean;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        texture: PIXI.Texture,
        anchor: [number, number] = [0, 0],
        hoverColor?: number,
        scale?: number,
        disabled: boolean = false,
    ) {
        super(texture);
        if (hoverColor) this.hoverColor = hoverColor;
        if (scale) this.scale.set(scale);
        if (anchor) this.anchor.set(anchor[0], anchor[1]);

        this.disabled = disabled;

        this.interactive = disabled ? false : true;
        this.buttonMode = disabled ? false : true;
        this.position.set(x, y);
        this.width = width;
        this.height = height;

        this.on("mousedown", (): void => {
            if (!this.isMouseDown) {
                this.tint = SPRITE_BUTTON_CLICKED_TINT;
                this.isMouseDown = true;
            }
        })

        this.on("mouseupoutside", (): void => {
            this.isMouseDown = false;
        })

        this.on("touchend", (): void => {
            this.tint = SPRITE_BUTTON_DISABLE_TINT_COLOR;
        })

        if (hoverColor) {
            this.on("mouseup", (): void => {
                if (this.isMouseDown) {
                    this.tint = hoverColor;
                    this.isMouseDown = false;
                }
            })
            this.on("mouseover", (): void => {
                if (this.isMouseDown) {
                    this.tint = SPRITE_BUTTON_CLICKED_TINT;
                } else {
                    this.tint = hoverColor;
                }
            });
            this.on("mouseout", (): void => {
                this.tint = SPRITE_BUTTON_DISABLE_TINT_COLOR;
            });
            this.on("touchstart", (): void => {
                this.tint = SPRITE_BUTTON_CLICKED_TINT;
            });
            this.on("touchmove", (e: TouchEvent): void => {
                if (e.target == null) {
                    this.tint = SPRITE_BUTTON_DISABLE_TINT_COLOR;
                }
            });
        } else {
            this.on("mouseup", (): void => {
                if (this.isMouseDown) {
                    this.tint = SPRITE_BUTTON_DISABLE_TINT_COLOR;
                    this.isMouseDown = false;
                }
            })
            this.on("mouseover", (): void => {
                if (this.isMouseDown) {
                    this.tint = SPRITE_BUTTON_CLICKED_TINT;
                }
            })
            this.on("mouseout", (): void => {
                if (this.isMouseDown) {
                    this.tint = SPRITE_BUTTON_DISABLE_TINT_COLOR;
                }
            })
            this.on("touchstart", (): void => {
                if (!this.isMouseDown) {
                    this.tint = SPRITE_BUTTON_CLICKED_TINT;
                    this.isMouseDown = true;
                }
            });
            this.on("touchmove", (e: TouchEvent): void => {
                if (e.target == null) {
                    if (this.isMouseDown) {
                        this.isMouseDown = false;
                    }
                }
            });
        }
    }
}