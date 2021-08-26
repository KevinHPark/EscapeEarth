const WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function WorldScene (){
        Phaser.Scene.call(this, {key: 'world'})
    },
    preload: function() {
        this.load.image('world-map','assets/Open-World.png')
    },
    create: function() {
        this.add.image(400,300,'world-map')

        //goes back to playerHouse for now
        this.input.once('pointerdown', function () {
            this.scene.start('playerHouse');

        }, this);
    }
})