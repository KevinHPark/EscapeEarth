
// The game config that is used by Phaser
var config = {
    type: Phaser.AUTO,
    parent: 'escape-earth',
    width: 800,
    height: 600,
    scene: [MainMenuScene, PlayerHouseScene, WorldScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
};
// Create a new Phaser Game object
var game = new Phaser.Game(config);
