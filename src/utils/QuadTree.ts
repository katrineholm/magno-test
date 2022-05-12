import * as PIXI from 'pixi.js';
import { Dot } from '../objects/Dot';

/**
 * Quadtrees are datastructures used for more efficient collision detection.
 * See @tutorial https://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374
 */
export class QuadTree {
    private MAX_OBJECTS: number;
    private MAX_LEVELS: number;

    private level: number;
    private objects: Array<Dot>;
    private bounds: PIXI.Rectangle;
    private nodes: Array<QuadTree | null>;

    // default values for max objects in a node before split and max number of levels, aka depth in the tree
    constructor(pLevel: number, pBounds: PIXI.Rectangle, maxObjects: number = 10, maxLevels: number = 5) {
        this.MAX_OBJECTS = maxObjects;
        this.MAX_LEVELS = maxLevels;
        this.level = pLevel;
        this.objects = new Array<Dot>();
        this.bounds = pBounds;
        this.nodes = new Array<QuadTree>(4);
    }

    /**
     * Clears the quadtree.
     */
    clear = (): void => {
        this.objects = new Array<Dot>();

        this.nodes.forEach(node => {
            if (node != null) {
                node.clear();
                node = null;
            }
        })
    }

    /**
     * Splits the node into 4 subnodes
     */
    private split = (): void => {
        let subWidth: number = Math.round(this.bounds.width / 2);
        let subHeight: number = Math.round(this.bounds.height / 2);
        let x: number = Math.round(this.bounds.x);
        let y: number = Math.round(this.bounds.y);

        this.nodes[0] = new QuadTree(this.level + 1, new PIXI.Rectangle(x + subWidth, y, subWidth, subHeight));
        this.nodes[1] = new QuadTree(this.level + 1, new PIXI.Rectangle(x, y, subWidth, subHeight));
        this.nodes[2] = new QuadTree(this.level + 1, new PIXI.Rectangle(x, y + subHeight, subWidth, subHeight));
        this.nodes[3] = new QuadTree(this.level + 1, new PIXI.Rectangle(x + subWidth, y + subHeight, subWidth, subHeight));
    }

    /**
     * Determine which node the object belongs to. -1 means
     * object cannot completely fit within a child node and is part
     * of the parent node
     */
    private getIndex = (dot: Dot): number => {
        let index: number = -1;
        let verticalMidpoint: number = this.bounds.x + (this.bounds.width / 2);
        let horizontalMidpoint: number = this.bounds.y + (this.bounds.height / 2);

        // Object can completely fit within the top quadrants
        let topQuadrant: boolean = (dot.y < horizontalMidpoint && dot.y + dot.radius < horizontalMidpoint);
        // Object can completely fit within the bottom quadrants
        let bottomQuadrant: boolean = (dot.y > horizontalMidpoint);

        // Object can completely fit within the left quadrants
        if (dot.x < verticalMidpoint && dot.x + dot.radius < verticalMidpoint) {
            if (topQuadrant) {
                index = 1;
            }
            else if (bottomQuadrant) {
                index = 2;
            }
        }
        // Object can completely fit within the right quadrants
        else if (dot.x > verticalMidpoint) {
            if (topQuadrant) {
                index = 0;
            }
            else if (bottomQuadrant) {
                index = 3;
            }
        }

        return index;
    }

    /**
     * Insert the object into the quadtree. If the node
     * exceeds the capacity, it will split and add all
     * objects to their corresponding nodes.
     */
    insert = (dot: Dot): void => {
        if (this.nodes[0] != null) {
            let index: number = this.getIndex(dot);
            if (index != -1) {
                this.nodes[index]!.insert(dot);
                return;
            }
        }
        this.objects.push(dot);
        if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
            if (this.nodes[0] == null) {
                this.split();
            }
            for (let i = 0; i < this.objects.length; i++) {
                let cRect: Dot = this.objects[i];
                let index: number = this.getIndex(cRect);
                if (index != -1) {
                    this.nodes[index]!.insert(cRect);
                    this.objects.splice(index, 1);
                }
            }
        }
    }

    /**
     * Return all objects that could collide with the given object
     */
    retrieve = (returnObjects: Array<Dot>, dot: Dot): Array<Dot> => {
        let index: number = this.getIndex(dot);
        if (index != -1 && this.nodes[0] != null) {
            this.nodes[index]!.retrieve(returnObjects, dot);
        }

        returnObjects.push(...this.objects);

        return returnObjects;
    }

    getBounds = (): PIXI.Rectangle => this.bounds;

    getNodes = (): Array<QuadTree | null> => this.nodes;
}