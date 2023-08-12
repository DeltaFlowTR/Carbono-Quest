import IRenderable from "../renderer/IRenderable.js";
import ITickable from "./ITickable.js";

abstract class GameObject implements ITickable, IRenderable {
    abstract tick(): void;
    abstract render(context: CanvasRenderingContext2D): void;
    
}

export default GameObject;