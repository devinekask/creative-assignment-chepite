import Enemey from './Enemy.js'
export default class Boss extends Enemy{
    constructor(){
        super(scene,x,y)
    }
    Spawn(){
        this.scene.physics.add.sprite(this.x, this.y, "boss");
    }
}