import Enemy from './Enemy.js'
export default class Boss extends Enemy{
    constructor(scene,x,y){
        super(scene,x,y, "boss");

        this.health= 500;    
    }
    
    // Spawn(){
    //     this.scene.physics.add.sprite(this.x, this.y, "boss");
    //     //console.log("boss spawned")
        
    // }
}