
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

        this.setActive(true);
         this.setVisible(true);

        //zorg voor modular shooting -> schiet naar kant waar character nu naar kijkt --> doe gewoon met muis
        //this.setVelocityY(-300);
        // //end og


        //werkt half
        //const vec = new Phaser.Math.Vector2(this.scene.input.mousePointer.worldX,this.scene.input.mousePoin ter.worldY);
    //     const vecx = new Phaser.Math.Vector2(this.scene.player.x,this.scene.input.mousePointer.worldX);
    //     const vecy = new Phaser.Math.Vector2(this.scene.player.y,this.scene.input.mousePointer.worldY);

    //     //console.log(vecy )
    //    // const dir = this.scene.physics.velocityFromAngle(vec, 1);
    //    const dirx = this.scene.physics.velocityFromAngle(vecx, 1);
    //    const diry = this.scene.physics.velocityFromAngle(vecy, 1);
    //     // this.setVelocityX(vec.x);
    //     // this.setVelocityY(vec.y);
    //     this.setVelocityX(dirx);
    //     this.setVelocityY(diry); 
    //     console.log(dirx, diry)
        //einde werkt half
 

        //tst
        //*50 is nodig omdat anders de angles bijna niet te zien zijn
        let angle = Phaser.Math.Angle.BetweenPoints(this.scene.player, this.scene.input.mousePointer)*55  ;
        const dir = this.scene.physics.velocityFromAngle(angle, 200 , this.body.velocity);
        this.setVelocityY(dir.y)
        this.setVelocityX(dir.x)
        //end tst


       
    }

    preUpdate (time, delta)
    {
       
        super.preUpdate(time, delta);
        

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}