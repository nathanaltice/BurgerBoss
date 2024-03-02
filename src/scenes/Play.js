class Play extends Phaser.Scene {
    constructor() {
        super('scenePlay')
    }

    preload() {

    }

    create() {
        console.log('Play: create')

        // grab keyboard binding from Keys scene
        this.KEYS = this.scene.get('sceneKeys').KEYS

        // create tilemap
        this.levelMap = this.add.tilemap('level01')
        this.levelTileset = this.levelMap.addTilesetImage('boss-tiles', 'boss-tileset')
        
        this.bgLayer = this.levelMap.createLayer('Background', this.levelTileset, 0, 0)
        this.terrainLayer = this.levelMap.createLayer('Terrain', this.levelTileset, 0, 0)

        this.terrainLayer.setCollisionByProperty({ collides: true })

        // create boss
        this.boss = new BurgerBoss(this, 25, 50, 'boss-sheet', 0)
        this.boss.anims.play('boss-idle')

        // set up camera
        this.cam = this.cameras.main
        this.cam.setBounds(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels)
        this.physics.world.setBounds(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels)

        // colliders
        this.physics.add.collider(this.boss, this.terrainLayer)

        // sound
        this.jumpSFX = this.sound.add('jump-sfx')
    }

    update() {
        // get local KEYS reference
        const { KEYS } = this

        // step state machine(s)
        this.bossFSM.step()

        //console.log(this.physics.world.bounds)

        // update physics world bounds to camera viewport to keep player in frame
        // this.physics.world.setBounds(this.cam.scrollX + 16, this.cam.scrollY, this.game.config.width, this.game.config.height)

        // scroll camera
        this.cam.scrollX += 0.25
    }
}