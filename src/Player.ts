import GameObject from "./Engine/GameObject.js";
type Directions = "UP" | "DOWN" | "LEFT" | "RIGHT" | "NONE";

class Player extends GameObject {
    private readonly normalPlayerSpeed = 1.5;
    private readonly sprintPlayerSpeed = 2.4;

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

        this.playerSpeed = this.normalPlayerSpeed;

        window.addEventListener("keydown", event => {
            event.preventDefault();
            const key = event.key.toLocaleLowerCase();

            switch(key) {
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
                case "shift":
                    this.playerSpeed = this.sprintPlayerSpeed;
                    break;
            }

            window.addEventListener("keyup", event => {
                event.preventDefault();
                const key = event.key.toLocaleLowerCase();

                if(key == "w") this.goingUp = false;
                if(key == "s") this.goingDown = false;
                if(key == "a") this.goingLeft = false;
                if(key == "d") this.goingRight = false;
                if(key == "shift") this.playerSpeed = this.normalPlayerSpeed;
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
