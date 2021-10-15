export default class Enemy extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,x,y){
        super(scene, x,y);
    }

    Spawn(){
        //define spritename
        //maybe an array with multiple enemy sprites so there is some variation
        this.scene.physics.add.sprite(this.x, this.y, "enemy");
    }



}