class MainMenuScene extends Phaser.Scene{
    
    constructor (){
        super('mainMenu')
    }
    preload() {
        this.load.image('splashscreen','assets/placeholder-main-menu.png')
    }
    create() {
        this.add.image(400,300,'splashscreen')

        //clicking starts the game
        this.input.once('pointerdown', function () {

            console.log('From SceneA to SceneB');

            this.scene.start('playerHouse');

        }, this);
    }
}