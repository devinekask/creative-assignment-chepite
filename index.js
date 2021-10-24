import World from "./World3.js";
import Load from "./Load.js"
import GameOver from "./GameOver.js";
const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 720 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;
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
      //debug: true
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  }
};
const game = new Phaser.Game(config);