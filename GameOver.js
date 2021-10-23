import World3 from "./World3.js"
export default class GameOver extends Phaser.Scene
{
    constructor() {
        super("GameOver");
        
    }
    create(){
        console.log(World3.TellScore());
    }
}