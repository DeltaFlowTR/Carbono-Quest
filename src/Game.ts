import GameObject from "./Engine/GameObject.js";
import Player from "./Player.js";
import Canvas from "./renderer/Canvas.js";

class Game {
    private canvas: Canvas;
    private readonly tickInterval = 60 / 1000;

    private readonly objects: Array<GameObject>;

    constructor() {
        this.objects = new Array<GameObject>();
        window.player = new Player(50, 50, 48 * 1.5, 60 * 1.5);
        this.canvas = new Canvas("canvas", this);
        this.run();
    }

    private async run() {
        const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

        while(true) {
            // TIcks all objects inside the game
            this.objects.forEach(object => {
                object.tick();
            });

            window.player.tick();

            await wait(this.tickInterval);
        }
    }

    public getGameObjects() {
        return this.objects;
    }
}

export default Game;
