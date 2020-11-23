const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
        matter: {
			debug: false
        }
	},
}

export default config