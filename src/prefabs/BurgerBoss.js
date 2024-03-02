class BurgerBoss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, texture, frame = 0) {
        // invoke parent class and add to display list/physics world
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // define custom properties
        this.WALK_VELOCITY = 75
        this.MAX_VELOCITY_X = 150
        this.MAX_VELOCITY_Y = 500
        this.ACCELERATION = 250
        this.JUMP_VELOCITY = -350
        this.DRAG = 350

        this.body.setSize(this.width/2, this.height/2, false)
        this.body.setOffset(this.width/10, this.height/2)
        this.body.setCollideWorldBounds(true)
        this.body.setMaxVelocity(this.MAX_VELOCITY_X, this.MAX_VELOCITY_Y)
        
        this.body.setDragX(this.DRAG)

        // initialize state machine
        scene.bossFSM = new StateMachine('idle', {
            idle: new IdleState(),
            walk: new WalkState(),
            jump: new JumpState(),
            attack: new AttackState()
        }, [scene, this])
    }
}

// boss-specific state classes
class IdleState extends State {
    enter(scene, boss) {
        //console.log('IdleState: enter')
        
        boss.body.setAcceleration(0)    // allow drag to engage
    }

    execute(scene, boss) {
        const { KEYS } = scene

        if(boss.body.velocity.x == 0) {
            boss.anims.play('boss-idle')
        }

        // jump
        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.stateMachine.transition('jump')
        }

        // left/right to move
        if(KEYS.LEFT.isDown || KEYS.RIGHT.isDown) {
            this.stateMachine.transition('walk')
            return
        }
    }
}

class WalkState extends State {
    enter(scene, boss) {
        //console.log('WalkState: enter')
        boss.anims.play('boss-walk')
    }

    execute(scene, boss) {
        const { KEYS } = scene

        // jump
        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.stateMachine.transition('jump')
        }

        // back to idle
        if( !( KEYS.LEFT.isDown || KEYS.RIGHT.isDown ) ) {
            this.stateMachine.transition('idle')
        }

        // handle left/right movement
        if(KEYS.LEFT.isDown) {
            //boss.setFlip(true)
            //boss.body.setOffset(boss.width/2, boss.height/2)
            boss.body.setAccelerationX(-boss.ACCELERATION)
        }
        if(KEYS.RIGHT.isDown) {
            //boss.resetFlip()
            //boss.body.setOffset(boss.width/10, boss.height/2)
            boss.body.setAccelerationX(boss.ACCELERATION)
        }
    }
}

class JumpState extends State {
    enter(scene, boss) {
        //console.log('JumpState: enter')
        boss.anims.play('boss-jump')
        boss.body.setVelocityY(boss.JUMP_VELOCITY)

        // play sfx
        scene.sound.play('jump-sfx', {
            volume: 0.05
        })
    }

    execute(scene, boss) {
        const { KEYS } = scene

        let grounded = boss.body.touching.down || boss.body.blocked.down
        // end jump
        if(grounded) {
            this.stateMachine.transition('idle')
        }

        // handle movement
        if(KEYS.LEFT.isDown) {
            //boss.setFlip(true)
            //boss.body.setOffset(boss.width/2, boss.height/2)
            boss.body.setAccelerationX(-boss.ACCELERATION / 2)  // slower acceleration in air
        }

        if(KEYS.RIGHT.isDown) {
            //boss.resetFlip()
            //boss.body.setOffset(boss.width/10, boss.height/2)
            boss.body.setAccelerationX(boss.ACCELERATION / 2)
        }
    }
}

class AttackState extends State {
    enter(scene, boss) {
        
    }
}