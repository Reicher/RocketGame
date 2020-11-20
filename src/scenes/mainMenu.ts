class MainMenuScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenuScene'
        });
    }
    preload() {
        console.log("MainMenu - preload");
        // this.load.atlas('mario-sprites', 'assets/mario-sprites.png', 'assets/mario-sprites.json');
    }
    create() {
        console.log("MainMenu - create");
        this.scene.bringToTop();

        this.startGame();

        // this.input.on('pointerdown', () => {
        //     this.startGame();
        // });
    }

    update(time, delta) {
	
    }

    startGame() {
        this.scene.start('GameScene');
    }
}

export default MainMenuScene;
