interface ITickable {
    /**
     * Called during the game tick to update the state of the object
     */
    tick(): void;
}

export default ITickable;