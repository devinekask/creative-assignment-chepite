// import Boss from "./Boss.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,x,y){
       
          super(scene, x, y, 'enemy');
          this.health = 250;
        
    }
    

    Spawn(){
        //define spritename
        //maybe an array with multiple enemy sprites so there is some variation
       // this.scene.physics.add.sprite(this.x, this.y, "enemy");
        //test enemy movement
        //zorg misschien voor een random "range" van max 64pixels (hitbox) zodat ze niet allemaal line-uppen als je te lang still staat
      let angle = Phaser.Math.Angle.BetweenPoints(this, this.scene.player)*55;
      //console.log("velocity body ", this.body.velocity);
        const dir = this.scene.physics.velocityFromAngle(angle, 50 , this.body.velocity);
        this.setVelocityY(dir.y)
        this.setVelocityX(dir.x)
        //end test enemy movement

       
        
}

    StartMoving (x, y)
    {
        
            //og code
             this.Spawn(x, y);
            //end og code
        
    }





}