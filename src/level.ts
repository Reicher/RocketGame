export default class Level {
    filler: any;
    constructor(scene: Phaser.Scene) {

        this.filler = scene.add.tileSprite(0, 0,
            500,
            500,
            'filler');
        this.filler.setOrigin(0);
    }
}
