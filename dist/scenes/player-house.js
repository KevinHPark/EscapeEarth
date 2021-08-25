
//Load from api?
const dialogLines = [
    "Welcome to Escape Earth; a game about escaping the terror of a non-sustainable world",
    "You play as a civilian named Tel"
]
const playerHouse = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize: function MainMenuScene (){
        Phaser.Scene.call(this, {key: 'playerHouse'})
    },

    preload: function() {
        this.load.plugin("DialogModalPlugin","./dialog_plugin.js");
        this.load.image('player-house','assets/player-house.png');
    }, 
    create: function () {
        this.sys.install("DialogModalPlugin");
    
        this.add.image(400,300,'player-house');
    
        //TODO: return a promise when I'm done displaying dialog
        this.sys.dialogModal.init({dialogLines: dialogLines});

    }
});

