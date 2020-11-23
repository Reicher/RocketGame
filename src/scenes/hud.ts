import config from '~/config'
import Ship, { EVENTS, UpdateHealthPayload } from '~/ship'

export interface HuDCreateOptions {
    player: Ship
}

const hudOptions = {
    spacing: 20
}

const barOptions = {
    height: 35,
    width: config.width / 4,
    strokeColor: 0x0B6623,
    maxFillColor: 0x3BB143,
    minFillColor: 0x8C1515
}

export default class HuDScene extends Phaser.Scene {
    player: Ship
    healthBar: Phaser.GameObjects.Graphics
    healthBarX: number
    healthBarY: number
    healthText: Phaser.GameObjects.Text

    constructor() {
        super({})

        this.healthBarX = hudOptions.spacing
        this.healthBarY = config.height - barOptions.height - hudOptions.spacing

        this.player = {} as Ship
        this.healthBar = {} as Phaser.GameObjects.Graphics
        this.healthText = {} as Phaser.GameObjects.Text
    }

    preload(){
        console.log('HuD - Preload')
    }
    create(data: HuDCreateOptions) {
        console.log('HuD - Create')

        this.player = data.player

        this.healthBar = this.add.graphics()

        this.healthText = this.add.text(0, 0, `${this.player.maxFuel} / ${this.player.maxFuel}`, { font: `bold ${barOptions.height - 20}px monospace`, fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle", maxWidth: 200 })
        this.healthText.setPosition(this.healthBarX + barOptions.width / 2 - this.healthText.displayWidth / 2, this.healthBarY + barOptions.height / 2 - this.healthText.displayHeight / 2)

        this.updateHealth({ current: this.player.maxFuel, max: this.player.maxFuel })

        this.player.addListener(EVENTS.UPDATE_HEALTH, this.updateHealth.bind(this))
    }

    updateHealth({ current, max }: UpdateHealthPayload) {
        const percentageFuel = current / max
        const healthColor = percentageFuel < 0.25 ? barOptions.minFillColor : barOptions.maxFillColor
        const barWidth = Math.floor(barOptions.width * percentageFuel)

        this.healthText.setText(`${current} / ${max}`)

        this.healthBar.clear()
        
        this.healthBar.lineStyle(2, Phaser.Display.Color.ValueToColor(healthColor).darken(25).color)
        this.healthBar.strokeRect(this.healthBarX, this.healthBarY, barOptions.width, barOptions.height + 2)
        
        this.healthBar.fillStyle(healthColor)
        this.healthBar.fillRect(this.healthBarX + 1, this.healthBarY + 1, barWidth, barOptions.height)
    }
}