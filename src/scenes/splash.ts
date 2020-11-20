export default class SplashScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'SplashScene'
        });
    }
    preload() {
        console.log("SplashScene - preload");
    }
    create() {
        console.log("SplashScene - create");
        this.scene.bringToTop();
        this.scene.start('MainMenuScene');
    }
}
