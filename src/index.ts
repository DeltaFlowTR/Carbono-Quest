import Player from "./Player.js";
import Canvas from "./renderer/Canvas.js";

let canvas: Canvas | undefined;

function setup() {
    window.player = new Player(50, 50, 50, 50);
    canvas = new Canvas("canvas");
}

// Starts the game only when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", setup);
