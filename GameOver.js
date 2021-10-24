import World3 from "./World3.js"
export default class GameOver extends Phaser.Scene
{
    constructor() {
        super("GameOver");
    }
    create(){
       //console.log(World3.TellScore());
       const GameScore = localStorage.getItem('score');
        const lost = this.add
        .text(window.innerWidth/5 , window.innerHeight/2 , `Enemies slain: ${GameScore}`, {
          fontSize: "50px",
          align: "center",
        });
        const Slain = this.add
        .text(window.innerWidth/5 , window.innerHeight/4 , "Game Over!", {
          fontSize: "100px",
          align: "center",
        });
        const restart = this.add
        .text(window.innerWidth/5 , window.innerHeight/2.5 , "press space to restart", {
          fontSize: "35px",
          align: "center",
        });
        this.physics.add.existing(lost);
        this.physics.add.existing(Slain);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    }
    update(){
        if(this.keySpace.isDown){
           location.reload();
        }
    }
}