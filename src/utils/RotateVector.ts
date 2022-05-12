/**
 * Rotates a 2D vector by a given angle.
 * Courtesy of ROMANIA_engineer, https://stackoverflow.com/a/28112459
 * @param vec 2D vector to rotate
 * @param ang rotation angle in degrees
 */
export const rotateVector = (vec: [number, number], ang: number): [number, number] => {
    ang = -ang * (Math.PI / 180);
    const cos = Math.cos(ang);
    const sin = Math.sin(ang);
    return [Math.trunc(10000 * (vec[0] * cos - vec[1] * sin)) / 10000, Math.trunc(10000 * (vec[0] * sin + vec[1] * cos)) / 10000];
};