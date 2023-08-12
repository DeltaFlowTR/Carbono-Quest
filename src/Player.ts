import GameObject from "./Engine/GameObject.js";
type Directions = "UP" | "DOWN" | "LEFT" | "RIGHT" | "NONE";

class Player extends GameObject {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private playerSpeed: number;

    private goingUp: boolean;
    private goingDown: boolean;
    private goingLeft: boolean;
    private goingRight: boolean;

    constructor(x: number, y: number, width: number, height: number) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.playerSpeed = 2.5;

        window.addEventListener("keydown", event => {
            switch(event.key) {
                case "w":
                    this.goingUp = true;
                    break;
                case "s":
                    this.goingDown = true;
                    break;
                case "a":
                    this.goingLeft = true;
                    break;
                case "d":
                    this.goingRight = true;
                    break;
            }

            window.addEventListener("keyup", event => {
                if(event.key == "w") this.goingUp = false;
                if(event.key == "s") this.goingDown = false;
                if(event.key == "a") this.goingLeft = false;
                if(event.key == "d") this.goingRight = false;
            });
        });
    }

    public tick(): void {
        if(this.goingUp) this.y -= this.playerSpeed;
        if(this.goingDown) this.y += this.playerSpeed;
        if(this.goingLeft) this.x -= this.playerSpeed;
        if(this.goingRight) this.x += this.playerSpeed;
    }
    
    public render(context: CanvasRenderingContext2D): void {
        context.save();

        context.fillStyle = "red";
        context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width , this.height);

        context.restore();
    }
}

export default Player;
