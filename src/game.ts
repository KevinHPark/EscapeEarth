import 'phaser';

import PlayerHouseScene from './scenes/player_house';

const gameConfig:Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [PlayerHouseScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
    
};

const game = new Phaser.Game(gameConfig);