import IRenderable from "../renderer/IRenderable.js";
import ITickable from "./ITickable.js";

abstract class GameObject implements ITickable, IRenderable {
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected scale: number;

    constructor(x: number, y: number, width: number, height: number, scale: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scale = scale;
    }

    abstract tick(): void;
    abstract render(context: CanvasRenderingContext2D): void;
    
}

export default GameObject;