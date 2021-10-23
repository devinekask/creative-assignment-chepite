import World from "./World3.js";
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  pixelArt: true,
  scene: World, 
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    },
  },
};

const game = new Phaser.Game(config);
