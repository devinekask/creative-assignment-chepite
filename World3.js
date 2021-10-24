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
let nades = 1;
let text;
//end test

function hit(player, enemy) {
  if (enemy.health <= 0) {
    score++;
    enemy.destroy();
    console.log(score);
    //console.log("enemy health: ", enemy.health);
  } else {
    //  console.log("hit", enemy.health);
    enemy.health--;
  }
}
function hitBosses(player, boss) {
  // console.log("boss hit", boss.health)
  if (boss.health <= 0) {
    boss.destroy();
  } else {
    boss.health--;
  }
}
let health;
export default class World extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player;
    this.charKey = "player";
    this.cursors;
    this.health;
    this.bullets;
    this.time = 0;
    this.lastFired;
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
  preload() {}
  create() {
    //const map = this.make.tilemap({key: "map"});
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });
    spawnPoint = map.findObject("spawns", (obj) => obj.name === "SpawnPoint");
    const tileset = map.addTilesetImage("tiles", "base");
    const decoration1 = map.addTilesetImage("decoration1", "decorationOne");
    const decoration2 = map.addTilesetImage("decoration2", "decorationTwo");
    const wallslayer = map.createStaticLayer(
      "walls",
      decoration2,
      spawnPoint.x,
      spawnPoint.y
    );
    const bottomlayer = map.createStaticLayer(
      "bottom",
      tileset,
      spawnPoint.x,
      spawnPoint.y
    );
    const decorationlayer = map.createStaticLayer(
      "decoration",
      decoration1,
      spawnPoint.x,
      spawnPoint.y
    );
    //cam
    const camera = this.cameras.main;
    camera.setZoom(1.4);
    this.createPlayer(map);
    //debug
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // wallslayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
    //end debug
    this.cameras.main.startFollow(this.player);
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
    children = this.enemies.getChildren();
    for (var i = 0; i < children.length; i++) {
      var x = Phaser.Math.Between(1300, 1500);
      var y = Phaser.Math.Between(1300, 1500);
      children[i].setPosition(x, y);
    }
    this.physics.add.overlap(this.bullets, this.enemies, hit);
    // test hit detection
    this.physics.add.overlap(this.player, this.enemies, this.CollisionHandler);
    this.enemies.scaleXY(0.1, 0.1);

    text = this.add.text(this.player.x, this.player.y, `'Use nade: E`, {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    wallslayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.enemies, wallslayer);
    this.physics.add.collider(this.player, wallslayer);
  }
  //get enemies and boss spawnpoints
  getSpawnpoints(map) {}

  createEnemies() {
    this.enemies.StartMoving(this.player.x, this.player.y);
  }
  createPlayer(map) {
    console.log(spawnPoint);
    this.player = this.physics.add.sprite(1050, 1050, this.charKey);
    health = 10;
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
    if (this.input.activePointer.primaryDown) {
      this.bullets.fireBullet(this.player.x, this.player.y);
      this.player.play("shoot", true);
    }
    //nade deals 750 damage to all enemies making them oneshot (instakill from cod zombies)
    if (this.keyE.isDown && this.enemies && nades > 0) {
      text.destroy();
      nades--;
      text = this.add.text(this.player.x, this.player.y, `'Use nade: E`, {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      });
      //console.log(children)
      children.forEach((element) => (element.health -= 750));
    }
  }
  CollisionHandler() {
    // console.log("collision");
    health -= 0.05;
    //console.log("health: ", health);
    if (health <= 0) {
      gameOver = true;
    }
  }

  update(time, delta) {
    if (gameOver === true) {
      let myStorage = window.localStorage;
      localStorage.setItem("score", score);
      this.scene.start("GameOver");
    }
    // scoreText = this.add.text(16, 16, `Score: ${score}` , { fontSize: '32px', fill: '#000' });
    if (text) {
      text.x = this.player.x;
      text.y = this.player.y - 48;
    }
    //update each game tick
    this.playerMovement();
    //boss test
    if (score === 25 && !bossSpawned) {
      this.bosses = new Bosses(this, 1050, 1050);
      text.destroy();
      nades++;
      text = this.add.text(this.player.x, this.player.y, `'Use nade: E`, {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      });
    }
    
    if (this.bosses && bossSpawned === false) {
      this.physics.add.overlap(this.bullets, this.bosses, hitBosses);
      this.physics.add.overlap(this.player, this.bosses, this.CollisionHandler);

      console.log("boss spawned");
      bossSpawned = true;
    }
    //end boss test
    //enemy movement
    children.forEach((element) => {
      element.StartMoving(this.player.x, this.player.y);
    });
    let bosschildren;
    if (this.bosses) {
      bosschildren = this.bosses.getChildren();
      bosschildren.forEach((element) =>
        element.StartMoving(this.player.x, this.player.y)
      );
    }
    //console.log(children.length);
    if (children.length <= 5) {
      for (let i = 0; i < 2; i++) {
        this.enemies.create(
          1050 + Math.random() * 500,
          1050 + Math.random() * 500,
          "enemy"
        );
      }
    }
    //boss movement
    //end boss movement
  }
}
