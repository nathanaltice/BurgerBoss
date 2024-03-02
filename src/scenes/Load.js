// Pixeled font by OmegaPC777: https://www.dafont.com/pixeled.font 

class Load extends Phaser.Scene {
    constructor() {
        super('sceneLoad')
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('boss-sheet', 'boss-sheet.png', {
            frameWidth: 16
        })
        this.load.spritesheet('boss-tileset', 'boss-tiles.png', {
            frameWidth: 16
        })
        this.load.spritesheet('point-collect-yellow', 'point-collect-yellow-sheet.png', {
            frameWidth: 16
        })
        this.load.spritesheet('flame-sheet', 'flame-sheet.png', {
            frameWidth: 32
        })

        this.load.path = './assets/tilemaps/'
        this.load.tilemapTiledJSON('level01', 'level01.json')

        this.load.path = './assets/fonts/'
        this.load.bitmapFont('pixeled-font', 'pixeled.png', 'pixeled.xml')

        this.load.path = './assets/sounds/'
        this.load.audio('jump-sfx', 'jump-temp.wav')
    }

    create() {
        // animation definitions
        this.anims.create({
            key: 'boss-idle',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('boss-sheet', { frames: [ 0 ]} )
        })

        this.anims.create({
            key: 'boss-walk',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('boss-sheet', { frames: [ 0, 1 ]} )
        })

        this.anims.create({
            key: 'boss-jump',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('boss-sheet', { frames: [ 5 ]} )
        })

        this.anims.create({
            key: 'boss-attack',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('boss-sheet', { frames: [ 2, 3 ] })
        })

        this.scene.start('sceneKeys')
    }
}