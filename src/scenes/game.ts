import Ship from '../ship'
import Tile from '../tile';

export default class GameScene extends Phaser.Scene {
    space: Phaser.GameObjects.TileSprite;
    ship: Ship;
    player: Ship;

    constructor() {
        super({
            key: 'GameScene'
        });

        this.space = {} as Phaser.GameObjects.TileSprite
        this.ship = {} as Ship
        this.player = {} as Ship
    }
    preload() {
		console.log("GameScene - preload");
    }
    create() {
		console.log("GameScene - create");

		// There must be a better way to have infinite space?
		this.space = this.add.tileSprite(-this.cameras.main.width/2,
						-this.cameras.main.height/2,
						this.cameras.main.width*2,
						this.cameras.main.height*2,
                        'space');

		this.space.setOrigin(0);
		this.space.setScrollFactor(0);

        const tileBody = this.cache.json.get('tiles');

        const ground = new Tile(this, 0, 0, 'ground', tileBody.ground)
        const bottomLeft = new Tile(this, -ground.displayWidth, 0, 'bottom-left', tileBody.bottom_left)
        const vertical  = new Tile(this, -ground.displayWidth, -bottomLeft.displayHeight, 'vertical', tileBody.vertical)
		
		this.ship = new Ship(this, -ground.displayHeight / 2, 0);
        this.player = this.ship;
    }

    update(time, delta) {
        const { x: prevX, y: prevY } = this.player.prevPos
        
        this.player.update(time, delta);

		this.space.tilePositionX -= (prevX - this.ship.x) + 0.005 * delta;
		this.space.tilePositionY -= (prevY - this.ship.y) + 0.005 * delta;

		this.cameras.main.startFollow(this.player)

        // Not needed so often?
		this.events.emit('CalcScore', this.player);
    }


}
