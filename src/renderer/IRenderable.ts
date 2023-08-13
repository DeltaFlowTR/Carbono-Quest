interface IRenderable {
    /**
     * Called during the frame rendering, when this method is called the object should be rendered
     * @param context The context used to make the rendering calls
     */
    render(context: CanvasRenderingContext2D): void;
}

export default IRenderable;
