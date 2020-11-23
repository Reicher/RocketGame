import Ship from '../ship'
import Tile from '../tile';

export default class GameScene extends Phaser.Scene {
    ship: Ship;
    player: Ship;
    filler: Phaser.GameObjects.TileSprite;

    constructor() {
        super({
            key: 'GameScene'
        });

        this.filler = {} as Phaser.GameObjects.TileSprite
        this.ship = {} as Ship
        this.player = {} as Ship
    }
    preload() {
		console.log("GameScene - preload");
    }
    create() {
		console.log("GameScene - create");

		// There must be a better way to have infinite space?
		this.filler = this.add.tileSprite(-1000, -1000,
						2000,
						2000,
                        'filler');

		this.filler.setOrigin(0);

        const tileBody = this.cache.json.get('tiles');

        const ground = new Tile(this, 0, 0, 'ground', tileBody.ground)
        const bottomLeft = new Tile(this, -ground.displayWidth, 0, 'bottom-left', tileBody.bottom_left)
        const vertical  = new Tile(this, -ground.displayWidth, -bottomLeft.displayHeight, 'vertical', tileBody.vertical)

		this.player = new Ship(this, 100, 50);
    }

    update(time, delta) {
        const { x: prevX, y: prevY } = this.player.prevPos

        this.player.update(time, delta);

		this.cameras.main.startFollow(this.player)

        // Not needed so often?
		this.events.emit('CalcScore', this.player);
    }


}
