import Bullets from "./Bullets.js";

//test enemies
import Enemy from "./Enemy.js";
//end test enemies

//test boss
import Boss from "./Boss.js";
//end test boss
let score = 0;
let children;
let boss;
let bossSpawned = false;
let gameOver;
function hit(player, enemy) {
  if(enemy !== boss){
  enemy.body.enable = false;
  enemy.destroy();
  console.log("hit");
  score++;
  console.log("score: ", score);
}
else{
  console.log("big chungus hit");
  boss.health--;
  console.log("boss hp: ", boss.health);
  if(boss.health <=0 && !gameOver){
    window.alert("the boss has been slain");
    gameOver= true;
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
    this.load.spritesheet(this.charKey, "./assets/images/player.png", {
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
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //player
    this.createPlayer(map);
    this.cameras.main.startFollow(this.player);

    //bullet test
    this.bullets = new Bullets(this);
    // this.input.on("pointerdown", (pointer) => {
    //   this.bullets.fireBullet(this.player.x, this.player.y);
    // });
    this.enemies = this.physics.add.staticGroup({
      key: "enemy",
      frameQuantity: 6,
      immovable: false,
    });
     children = this.enemies.getChildren();
    for (var i = 0; i < children.length; i++) {
      var x = Phaser.Math.Between(50, 750);
      var y = Phaser.Math.Between(50, 550);

      children[i].setPosition(x, y);
    }
    this.enemies.refresh();
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
  }

  createEnemies(amount) {
    for (let i = 0; i < amount; i++) {
      let enemy = new Enemy(this, 100, 250);
      //enemies array test
      this.enemies.push(enemy);
      //end enemies array test
      enemy.Spawn();
    }
  }

  createPlayer(map) {
    //search spawnpoint and add player there
    const spawnPoint = map.findObject(
      "objects",
      (obj) => obj.name === "Spawn Point"
    );
    console.log(spawnPoint);
    this.player = this.physics.add.sprite(125, 100, this.charKey);
    this.player.setScale(1.5);
    health = 5;
  }

  anims() {
    this.player.anims.create({
      key: "player-idle",
      frames: this.scene.anims.generateFrameNumbers(this.charKey, {
        start: 0,
        end: 6,
      }),
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
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-150);
      //this.player.play(`right`, true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(150);
      //this.player.play(`right`, true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      // this.player.play("player-idle", true);
    }
    if (this.cursors.space.isDown) {
      this.bullets.fireBullet(this.player.x, this.player.y);
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
      location.reload();
    }
    //update each game tick
    this.playerMovement();
    //boss test
    if (score === 5 && !bossSpawned) {
      boss = new Boss(this,400, 400);
      bossSpawned = true;
      this.enemies.add(boss);
      //this.enemies.refresh();
      boss.Spawn();
    }
    //end boss test

    //enemy movement
    
    children.forEach(
      localEnemy =>
        function (localEnemy) {
          // if player within 400px
          if (this.physics.arcade.distanceBetween(localEnemy, this.player) < 400) {
            // rotate enemy to face towards player
            localEnemy.rotation = this.physics.arcade.angleBetween(localEnemy, this.player);
            // move enemy towards player at 150px per second
            this.physics.arcade.velocityFromRotation(
              localEnemy.rotation,
              150,
              localEnemy.body.velocity
            );
            // could add other code - make enemy fire weapon, etc.    }});
            //end enemy movement

            //this.physics.add.overlap(this.enemies, this.bullets, this.CollisionHandler);
          }
        }
    );
    
  }
}
