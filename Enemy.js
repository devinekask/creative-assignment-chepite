// import Boss from "./Boss.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
          super(scene, x, y, 'enemy');
          this.health = 750;
    }

    Spawn(){
          let angle =
            Phaser.Math.Angle.BetweenPoints(this, this.scene.player) * 55;
          const dir = this.scene.physics.velocityFromAngle(
            angle,
            100,
            this.body.velocity
          );
          this.setVelocityY(dir.y);
          this.setVelocityX(dir.x);
}
    StartMoving (x, y)
    {
            //og code
             this.Spawn(x, y);
            //end og code
    }
}