export default class Ship extends Phaser.Physics.Matter.Image {
    fuel: number
    fuelConsumption: number
    fuelConsumptionTurn: number
    turnRate: number
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    prevPos: {
        x: number,
        y: number
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene.matter.world, x, y, "ship");

        this.setScale(0.05); // Should be pre-scaled...
        this.setFrictionAir(0.01);
        this.setMass(30);
        this.setBounce(0.01);
        //this.setStatic(true)

        this.cursors = scene.input.keyboard.createCursorKeys();
            scene.add.existing(this);

        this.fuel = 100;
        this.turnRate = 0.002;
        this.fuelConsumption = 0.05;
        this.fuelConsumptionTurn = this.fuelConsumption * 0.5;

        this.angle = -90

        this.prevPos = {
            x, 
            y
        }
    }

    turn(delta, direction) {
        if (this.fuel > 0) {
            if (direction == "Left")
            this.setAngularVelocity(-this.turnRate * delta);
            else if (direction == "Right")
            this.setAngularVelocity(this.turnRate * delta);

            this.fuel -= delta * this.fuelConsumptionTurn;
        }
    }

    fireEngine(delta) {
        if (this.fuel > 0) {
            this.thrust(0.007 * delta);
            this.fuel -= delta * this.fuelConsumption;
        }
    }

    useDoor(player) {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        if (distance < 70)
            return true
        else
            return false
    }

    update(time, delta) {
        this.prevPos = {
            x: this.x,
            y: this.y
        }
        this.scene.cameras.main.setAngle(-this.angle-90); // whyyy?

        if (this.cursors.left?.isDown) this.turn(delta, "Left")
        else if (this.cursors.right?.isDown) this.turn(delta, "Right")
        if (this.cursors.up?.isDown) this.fireEngine(delta);
    }
}
