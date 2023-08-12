import GameObject from "./Engine/GameObject.js";
import Player from "./Player.js";
import Canvas from "./renderer/Canvas.js";

class Game {
    private canvas: Canvas;
    private readonly tickInterval = 1 / 60 * 1000;

    private readonly objects: Array<GameObject>;

    constructor() {
        this.objects = new Array<GameObject>();
        window.player = new Player();
        this.canvas = new Canvas("canvas", this);
        this.run();
    }

    private async run() {
        const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

        let lastTPSUpdateMillis = Date.now();
        let tps = 0;
        while(true) {
            // TIcks all objects inside the game
            this.objects.forEach(object => {
                object.tick();
            });

            window.player.tick();

            tps++;

            if(Date.now() - lastTPSUpdateMillis > 1000) {
                console.log(`TPS: ${tps}`);
                lastTPSUpdateMillis = Date.now();
                tps = 0;
            }

            await wait(this.tickInterval);
        }
    }

    public getGameObjects() {
        return this.objects;
    }
}

export default Game;
