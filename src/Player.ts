import GameObject from "./Engine/GameObject.js";
import Animator from "./renderer/animation/Animator.js";
import GameAnimation from "./renderer/animation/GameAnimation.js";
import Canvas from "./renderer/Canvas.js";

class Player extends GameObject {
    private readonly normalPlayerSpeed = 2.5;
    private readonly sprintPlayerSpeed = 4;

    private playerSpeed: number;

    private animator: Animator;

    private goingUp: boolean;
    private goingDown: boolean;
    private goingLeft: boolean;
    private goingRight: boolean;

    constructor() {
        super(100, 100, 48, 60, 1.5);
        
        this.animator = new Animator(Canvas.createSprite("img/Character.png"), "WalkDown");

        const animationWalkUp = new GameAnimation(250, 
            [
                {
                    firstPosition: { x: 51, y: 0 },
                    secondPosition: { x: 97, y: 59 }
                },
                {
                    firstPosition: { x: 101, y: 0 },
                    secondPosition: { x: 149, y: 59 }
                }
            ]    
        );

        const animationWalkDown = new GameAnimation(250, 
            [
                {
                    firstPosition: { x: 51, y: 63 },
                    secondPosition: { x: 97, y: 121 }
                },
                {
                    firstPosition: { x: 101, y: 63 },
                    secondPosition: { x: 147, y: 121 }
                }
            ]
        );

        const animationWalkLeft = new GameAnimation(250, 
            [
                {
                    firstPosition: { x: 51, y: 187 },
                    secondPosition: { x: 97, y: 245 }
                },
                {
                    firstPosition: { x: 101, y: 187 },
                    secondPosition: { x: 147, y: 245 }
                }
            ]    
        );

        const animationWalkRight = new GameAnimation(250, 
            [
                {
                    firstPosition: { x: 51, y: 125 },
                    secondPosition: { x: 97, y: 183 }
                },
                {
                    firstPosition: { x: 101, y: 125 },
                    secondPosition: { x: 147, y: 183 }
                }
            ]    
        )

        this.animator.addAnimation("WalkDown", animationWalkDown, 
            {
                firstPosition: { x: 0, y: 63 },
                secondPosition: { x: 47, y: 121 }
            }
        );

        this.animator.addAnimation("WalkUp", animationWalkUp,
            {
                firstPosition: { x: 0, y: 0 },
                secondPosition: { x: 47, y: 59 }
            }
        );

        this.animator.addAnimation("WalkLeft", animationWalkLeft,
            {
                firstPosition: { x: 0, y: 187 },
                secondPosition: { x: 47, y: 245 }
            }
        );

        this.animator.addAnimation("WalkRight", animationWalkRight,
            {
                firstPosition: { x: 0, y: 125 },
                secondPosition: { x: 47, y: 183 }
            }
        );

        this.playerSpeed = this.normalPlayerSpeed;

        window.addEventListener("keydown", event => {
            const key = event.key.toLocaleLowerCase();

            if(key == "w" || key == "s" || key == "a" || key == "d" || key == "shift") event.preventDefault();

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
                const key = event.key.toLocaleLowerCase();

                if(key == "w" || key == "s" || key == "a" || key == "d" || key == "shift") event.preventDefault();

                if(key == "w") this.goingUp = false;
                if(key == "s") this.goingDown = false;
                if(key == "a") this.goingLeft = false;
                if(key == "d") this.goingRight = false;
                if(key == "shift") this.playerSpeed = this.normalPlayerSpeed;
            });
        });
    }

    public tick(): void {
        const previousX = this.x;
        const previousY = this.y;

        if(this.goingUp) this.y -= this.playerSpeed;
        if(this.goingDown) this.y += this.playerSpeed;
        if(this.goingLeft) this.x -= this.playerSpeed;
        if(this.goingRight) this.x += this.playerSpeed;

        if(this.y > previousY) { this.animator.startAnimation("WalkDown"); return; }
        else if(this.y < previousY) { this.animator.startAnimation("WalkUp"); return; }

        if(this.x > previousX) this.animator.startAnimation("WalkRight");
        else if(this.x < previousX) this.animator.startAnimation("WalkLeft");

        if(this.x === previousX && this.y === previousY) this.animator.stopAnimation();
    }
    
    public render(context: CanvasRenderingContext2D): void {
        context.save();

        this.animator.drawAnimationFrame(context, this.x, this.y, this.width * this.scale, this.height * this.scale);

        context.restore();
    }
}

export default Player;
