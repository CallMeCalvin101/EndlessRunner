class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //place back ground 
        this.load.image('magicworld', './assets/magicworld.png');
        this.load.image ('arrow','./assets/canon.png');
        this.load.image ('still','./assets/camper.png');
        this.load.image('blocker','./assets/bar.png');
        // Test Assets
        this.load.spritesheet('button', './assets/button.png', {frameWidth: 48, frameHeight: 24, startFrame: 0, endFrame: 1});
        this.load.spritesheet('miku', './assets/miku.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 3});
    }

    create() {
        // a vector to track player's position
        this.ptr = new Phaser.Math.Vector2();
        //variables/settings for physics engine
        this.ACCELERATION = 2000;
        this.MAX_X_VEL = 500; 
        this.MAX_Y_VEL = 500;
        this.DRAG = 4000;   

        //CREATE OBSTACLE ANIMATIONS
        this.anims.create({key: 'bugsprite',frames: [{key: 'bugsprite',frame: "bug1.png"},  //bugsprite animation to be replaced by whatever standard obstacle animation is (spirits/ghosts wiggle?)
            {key: 'bugsprite',frame: "bug2.png"}],frameRate: 10,repeat: -1});
        this.anims.create({key: 'hurtbug',frames: [{key: 'hurtbug',frame: "hurtbug1.png"}, //bugend animation to be replaced with obstacle broken/hit by player animation
            {key: 'hurtbug',frame: "hurtbug2.png"}],frameRate: 500,repeat: 0});

            
        //place back ground 
        this.magicworld = this.add.image(200,220,'magicworld');
        // Variable for cursor
        gamePointer = this.input.activePointer;
        
        // Test UI
        this.add.rectangle(0, 2 * game.config.height / 3, game.config.width, game.config.height / 3, 0xFF7254).setOrigin(0, 0);
        
        
        // Test Buttons
        this.testButton1 = new Button(this, game.config.width/2 - 60, game.config.height * (5/6) - 36, 'button').setOrigin(0);
        this.testButton2 = new Button(this, game.config.width/2, game.config.height * (5/6) - 36, 'button').setOrigin(0);
        this.testButton3 = new Button(this, game.config.width/2 + 60, game.config.height * (5/6) - 36, 'button').setOrigin(0);
        this.testButton4 = new Button(this, game.config.width/2 - 60, game.config.height * (5/6), 'button').setOrigin(0);
        this.testButton5 = new Button(this, game.config.width/2, game.config.height * (5/6), 'button').setOrigin(0);
        this.testButton6 = new Button(this, game.config.width/2 + 60, game.config.height * (5/6), 'button').setOrigin(0);
        this.testButton7 = new Button(this, game.config.width/2 - 60, game.config.height * (5/6) + 36, 'button').setOrigin(0);
        this.testButton8 = new Button(this, game.config.width/2, game.config.height * (5/6) + 36, 'button').setOrigin(0);
        this.testButton9 = new Button(this, game.config.width/2 + 60, game.config.height * (5/6) + 36, 'button').setOrigin(0);
        //create player animate
        this.anims.create({
            key: 'a1',            
            frames: this.anims.generateFrameNumbers('miku', {start: 0, end: 3, first: 0}),
            frameRate: 4,
            repeat: -1
        });

        // player
        this.blocker= this.physics.add.image(game.config.width/2,2*game.config.height/3,'blocker');
        this.blocker.setImmovable(true);
        this.player = this.physics.add.sprite(100,100,'miku'); 
        this.player.setCollideWorldBounds(true);  
        this.physics.add.collider(this.player, this.blocker);
        // move player to the clicked/tapped position
        this.input.on('pointerdown', function (gamePointer)
        {
            //this.arrow.setPosition(gamePointer.x, gamePointer.y);
            this.ptr.x=gamePointer.x;
            this.ptr.y=gamePointer.y;
            this.player.play('a1');
            this.physics.moveToObject(this.player, gamePointer, 400);  //player speed, can always change         
            //////////////////////////////////////////////////////
            //I need to add more logic here to keep the player stay in the top half
        },this);
        // Add a new hp bar deatures: Hp.increase(var) Hp.decrease(var);
        this.hp= new Hp(this,game.config.width / 3, game.config.height/2+120);
    }
    update() {
        //////////////////////// PLAYER MOVEMENT ///////////////////////////
        // calculate the distance between player and the clicked/tapped spot
        // line xx~ xx from https://phaser.io/examples/v2/input/follow-mouse
        var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.ptr.x, this.ptr.y);

        if (this.player.body.speed > 0)
        {
        
            if (distance < 4)
            {
            this.player.body.reset(this.ptr.x, this.ptr.y);
            }
        }
        // end of borrowing code
        //////////////////////// PLAYER MOVEMENT ///////////////////////////

        //if(this.obstacle01.body.blocked.left)       //if obstacle hits left side of screen, reset it, play standard animation (instead of being broken animation if player has collided with obstacle)
        //{
            // console.log("blocked on left") //for debugging
        //    this.obstacle01.x = 1000;
        //    this.obstacle01.body.collideWorldBounds = true; 
        //    this.obstacle01.play("bugsprite");
        //}

        //this.obstacle01.x -= 5;     //obstacles are constantly moving

        //player movement based on arrow keys        
    }
   
}