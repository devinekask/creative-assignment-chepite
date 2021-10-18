import Bullet from './Bullet.js'
export default class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 1,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y)
    {
        let bullet = this.getFirstDead(true);
        //let bullet = this.getFirstDead(true);
        if (bullet)
        {
            //og code
             bullet.fire(x, y);
            //end og code
        }
    }
}