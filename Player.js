export default class Player{
  constructor(scene, x, y, character) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.character= character;
    this.player;
    this.cursors;
  }
  create(){
  
    
  }

 
  anims(){
    this.scene.anims.create({
      key: "player-idle",
      frames: anims.generateFrameNumbers("player", { start: 0, end: 6 }),
      frameRate: 3,
      repeat: -1,
    });
  }

  destroy() {
    this.sprite.destroy();
  }

  
}
