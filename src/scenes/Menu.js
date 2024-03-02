class Menu extends Phaser.Scene {
    constructor() {
        super('sceneMenu')
    }

    preload() {
        
    }

    create() {
        console.log('Menu: create')

        // grab keyboard binding from Keys scene
        this.KEYS = this.scene.get('sceneKeys').KEYS

        // temp menu text
        this.add.bitmapText(0, 0, 'pixeled-font', 'BurgerBoss\n\nMain Menu\n\nArrows move, F jumps\n\nF to play\n\n', 5)

        //this.scene.start('scenePlay')
    }

    update() {
        // get local KEYS reference
        const { KEYS } = this

        if (KEYS.JUMP.isDown) {
            this.scene.start('scenePlay')
        }
    }
}