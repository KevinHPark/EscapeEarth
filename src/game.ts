import 'phaser';

export default class PlayerRoomScene extends Phaser.Scene
{
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    walls: Phaser.Physics.Arcade.StaticGroup;
    constructor()
    {
        super('PlayerRoomScene');
    }

    preload()
    {
        this.load.image('player-house','assets/player-house.png');

        //TODO: load spritesheet for RPG, we can't use this one in a private-source game
        this.load.spritesheet('dude',
            'assets/dude.png',
            {frameWidth: 32, frameHeight: 48}
        );
    }

    create()
    {
        this.add.image(400,300,'player-house');

        //add player sprite with collison
        this.player = this.physics.add.sprite(100,450,'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.addWalls();
        this.physics.add.collider(this.player, this.walls)

        this.addPlayerAnimations();
    }
    
    update()
    {
        let cursors = this.input.keyboard.createCursorKeys();

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
    }

    addWalls() {
        this.walls = this.physics.add.staticGroup();
        //TODO: match walls with image walls, how to handle resizing?
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
}

const gameConfig:Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: PlayerRoomScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    }
    
};

const game = new Phaser.Game(gameConfig);