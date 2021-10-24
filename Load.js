export default class Load extends Phaser.Scene
{
    constructor() {
        super("load");
        this.charKey = "player";
    }
    preload() {
        
        this.load.image("base", "./assets/images/FullGround.png");
        this.load.image("bullet", "./assets/images/bullet.png");
        this.load.image("decorationOne", "./assets/Dungeon_B.png");
        this.load.image("decorationTwo", "./assets/Dungeon_A2.png");
        //bullet test
        this.load.image("bullet", "./assets/images/bullet.png");
        //bullet test
        //enemy test
        this.load.image("enemy", "./assets/images/enemy.png");
        //end enemy test
        //boss test
        this.load.image("boss", "./assets/images/boss.png");
        //end boss test
        //test player
        this.load.spritesheet(this.charKey, "./assets/sprites/sprite_map.png", {
          frameWidth: 64,
          frameHeight: 64,
          margin: 0,
          spacing: 0,
        });
    
        //end test player
        //this.load.tilemapTiledJSON("map", "./world.json");
        this.load.tilemapTiledJSON("map", "./assets/worldV3.json");
        this.load.on("progress", (percent) => {
         console.log(percent)
      });
    }
      create() {
        console.log("loaded");
        this.scene.start("game-scene");

      }
}