const mainMenu = new Phaser.Class({

    initialize: function MainMenuScene (){
        Phaser.Scene.call(this, {key: 'mainMenu'})
    },
    preload: function() {
        this.load.image('splashscreen','assets/placeholder-main-menu.png')
    },
    create: function() {
        this.add.image(400,300,'splashscreen')

        //clicking starts the game
        this.input.once('pointerdown', function () {

            console.log('From SceneA to SceneB');

            this.scene.start('playerHouse');

        }, this);
    }
})