import Tile from './tile';

const map = [
    ['vertical'],
    ['vertical'],
    ['vertical'],
    ['bottom-Left', 'ground', 'ground', 'ground', 'ground']
] as const;

const tileSize = {x: 500, y: 500}

export default class Level {
    filler: any;
    tiles: any;
    constructor(scene: Phaser.Scene) {

        const mapWidth = Math.max(...map.map(a=>a.length));
        const mapHeight = map.length
        this.filler = scene.add.tileSprite(-tileSize.x, -tileSize.y,
            500 * (mapWidth+2),
            500 * (mapHeight+2),
            'filler');
        this.filler.setOrigin(0);

        const tileBody = scene.cache.json.get('tiles');
        this.tiles = [];
        for(let i = 0; i < map.length; i++) {
            this.tiles[i] = [];
            for(let j = 0; j < map[i].length; j++) {
                switch (map[i][j]) {
                    case 'bottom-Left':
                        this.tiles[i][j] = new Tile(scene, j * tileSize.x, i*tileSize.y, 'bottom-left', tileBody.bottom_left)
                        break;
                    case 'vertical':
                        this.tiles[i][j] = new Tile(scene, j * tileSize.x, i*tileSize.y, 'vertical', tileBody.vertical)
                        break;
                    case 'ground':
                        this.tiles[i][j] = new Tile(scene, j * tileSize.x, i*tileSize.y, 'ground', tileBody.ground)
                        break;
                    default:
                        console.log(`Weird tilename ${map[i][j]} not found in level`);
                }
            }
         }
    }
}
