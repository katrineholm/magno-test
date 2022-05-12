/**
 * Calculates the euclidean distance between two points in the cartesian coordinate system.
 * @param x1 x position of first point
 * @param y1 y position of first point
 * @param x2 x position of second point
 * @param y2 y position of second point
 * @returns distance between (x1, y1) and (x2, y2)
 */
export const euclideanDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    const xd: number = x1 - x2;
    const yd: number = y1 - y2;
    return Math.sqrt((xd ** 2) + (yd ** 2))
}