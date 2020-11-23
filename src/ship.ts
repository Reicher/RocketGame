
export const EVENTS = {
    UPDATE_HEALTH: 'updateHealth'
}

export interface UpdateHealthPayload {
    current: number
    max: number
}

export default class Ship extends Phaser.Physics.Matter.Image {
    turnRate: number
    fuel: number
    maxFuel = 250

    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    prevPos: {
        x: number,
        y: number
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene.matter.world, x, y, "ship");
        this.fuel = this.maxFuel
        this.setScale(0.05); // Should be pre-scaled...
        this.setFrictionAir(0.01);
        this.setMass(30);
        this.setBounce(0.01);
        //this.setStatic(true)

        this.cursors = scene.input.keyboard.createCursorKeys();
            scene.add.existing(this);

        this.turnRate = 0.002;
        this.angle = -90

        this.prevPos = {
            x, 
            y
        }
    }

    turn(delta: number, direction: string) {
        if (direction == "Left")
            this.setAngularVelocity(-this.turnRate * delta);
        else if (direction == "Right")
            this.setAngularVelocity(this.turnRate * delta);
    }

    fireEngine(delta: number) {
        if(this.fuel > 0) {
            this.fuel -= 1
            this.emit(EVENTS.UPDATE_HEALTH, {
                current: this.fuel,
                max: this.maxFuel
            })
        }
        this.thrust(0.007 * delta);
    }

    update(time, delta) {
        this.prevPos = {
            x: this.x,
            y: this.y
        }
        //this.scene.cameras.main.setAngle(-this.angle-90); // whyyy?

        if (this.cursors.left?.isDown) this.turn(delta, "Left")
        else if (this.cursors.right?.isDown) this.turn(delta, "Right")
        if (this.cursors.up?.isDown) this.fireEngine(delta);
    }
}
