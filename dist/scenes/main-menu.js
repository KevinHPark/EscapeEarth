class MainMenuScene extends Phaser.Scene{
    
    constructor (){
        super('mainMenu')
    }
    preload() {
        this.load.image('splashscreen','assets/placeholder-main-menu.png')
    }
    create() {
        this.add.image(400,300,'splashscreen')

        alert("Welcome to Escape Earth; a game about escaping the terror of a non-sustainable world!");
        alert("Click the world to start exploring")
        //clicking starts the game
        this.input.once('pointerdown', function () {

            this.scene.start('playerHouse');

        }, this);
    }
}