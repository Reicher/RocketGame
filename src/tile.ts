interface TileInterface {
    matterBody: MatterJS.BodyType
}

export default class Tile extends Phaser.Physics.Matter.Image {
    matterBody: MatterJS.BodyType
    back: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, shape: any) {
        super(scene.matter.world, x, y, sprite, undefined, {
            shape
        } as Phaser.Types.Physics.Matter.MatterBodyConfig);

        this.matterBody = this.body as MatterJS.BodyType
        this.setPositionWithOffset(x, y)

        this.back = scene.add.sprite(x, y, 'back');
        this.back.setOrigin(0, 0)

        this.setStatic(true);
        this.setBounce(0.05);
        //this.setFriction(1)

        scene.add.existing(this.back);
        scene.add.existing(this);
    }

    setPositionWithOffset(x: number, y: number) {
        this.setPosition(x + this.matterBody.centerOffset.x, y + this.matterBody.centerOffset.y)
    }
}