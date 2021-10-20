import Bullets from "./Bullets.js";

//test enemies
//import Enemy from "./Enemy.js";
import Enemies from "./Enemies.js"
//end test enemies

//test boss
import Boss2 from "./Boss2.js";
//end test boss
let score = 0;
let children;
let boss;
let bossSpawned = false;
let gameOver;
function hit(player, enemy) {
//   if(enemy !== boss){
  
//   enemy.body.enable = false;
//   enemy.destroy();
//   console.log("hit");
//   score++;
//   console.log("score: ", score);
// }
// else{
//   console.log("big chungus hit");
//   boss.health--;
//   console.log("boss hp: ", boss.health);
//   if(boss.health <=0 && !gameOver){
//     window.alert("the boss has been slain");
//     gameOver= true;
//   }
// }

   //console.log("hit");
   //enemy.health--;
   if(enemy.health <=0 && enemy !== boss){
     score++;
     enemy.destroy();
     console.log("enemy health: ", enemy.health)
   }
   else{
     console.log("hit", enemy.health)
     enemy.health--
   }
   //console.log("boss hp: ", boss.health);
  if(enemy === boss){
    if(boss.health <= 0){
      gameOver = true;
    }
   if(boss){
     console.log(boss.health)
   }
  }
   

}
let health = 5;
export default class World extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player;
    this.charKey = "player";
    this.cursors;
    this.health;
    //test bullet
    this.bullets;
    this.time = 0;
    this.lastFired;
    //test bullet
    // this.enemies = [];
    this.enemies;
  }
  init() {
    window.addEventListener("resize", this.applyResize);
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  applyResize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  preload() {
    this.load.image("base", "./assets/images/FullGround.png");
    this.load.image("shroom", "./assets/images/mushroom.png");
    //bullet test
    this.load.image("bullet", "./assets/images/mushroom.png");
    //bullet test
    //enemy test
    this.load.image("enemy", "./assets/images/enemy.png");
    //end enemy test
    //boss test
    this.load.image("boss", "./assets/images/boss.png")
    //end boss test
    //test player
    this.load.spritesheet(this.charKey, "./assets/sprites/sprite_map.png", {
      frameWidth: 64,
      frameHeight: 64,
      margin: 0,
      spacing: 0,
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
    camera.setZoom(2)
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //player
    this.createPlayer(map);

    //test anims
    this.anims.create({
      key: "player-idle",
      frames: this.anims.generateFrameNumbers(this.charKey, {
        start: 0,
        end: 1,
      }),
      frameRate: 6,
      repeat: 0,
    });
    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers(this.charKey, {
        start: 15,
        end: 15,
      }),
      frameRate: 6,
      repeat: 0,
    });
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers(this.charKey, {
        start: 16,
        end: 16,
      }),
      frameRate: 6,
      repeat: 0,
    });
    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNumbers(this.charKey, {
        start: 30,
        end: 31 ,
      }),
      frameRate: 6,
      repeat: 0,
    });
    // end test anims
    this.cameras.main.startFollow(this.player);

    //bullet test
    this.bullets = new Bullets(this);
    this.enemies = new Enemies(this);
    //end bullet test
    // this.enemies = this.physics.add.staticGroup({
    //   key: "enemy",
    //   frameQuantity: 6,
    //   immovable: false,
    // });
     children = this.enemies.getChildren();
    for (var i = 0; i < children.length; i++) {
      var x = Phaser.Math.Between(50, 750);
      var y = Phaser.Math.Between(50, 550);

      children[i].setPosition(x, y);
    }
    //this.enemies.refresh();
    //test boss
    // boss= this.physics.add.staticGroup({
    //   key: "boss",
    //   frameQuantity: 1,
    //   immovable: false
    // });
    //console.log(boss)
    //let bosses= boss.getChildren();
    //end test boss
    //werkt met player
    //this.physics.add.overlap(this.player, this.enemies, hit);
    this.physics.add.overlap(this.bullets, this.enemies, hit);
    //end bullet test

    //enemies test
    //this.createEnemies(2);
    // test hit detection
    this.physics.add.overlap(this.player, this.enemies, this.CollisionHandler);
    this.physics.add.overlap(this.player,boss, this.CollisionHandler);

    //this.enemies.forEach(x=> this.physics.add.overlap(x, this.bullets, this.CollisionHandler))
    //end test hit detection
    //end enemies test


          this.enemies.scaleXY(0.1, 0.1);
         


    
  }

  createEnemies() {
    this.enemies.StartMoving(this.player.x, this.player.y);
  }

  createPlayer(map) {
    //search spawnpoint and add player there
    const spawnPoint = map.findObject(
      "objects",
      (obj) => obj.name === "Spawn Point"
    );
    console.log(spawnPoint);
    this.player = this.physics.add.sprite(125, 100, this.charKey);
   // this.player.setScale(1.5);
    health = 5;
    this.player.setDepth(1)
  }

  anims() {
    // this.anims.create({
    //   key: "player-idle",
    //   frames: this.scene.anims.generateFrameNumbers(this.charKey, {
    //     start: 0,
    //     end: 2,
    //   }),
    //   frameRate: 2,
    //   repeat: -1,
    // });
  
  }

  playerMovement() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);
      this.player.flipX= true;
      //this.player.play(`left`, true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(150);
      this.player.flipX = false;
      //this.player.play(`right`, true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-150);
             this.player.play("walk-up", true);

      //this.player.play(`right`, true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(150);
      //this.player.play(`right`, true);
      this.player.play("walk-down", true);

    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
       this.player.play("player-idle", true);
    }
    // if (this.cursors.space.isDown) {
    //   this.bullets.fireBullet(this.player.x, this.player.y);
    // }
    
    if (this.input.activePointer.primaryDown ) {
      
      this.bullets.fireBullet(this.player.x, this.player.y);
      this.player.play("shoot", true)
    }
    
  }
  CollisionHandler() {
    console.log("collision");
    health -= 0.05;
    console.log("health: ", health);
    if (health <= 0) {
      console.log("game over");
      location.reload();
    }
  }
  
  update(time, delta) {
    if(gameOver === true){
      //laad game over scherm
      location.reload();

    }
    //update each game tick
    this.playerMovement();
    //boss test
    if (score === 5 && !bossSpawned) {
      boss = new Boss2(this,400, 400);
      this.enemies.add(boss);
      bossSpawned = true;
      boss.StartMoving();
      this.enemies.add(boss);
      //this.add.sprite(boss.x, boss.y,"boss");
      console.log(boss)
      window.alert("boss")
      //this.enemies.add(boss);
      //this.enemies.refresh();
      
      //boss.StartMoving(this.player.x, this.player.y);

      //boss.StartMoving(this.player.x, this.player.y)
    }
  
    
    //end boss test

    //enemy movement
    children.forEach(element => {
        element.StartMoving(this.player.x, this.player.y)
    });

  }
}
