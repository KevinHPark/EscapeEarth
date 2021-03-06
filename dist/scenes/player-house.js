
//Load from api?
const dialogLines = [
    "You play as a civilian named Tel, try to escape your house first..."
]

class PlayerHouseScene extends Phaser.Scene{
    constructor() {
        super('playerHouse');
        this.dialogDisplayed = false
        this.doorWarned = false
        this.doorUnlocked = false
        this.player = undefined;
        this.inventory = []
    }
    
    preload() {
        this.load.plugin("DialogModalPlugin","./dialog_plugin.js");
        this.load.image('player-house','assets/player-house.png');
        this.load.image('gasMask','assets/gasmask.png');
        this.load.image('garageDoor','assets/SciFi_Door_Pixel.png')
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

        //items that are collectable
        this.levelItems = this.physics.add.staticGroup();
        this.levelItems.create(150,300, 'gasMask')
        this.physics.add.overlap(this.player, this.levelItems, this.collectItem, null, this)
        
        //door to collide with
        this.levelDoor = this.physics.add.staticGroup();
        this.levelDoor.create(650,60, 'garageDoor')
        this.physics.add.overlap(this.player,this.levelDoor, this.doorCollision,null,this )

        //commented out dialog system while its breaking player movement...
        // this.sys.dialogModal.init(
        //     {
        //         dialogLines: dialogLines, 
        //         dialogFinishedCallback: () => this.dialogFinishedCallback()
        //     }
        // )
        for (let index = 0; index < dialogLines.length; index++) {
            alert(dialogLines[index])
            
        }    
    }
    update () {
        let cursors = this.input.keyboard.createCursorKeys();
        
        if(this.doorUnlocked){
            this.scene.start('world');
         
        }

        
        
        if (!this.dialogDisplayed && !this.doorUnlocked){
            //when dialog is closed by cb this.player is undefined
            //https://github.com/hinchley2018/escape-earth/projects/1#card-67822843
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
    }
    collectItem(player, item) {
        item.disableBody(true,true)
        
        this.inventory.push(item)
        alert("Added a WW2 gas mask to your inventory, maybe it helps filter some pollution?")
        console.log("added to inventory", this.inventory)
    }

    doorCollision(player, door){

        console.log("door checking", this.inventory)
        if(this.inventory.length > 0){
            this.doorUnlocked = true;
        }
        else {
            if(this.doorWarned === false){
                alert("You need a gas mask to go outside, because of the toxic fumes")
                this.doorWarned = true;
            }
            
        }

    }
};

