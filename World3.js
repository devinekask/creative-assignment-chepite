import Bullets from "./Bullets.js";
//import Enemy from "./Enemy.js"

import Enemies from "./Enemies.js";

import Bosses from "./Bosses.js";
//end test boss
let score = 0;
let children;
let boss;
let bossSpawned = false;
let gameOver;
let spawnPoint;
let scoreText;
//test special ove
  let nades = 1;
  let text ;
  //let groundpunched = false;
//end test

function hit(player, enemy) {
  if (enemy.health <= 0) {
    score++;
    enemy.destroy();
    
    //console.log("enemy health: ", enemy.health);
  } else {
  //  console.log("hit", enemy.health);
    enemy.health--;
  }
}
function hitBosses(player, boss) {
 // console.log("boss hit", boss.health)
  if(boss.health <=0){
    boss.destroy();
    gameOver = true;
    location.reload();
  }
  else{
    boss.health--;
    //console.log(boss.health)
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
    this.bosses;
  }
  init() {
    window.addEventListener("resize", this.applyResize);
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  applyResize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }
  preload(){}
  // preload() {
  //   this.load.image("base", "./assets/images/FullGround.png");
  //   this.load.image("bullet", "./assets/images/bullet.png");
  //   this.load.image("decorationOne", "./assets/Dungeon_B.png");
  //   this.load.image("decorationTwo", "./assets/Dungeon_A2.png");
  //   //bullet test
  //   this.load.image("bullet", "./assets/images/bullet.png");
  //   //bullet test
  //   //enemy test
  //   this.load.image("enemy", "./assets/images/enemy.png");
  //   //end enemy test
  //   //boss test
  //   this.load.image("boss", "./assets/images/boss.png");
  //   //end boss test
  //   //test player
  //   this.load.spritesheet(this.charKey, "./assets/sprites/sprite_map.png", {
  //     frameWidth: 64,
  //     frameHeight: 64,
  //     margin: 0,
  //     spacing: 0,
  //   });

  //   //end test player
  //   //this.load.tilemapTiledJSON("map", "./world.json");
  //   this.load.tilemapTiledJSON("map", "./assets/worldV3.json");
  // }
  create() {
    //const map = this.make.tilemap({key: "map"});
    const map = this.make.tilemap({ key: "map" , tileWidth: 32, tileHeight: 32});
    spawnPoint = map.findObject(
      "spawns",
      (obj) => obj.name === "SpawnPoint"
    );
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    // const tileset = map.addTilesetImage("FullGroundTest", "base");
    // const worldset = map.addTilesetImage("mushroom", "shroom");
    // const bottomlayer = map.createStaticLayer("bottom", tileset, 0, 0);
    // const worldlayer = map.createStaticLayer("world", worldset, 0, 0);
    const tileset = map.addTilesetImage("tiles", "base");
    const decoration1 = map.addTilesetImage("decoration1", "decorationOne");
    const decoration2 = map.addTilesetImage("decoration2", "decorationTwo");
    const wallslayer = map.createStaticLayer("walls", decoration2, spawnPoint.x, spawnPoint.y);
    const bottomlayer = map.createStaticLayer("bottom", tileset, spawnPoint.x, spawnPoint.y);
    const decorationlayer = map.createStaticLayer("decoration", decoration1, spawnPoint.x, spawnPoint.y);

    //cam
    const camera = this.cameras.main;
    //camera.setZoom(2);
    //camera.setBounds(map.widthInPixels, map.heightInPixels, map.widthInPixels, map.heightInPixels);
    //collision
    //this.player.setCollideWorldBounds(true);
    

   //this.physics.add.collider(this.player, wallslayer,this)
      
  

    //player
    this.createPlayer(map);
    
    
      //test debug

      const debugGraphics = this.add.graphics().setAlpha(0.75);
      wallslayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
      //end test debug
    this.cameras.main.startFollow(this.player);
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
        end: 31,
      }),
      frameRate: 6,
      repeat: 0,
    });
    // end test anims
    

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

    this.physics.add.overlap(this.bullets, this.enemies, hit);

    // test hit detection
    this.physics.add.overlap(this.player, this.enemies, this.CollisionHandler);

   


    this.enemies.scaleXY(0.1, 0.1);

    text = this.add.text(this.player.x, this.player.y, `'nades left: ${nades}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    wallslayer.setCollisionByProperty({collides: true});
    this.physics.add.collider(this.enemies, wallslayer);
    this.physics.add.collider(this.player, wallslayer);
  }

  //get enemies and boss spawnpoints
  getSpawnpoints(map){

  }

  createEnemies() {
    this.enemies.StartMoving(this.player.x, this.player.y);
  }

  createPlayer(map) {
    //search spawnpoint and add player there
    // const spawnPoint = map.findObject(
    //   "spawns",
    //   (obj) => obj.name === "SpawnPoint"
    // );
    console.log(spawnPoint);
    this.player = this.physics.add.sprite(1050, 1050, this.charKey);
    // this.player.setScale(1.5);
    health = 5;
    this.player.setDepth(1);
  }

  playerMovement() {
    //make keys and cursors
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    //special move test
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    
    //end special move test
    if (this.cursors.left.isDown || this.keyQ.isDown) {
      this.player.setVelocityX(-150);
      this.player.flipX = true;
      //this.player.play(`left`, true);
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      this.player.setVelocityX(150);
      this.player.flipX = false;
      //this.player.play(`right`, true);
    } else if (this.cursors.up.isDown || this.keyZ.isDown) {
      this.player.setVelocityY(-150);
      this.player.play("walk-up", true);

      //this.player.play(`right`, true);
    } else if (this.cursors.down.isDown || this.keyS.isDown) {
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

    if (this.input.activePointer.primaryDown) {
      this.bullets.fireBullet(this.player.x, this.player.y);
      this.player.play("shoot", true);
    }
    
    //nade deals 750 damage to all enemies making them oneshot (instakill from cod zombies)
    if(this.keyE.isDown && this.enemies && nades > 0){
      text.destroy();
      nades--;
      text = this.add.text(this.player.x, this.player.y, `'nades left: ${nades}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
      //console.log(children)
      children.forEach(element => element.health -=750)
    }
  }
  //async was needed because function kept beeing called and reload didn't have time to complete
  async CollisionHandler () {
   // console.log("collision");
    health -= 0.05;
    //console.log("health: ", health);
    if (health <= 0) {
      // zorg voor text overlay met button
      //als button geklikt wordt location.reload
      console.log("game over");
      await location.reload();
      
     
    }
  }

  update(time, delta) {
    
        
  
    scoreText = this.add.text(16, 16, `Score: ${score}` , { fontSize: '32px', fill: '#000' });
    if(text){
    text.x = this.player.x;
    text.y = this.player.y - 48;
    }
    //update each game tick
    this.playerMovement();
    //boss test
    if (score === 5 && !bossSpawned) {

      this.bosses = new Bosses(this);
      text.destroy();
      nades++;
      text = this.add.text(this.player.x, this.player.y, `'nades left: ${nades}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
      
 
    }

    if (this.bosses && bossSpawned === false) {
          this.physics.add.overlap(this.bullets, this.bosses, hitBosses);
          this.physics.add.overlap(this.player, this.bosses, this.CollisionHandler);

      console.log("boss spawned")
      bossSpawned = true;
      
      
    }
   
    //end boss test
    //enemy movement
    children.forEach((element) => {
      element.StartMoving(this.player.x, this.player.y);
    });
    let bosschildren;
    if(this.bosses){
       bosschildren = this.bosses.getChildren();
       bosschildren.forEach((element) =>
        element.StartMoving(this.player.x, this.player.y)
      );
    }
    
   
    
    console.log(children.length);
    if(children.length <= 5){
      for(let i = 0; i <2; i++){
        this.enemies.create(this.player.x + Math.random() * 800, this.player.y + Math.random() * 800, 'enemy');
      }
      
    }

    //boss movement
  
    //end boss movement
      
  }
}
