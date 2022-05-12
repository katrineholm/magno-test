import { Patch } from "../objects/Patch";
import { PATCH_OUTLINE_COLOR, PATCH_OUTLINE_THICKNESS } from "../utils/Constants";
import { Direction } from "../utils/Enums";
import { Psychophysics } from "../utils/Psychophysics";
import { Settings } from "../utils/Settings";
import { AbstractFormWorld } from "./AbstractFormWorld";

export class FormTutorialTaskWorld extends AbstractFormWorld {
    constructor(isFixed: boolean) {
        super(isFixed);
        this.createPatches();
        this.calculateMaxMin();
        this.createPatchContainerMasks();
        this.createLineSegments();
    }

    /**
     * Creates the left and right patches for placing line segments
     */
    createPatches = (): void => {
        this.patchGap = Psychophysics.getPatchGapInPixels() / 1.4;
        const patchWidth: number = Psychophysics.getPatchWidthInPixels() / 1.4;
        const patchHeight: number = Psychophysics.getPatchHeightInPixels() / 1.4;

        const screenXCenter: number = Settings.TRIAL_SCREEN_X;
        const screenYCenter: number = Settings.TRIAL_SCREEN_Y;

        const patchLeftX: number = screenXCenter - patchWidth - (this.patchGap / 2);
        const patchRightX: number = screenXCenter + (this.patchGap / 2);
        const patchY: number = screenYCenter - (patchHeight / 2);

        // create patches
        this.patchLeft = new Patch(patchLeftX, patchY, patchWidth, patchHeight, PATCH_OUTLINE_THICKNESS, PATCH_OUTLINE_COLOR);
        this.patchRight = new Patch(patchRightX, patchY, patchWidth, patchHeight, PATCH_OUTLINE_THICKNESS, PATCH_OUTLINE_COLOR);

        // add patches to container
        this.addChild(this.patchLeft, this.patchRight);

        // show line segments
        this.patchLeftObjectsContainer.visible = true;
        this.patchRightObjectsContainer.visible = true;
    }

    /**
     * Calculates and fetches parameters for creating line segments
     */
    createLineSegments(): void {
        let x: number;
        let y: number;

        const d: number = Psychophysics.visualAngleToPixels(
            Settings.FORM_DIAMETER_WB,
            Settings.SCREEN_VIEWING_DISTANCE_MM,
            Settings.WINDOW_WIDTH_PX,
            Settings.WINDOW_WIDTH_MM
        );

        // Sets the right patch to contain concentric circles
        // get a random circle center if not fixed, otherwise it's the center of the patch
        this.coherentPatchSide = Direction[1];
        if (this.coherentPatchSide == "LEFT") {
            if (this.isFixed) {
                x = this.patchLeft.x + (this.patchLeft.width / 2);
                y = this.patchLeft.y + (this.patchLeft.height / 2);
            } else {
                const leftMaxX: number = (this.patchLeft.x + this.patchLeft.width) - (d / 2);
                const leftMinX: number = (this.patchLeft.x) + (d / 2);
                const patchMaxY: number = (this.patchLeft.y + this.patchLeft.height) - (d / 2);
                const patchMinY: number = (this.patchLeft.y) + (d / 2);
                x = Math.random() * (leftMaxX - leftMinX) + leftMinX;
                y = Math.random() * (patchMaxY - patchMinY) + patchMinY;
            }

        } else {
            if (this.isFixed) {
                x = this.patchRight.x + (this.patchRight.width / 2);
                y = this.patchRight.y + (this.patchRight.height / 2);
            } else {
                const rightMaxX: number = (this.patchRight.x + this.patchRight.width) - (d / 2);
                const rightMinX: number = (this.patchRight.x) + (d / 2);
                const patchMaxY: number = (this.patchLeft.y + this.patchLeft.height) - (d / 2);
                const patchMinY: number = (this.patchLeft.y) + (d / 2);
                x = Math.random() * (rightMaxX - rightMinX) + rightMinX;
                y = Math.random() * (patchMaxY - patchMinY) + patchMinY;
            }
        }

        const r: number = d / 2;

        if (!Settings.FORM_AUTO_MODE) {
            const circleGap: number = Psychophysics.visualAngleToPixels(
                Settings.FORM_CIRCLES_GAP,
                Settings.SCREEN_VIEWING_DISTANCE_MM,
                Settings.WINDOW_WIDTH_PX,
                Settings.WINDOW_WIDTH_MM
            );
            const lineGapOffset: number = Psychophysics.visualAngleToPixels(
                Settings.FORM_LINE_GAP,
                Settings.SCREEN_VIEWING_DISTANCE_MM,
                Settings.WINDOW_WIDTH_PX,
                Settings.WINDOW_WIDTH_MM
            );
            const lineLength: number = Psychophysics.visualAngleToPixels(
                Settings.FORM_LINE_LENGTH,
                Settings.SCREEN_VIEWING_DISTANCE_MM,
                Settings.WINDOW_WIDTH_PX,
                Settings.WINDOW_WIDTH_MM
            );
            this.manualMode(x, y, r, lineLength, lineGapOffset, circleGap);
        } else {
            this.autoMode(x, y, r);
        }
    }

    update = (delta: number): void => {
        return;
    }

    resize = () => {
        // get old max values
        const currentLeftMaxX: number = this.leftMaxX.valueOf();
        const currentPatchMaxY: number = this.patchMaxY.valueOf();
        const currentRightMaxX: number = this.rightMaxX.valueOf();

        // remove old patches
        this.patchLeft.destroy();
        this.patchRight.destroy();

        // create new patches, quadtree and bounds
        this.createPatches();
        this.calculateMaxMin();
        this.createPatchContainerMasks();

        // update line segment positions
        this.lineSegmentsLeftContainer.children.forEach(line => {
            line.x += this.leftMaxX - currentLeftMaxX;
            line.y += this.patchMaxY - currentPatchMaxY;
        });
        this.lineSegmentsRightContainer.children.forEach(line => {
            line.x += this.rightMaxX - currentRightMaxX;
            line.y += this.patchMaxY - currentPatchMaxY;
        });
    }
}