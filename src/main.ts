import Phaser from 'phaser'
import config from './config'
import * as scenes from './scenes'

export default new Phaser.Game({
    ...config,
    scene: Object.values(scenes)
})
