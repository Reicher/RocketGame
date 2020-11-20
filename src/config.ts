const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
        matter: {
			debug: true
        }
	},
}

export default config