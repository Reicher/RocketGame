import config from '~/config'
import Ship, { EVENTS, UpdateHealthPayload } from '~/ship'

export interface HuDCreateOptions {
    player: Ship
}

const MIN_HEALTH_THRESHOLD = 0.25

const barOptions = {
    height: 35,
    width: config.width / 4,
    strokeColor: 0x0B6623,
    maxFillColor: 0x3BB143,
    minFillColor: 0x8C1515
}

const hudOptions = {
    spacing: 20,
    textStyle: { font: `bold ${barOptions.height - 20}px monospace`, fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" }
}

export default class HuDScene extends Phaser.Scene {
    player: Ship
    healthBar: Phaser.GameObjects.Graphics
    healthBarX = 0
    healthBarY = 0
    healthText: Phaser.GameObjects.Text

    constructor() {
        super({})
        this.player = {} as Ship
        this.healthBar = {} as Phaser.GameObjects.Graphics
        this.healthText = {} as Phaser.GameObjects.Text
    }

    preload(){
        console.log('HuD - Preload')
    }
    create({ player }: HuDCreateOptions) {
        this.player = player

        const hudBackgroundHeight = barOptions.height + hudOptions.spacing * 2
        const hudBackground = this.add.graphics()
        hudBackground.fillStyle(0x333333, 0.87)
        hudBackground.fillRect(0, config.height - hudBackgroundHeight, config.width, hudBackgroundHeight)
        
        const fuelLabel = this.add.text(0, 0, 'Fuel', hudOptions.textStyle)
        this.healthBarX = hudOptions.spacing * 2 + fuelLabel.displayWidth
        this.healthBarY = config.height - barOptions.height - hudOptions.spacing

        this.healthBar = this.add.graphics()

        this.healthText = this.add.text(0, 0, `${this.player.maxFuel} / ${this.player.maxFuel}`, hudOptions.textStyle)
        this.healthText.setPosition(this.healthBarX + barOptions.width / 2 - this.healthText.displayWidth / 2, this.healthBarY + barOptions.height / 2 - this.healthText.displayHeight / 2)
        fuelLabel.setPosition(hudOptions.spacing, this.healthText.y)
        

        this.updateHealth({ current: this.player.maxFuel, max: this.player.maxFuel })
        this.player.addListener(EVENTS.UPDATE_HEALTH, this.updateHealth.bind(this))
    }

    updateHealth({ current, max }: UpdateHealthPayload) {
        const percentageFuel = current / max
        const healthColor = percentageFuel < MIN_HEALTH_THRESHOLD ? barOptions.minFillColor : barOptions.maxFillColor
        const barWidth = Math.floor(barOptions.width * percentageFuel)

        this.healthText.setText(`${current} / ${max}`)

        this.healthBar.clear()
        
        this.healthBar.lineStyle(2, Phaser.Display.Color.ValueToColor(healthColor).darken(25).color)
        this.healthBar.strokeRect(this.healthBarX, this.healthBarY, barOptions.width + 2, barOptions.height + 2)
        
        this.healthBar.fillStyle(healthColor)
        this.healthBar.fillRect(this.healthBarX + 1, this.healthBarY + 1, barWidth, barOptions.height)
    }
}