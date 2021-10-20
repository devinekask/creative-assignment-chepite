import Enemy from './Enemy.js'
export default class Enemies extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
      super(scene.physics.world, scene);
      this.createMultiple({
        frameQuantity: 6,
        key: "enemy",
        immovable: true,
        classType: Enemy,
      });
     // this.scaleXY(0.1);
    }
    

    // StartMoving (x, y)
    // {
    //     let enemy = this.getFirstDead(false);
    //     //let bullet = this.getFirstDead(true);
    //     if (enemy)
    //     {
    //         //og code
    //          enemy.Spawn(x, y);
    //         //end og code
    //     }
    // }
}