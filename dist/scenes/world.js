class WorldScene extends Phaser.Scene{
    
    constructor(){
        super('world')
        //TODO: need a way of keeping track of which areas are unlocked and feature flagged on...
        // the goal is to release incrementally
    }
    preload() {
        this.load.image('world-map','assets/Open-World.png')
    }
    create() {
        this.add.image(400,300,'world-map')

        //goes back to playerHouse for now
        this.input.once('pointerdown', function () {
            this.scene.start('playerHouse');

        }, this);
    }
}