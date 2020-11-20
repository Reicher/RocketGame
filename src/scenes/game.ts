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
		//tilemap[1][0] = new Tile(this, 0, 0, 'ground', tileBody.ground)
		//tilemap[0][1] = new Tile(this, 0, 0, 'bottom-left', tileBody.bottom_left)
		//tilemap[0][1] = new Tile(this, -400, -400, 'vertical', tileBody.vertical)

		// const ground = this.matter.add.image(0, 0, 'ground', undefined, {
        //     shape: tileBody.ground,
        // });
        // console.log((ground.body as MatterJS.BodyType).centerOfMass)
        
        // ground.setPosition(0 + (ground.body as MatterJS.BodyType).centerOfMass.x, 0 + (ground.body as MatterJS.BodyType).centerOfMass.y)
        
        // const bottomLeft = this.matter.add.image(0, 0, 'bottom-left', undefined, {
        //     shape: tileBody.bottom_left,
        // });
        // console.log((bottomLeft.body as MatterJS.BodyType).centerOfMass)
		//var bottom_left = this.matter.add.image(0, 0, 'bottom-left', null, {shape: tileBody.bottom_left});

		//var planet = new Planet(this, 0, 0);
		this.ship = new Ship(this, 0, 0);
		//this.spaceman = new Spaceman(this, 30, -200);

		//this.player = this.spaceman;
        this.player = this.ship;
    }

    update(time, delta) {
        const prevY = this.player.y
        const prevX = this.player.x
		this.player.update(time, delta);

		this.space.tilePositionX += prevX - this.ship.x;
		this.space.tilePositionY += prevY - this.ship.y;

		this.cameras.main.startFollow(this.player)

		// Not needed so often?, prob not :D
		this.events.emit('CalcScore', this.player);
    }
}
