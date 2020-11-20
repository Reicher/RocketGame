import config from '~/config';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        console.log("BootScene - preload");

        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0,
                config.height / 2,
                config.width * value,
                60);
        });

        this.load.image("ship", "assets/ship.png");
        this.load.image("space", "assets/space.jpg");
        this.load.image("planet", "assets/planet.png");

        this.load.image("ground", "assets/tiles/ground.png");
        this.load.image("vertical", "assets/tiles/vertical.png");
        this.load.image("bottom-left", "assets/tiles/bottom-left.png");
        this.load.spritesheet('spaceman', 'assets/spaceman.png', { frameWidth: 16, frameHeight: 32 });

        // Load body shapes from JSON file generated using PhysicsEditor
        this.load.json('tiles', 'assets/tiles/bodies.json');

        this.load.on('complete', () => progress.destroy());
    }

    create() {
        console.log("BootScene - Create");
        this.scene.start('SplashScene');
    }
}
