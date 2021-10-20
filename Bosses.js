import Boss2 from "./Boss2.js";
export default class Bosses extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      frameQuantity: 1,
      key: "boss",
      immovable: true,
      classType: Boss2,
    });
   
  }


}
