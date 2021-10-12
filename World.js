// import Player from "./Player.js";


//let controls;
export default class World extends Phaser.Scene {
  constructor(){
    super('game-scene')
    this.player;
    this.charKey = "player"
    this.cursors;

  }
init(){
  window.addEventListener('resize', this.applyResize)
  this.cursors = this.input.keyboard.createCursorKeys();

}
applyResize(){
  this.height= window.innerHeight;
  this.width= window.innerWidth;
}
  
  preload() {

    this.load.image("base", "./assets/images/FullGround.png");
    this.load.image("shroom", "./assets/images/mushroom.png");
    //test player
    this.load.spritesheet(this.charKey, "./assets/sprites/Monk.png", {
      frameWidth: 64,
      frameHeight: 64,
      margin: 0,
      spacing:0,
    });
    
    //end test player
    this.load.tilemapTiledJSON("map", "./world.json");
  }
  create() {
    
    //const map = this.make.tilemap({key: "map"});
    const map = this.make.tilemap({ key: "map" });
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("FullGroundTest", "base");
    const worldset = map.addTilesetImage("mushroom", "shroom");
    const bottomlayer = map.createStaticLayer("bottom", tileset, 0, 0);
    const worldlayer = map.createStaticLayer("world", worldset, 0, 0);
    //cam
    const camera = this.cameras.main;
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //player
    this.createPlayer(map);
    this.cameras.main.startFollow(this.player);


   
   
  }
  
  createPlayer(map){
     //search spawnpoint and add player there
     const spawnPoint = map.findObject(
      "objects",
      (obj) => obj.name === "Spawn Point"
    );
    console.log(spawnPoint);
    this.player= this.physics.add.sprite(125, 100, this.charKey);
    this.player.setScale(2)
  }

  anims(){
    this.player.anims.create({
      key: 'player-idle',
      frames: this.scene.anims.generateFrameNumbers(this.charKey, { start: 0, end: 6 }),
      frameRate: 24,
      repeat: -1,
    });
  }
  playerMovement() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
        //this.player.play(`left`, true);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
        //this.player.play(`right`, true);
    } 
    else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-150);
      //this.player.play(`right`, true);
  }
  else if (this.cursors.down.isDown) {
    this.player.setVelocityY(150);
    //this.player.play(`right`, true);
}else {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0)
       // this.player.play("player-idle", true);
    }
   
}
  update(time, delta) {
    //update each game tick
    this.playerMovement();
  }
}
