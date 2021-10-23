import World from "./World3.js";
import Load from "./Load.js"
import GameOver from "./GameOver.js";
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  pixelArt: true,
  scene: [Load, World, GameOver], 
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    },
  },
};

const game = new Phaser.Game(config);
