import { Settings } from "./Settings"

export abstract class Psychophysics {
    /**
     * Function for converting pixels to visual angle.
     * res and dim should both use either height or width.
     * @param pixels The amount of pixels.
     * @param distance The viewing distance to the screen in millimeters.
     * @param res The screen height or width in pixels.
     * @param dim The screen height or width in millimeters.
     * @returns Visual angle in degrees.
     */
    public static pixelsToVisualAngle = (pixels: number, distance: number, res: number, dim: number): number => {
        return 2 * (Math.atan((pixels) / (2 * distance * (res / dim)))) * (180 / Math.PI)
    }

    /**
     * Function for converting visual angle degrees to pixels.
     * res and dim should both use either height or width.
     * @param degrees The visual angle in degrees.
     * @param distance The viewing distance to the screen in millimeters.
     * @param res The screen height or width in pixels.
     * @param dim The screen height or width in millimeters.
     * @returns Visual angle in pixels.
     */
    public static visualAngleToPixels = (degrees: number, distance: number, res: number, dim: number): number => {
        return Math.tan((Math.PI / 180) * degrees / 2) * 2 * distance * (res / dim)
    }

    /**
     * Calculate the width of the of the patch.
     * @returns the width in pixels.
     */
    public static getPatchWidthInPixels = (): number => {
        return Psychophysics.visualAngleToPixels(Settings.PATCH_WIDTH, Settings.SCREEN_VIEWING_DISTANCE_MM, Settings.WINDOW_WIDTH_PX, Settings.WINDOW_WIDTH_MM)
    }

    /**
     * Calculate the height of the patch.
     * @returns the height in pixels.
     */
    public static getPatchHeightInPixels = (): number => {
        return Psychophysics.visualAngleToPixels(Settings.PATCH_HEIGHT, Settings.SCREEN_VIEWING_DISTANCE_MM, Settings.WINDOW_HEIGHT_PX, Settings.WINDOW_HEIGHT_MM)
    }

    /**
     * Calculate the gap between patches.
     * @returns the gap in pixels.
     */
    public static getPatchGapInPixels = (): number => {
        return Psychophysics.visualAngleToPixels(Settings.PATCH_GAP, Settings.SCREEN_VIEWING_DISTANCE_MM, Settings.WINDOW_WIDTH_PX, Settings.WINDOW_WIDTH_MM)
    }

    /**
     * Convert amplitude ratio/fctor to decibel.
     * @param factor The amplitude ratio to be converted.
     * @returns the decibel value for given amplitude ratio.
     */
    public static factorToDecibel = (factor: number): number => {
        return 10 * Math.log10(factor ** 2);
    }

    /**
     * Converts decibel to amplitude ratio/factor.
     * @param decibel The decibel to be converted.
     * @returns the amplitude ratio for the given decibel.
     */
    public static decibelToFactor = (decibel: number): number => {
        return Math.pow(10, (decibel / 20));
    }

    /**
     * Calculates the geometric mean of the last @param ofLast numbers of an array.
     * @param numberArray the values to calculate the geometric mean of.
     * @param ofLast how many values to use, starting from the end of the array.
     * @returns the geometric mean.
     */
    public static geometricMean = (numberArray: Array<number>, ofLast: number): number => {
        let sum: number = 1;
        let root: number = 0;
        const startIndex: number = numberArray.length >= ofLast ? numberArray.length - ofLast : 0;
        for (let i = startIndex; i < numberArray.length; i++) {
            sum *= numberArray[i];
            root++;
        }
        return Math.pow(sum, 1 / root)
    }
}