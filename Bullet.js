
export default class Bullet extends Phaser.Physics.Arcade.Sprite
{
    
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
        
    }

    // fire (x, y)
    // {
        
    //     this.body.reset(x, y);

    //     this.setActive(true);
    //     this.setVisible(true);

    //     //zorg voor modular shooting -> schiet naar kant waar character nu naar kijkt --> doe gewoon met muis
    //     this.setVelocityY(-300);
    // }
    fire (x, y)
    {
        // //og
        this.body.reset(x, y);
        this.setDepth(0)
        this.setActive(true);
         this.setVisible(true);

        //zorg voor modular shooting -> schiet naar kant waar character nu naar kijkt --> doe gewoon met muis
        //this.setVelocityY(-300);
        // //end og

        //fully working
        //*50 is nodig omdat anders de angles bijna niet te zien zijn
        let angle = Phaser.Math.Angle.BetweenPoints(this.scene.player, this.scene.input.mousePointer)*75  ;
        const dir = this.scene.physics.velocityFromAngle(angle, 200 , this.body.velocity);
        this.setVelocityY(dir.y)
        this.setVelocityX(dir.x)
        //end fully working
    }

    preUpdate (time, delta)
    {
       
        super.preUpdate(time, delta);
        

        // if (this.y <= this.scene.player.y-100 || this.y >= this.scene.player.y +100 ||this.x <= this.scene.player.x-100 || this.x >= this.scene.player.x +100 )
        // {
        //     this.setActive(false);
        //     this.setVisible(false);
        // }
    }
}