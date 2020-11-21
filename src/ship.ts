export default class Ship extends Phaser.Physics.Matter.Image {
    turnRate: number
    cursors: Phaser.Types.Input.Keyboard.CursorKeys

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene.matter.world, x, y, "ship");

        this.setScale(0.05); // Should be pre-scaled...
        this.setFrictionAir(0.01);
        this.setMass(30);
        this.setBounce(0.01);
        //this.setStatic(true)

        this.cursors = scene.input.keyboard.createCursorKeys();
            scene.add.existing(this);

        this.turnRate = 0.002;
        this.angle = -90
    }

    turn(delta : number, direction: str) {
        if (direction == "Left")
            this.setAngularVelocity(-this.turnRate * delta);
        else if (direction == "Right")
            this.setAngularVelocity(this.turnRate * delta);
    }

    fireEngine(delta: number) {
        this.thrust(0.007 * delta);
    }

    update(time, delta) {
        //this.scene.cameras.main.setAngle(-this.angle-90); // whyyy?

        if (this.cursors.left?.isDown) this.turn(delta, "Left")
        else if (this.cursors.right?.isDown) this.turn(delta, "Right")
        if (this.cursors.up?.isDown) this.fireEngine(delta);
    }
}
