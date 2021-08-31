
//Load from api?
const dialogLines = [
    "Welcome to Escape Earth; a game about escaping the terror of a non-sustainable world",
    "You play as a civilian named Tel"
]

class PlayerHouseScene extends Phaser.Scene{
    constructor() {
        super('playerHouse');
        this.dialogDisplayed = false
        this.doorUnlocked = false
        this.player = undefined;
    }
    
    preload() {
        this.load.plugin("DialogModalPlugin","./dialog_plugin.js");
        this.load.image('player-house','assets/player-house.png');

        //TODO: load spritesheet for RPG, we can't use this one in a private-source game
        this.load.spritesheet('dude',
            'assets/dude.png',
            {frameWidth: 32, frameHeight: 48}
        );
    }
    create() {
        
        this.sys.install("DialogModalPlugin");
    
        this.add.image(400,300,'player-house');
    
        this.player = this.physics.add.sprite(100,450,'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.addPlayerAnimations();
        
        // this.sys.dialogModal.init(
        //     {
        //         dialogLines: dialogLines, 
        //         dialogFinishedCallback: () => this.dialogFinishedCallback()
        //     }
        // )
            
    }
    update () {
        let cursors = this.input.keyboard.createCursorKeys();
        
        if(this.doorUnlocked){
            this.scene.start('world');
        }

        if (!this.dialogDisplayed){
            //debugger
            if (cursors.left.isDown) 
            {
                this.player.setVelocityX(-160);
                this.player.anims.play('left',true);
            }
            else if (cursors.right.isDown)
            {
                this.player.setVelocityX(160);
                this.player.anims.play('right', true);
            }
            else 
            {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
            }

            if (cursors.up.isDown)
            {
                this.player.setVelocityY(-160)
            }
            else if(cursors.down.isDown)
            {
                this.player.setVelocityY(160)
            }
            else {
                this.player.setVelocityY(0)
            }
        }
        
    }
    
    addPlayerAnimations()
    {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ {key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
    }
    dialogFinishedCallback (){
        this.dialogDisplayed = false;
        this.doorUnlocked = true;
    }
    
};

