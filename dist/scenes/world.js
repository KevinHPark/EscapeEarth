class WorldScene extends Phaser.Scene{
    
    constructor(){
        super('world')
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