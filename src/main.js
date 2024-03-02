// Nathan Altice
// BurgerBoss Adaptation
// 2/17/24

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 256,
    height: 144,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                y: 1000
            }
        },
    },
    zoom: 4,
    scene: [ Load, Keys, Menu, Play ]
}

let game = new Phaser.Game(config)