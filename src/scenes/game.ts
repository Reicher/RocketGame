import Level from '~/level';
import { HuDScene } from '.';
import Ship from '../ship'

export default class GameScene extends Phaser.Scene {
    player: Ship;
    filler: Phaser.GameObjects.TileSprite;
    level: Level;

    constructor() {
        super({
            key: 'GameScene'
        });

        this.filler = {} as Phaser.GameObjects.TileSprite
        this.player = {} as Ship
        this.level = {} as Level
    }
    preload() {
        console.log("GameScene - preload");
    }
    create() {
		console.log("GameScene - create");

        const tileBody = this.cache.json.get('tiles');

        this.level = new Level(this)
        this.player = new Ship(this, 100, 50);

        this.scene.add('HuDScene', HuDScene, true, {
            player: this.player
        })
    }

    update(time, delta) {

        this.player.update(time, delta);

		this.cameras.main.startFollow(this.player)

        // Not needed so often?
		this.events.emit('CalcScore', this.player);
    }


}
