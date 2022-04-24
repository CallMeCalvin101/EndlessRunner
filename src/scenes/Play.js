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
        this.load.spritesheet('miku', './assets/player.png', {frameWidth: 60, frameHeight: 75, startFrame: 0, endFrame: 2});       
        this.load.spritesheet('bugsprite', './assets/bugsprite.png', {frameWidth: 64, frameHeight: 50, startFrame: 0, endFrame: 3});
        this.load.spritesheet('hurtbug', './assets/hurtbug.png', {frameWidth: 64, frameHeight: 50, startFrame: 0, endFrame: 3});


    }

    create() {
        // a vector to track player's position
        this.ptr = new Phaser.Math.Vector2();
        //variables/settings for physics engine
        this.ACCELERATION = 2000;
        this.MAX_X_VEL = 500; 
        this.MAX_Y_VEL = 500;
        this.DRAG = 4000;   

        //CREATE bug/obstacle/ghost ANIMATIONS
        this.anims.create({
            key: 'bugsprite',            
            frames: this.anims.generateFrameNumbers('bugsprite', {start: 0, end: 1, first: 0}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'hurtbug',            
            frames: this.anims.generateFrameNumbers('hurtbug', {start: 0, end: 1, first: 0}),
            frameRate: 50,
            repeat: 0
        });

        this.time.delayedCall(2500, () => { 
            console.log("time"); 
        });
            
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
            frames: this.anims.generateFrameNumbers('miku', {start: 0, end: 2, first: 0}),
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
            if(gamePointer.y<=2*game.config.height/3){
            this.ptr.x=gamePointer.x;
            this.ptr.y=gamePointer.y;
            this.player.play('a1');
            this.physics.moveToObject(this.player, gamePointer, 400); } //player speed, can always change         
            //////////////////////////////////////////////////////
            //I need to add more logic here to keep the player stay in the top half
        },this)
        // Add a new hp bar deatures: Hp.increase(var) Hp.decrease(var);
        this.hp= new Hp(this,game.config.width / 3, game.config.height/2+120);

        this.obstacleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        })

        this.obstacle01 = this.physics.add.sprite(400, 100, 'bugsprite');  //create obstacle sprite
        this.obstacle01.body.collideWorldBounds = true; 
        this.obstacle01.play("bugsprite"); //start wiggle animation

        this.obstacleGroup.add(this.obstacle01);

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



        if(this.obstacle01.body.blocked.left)       
        //if obstacle hits left side of screen, reset it, play standard animation (instead of being broken animation if player has collided with obstacle)
        {
            // console.log("blocked on left") //for debugging
           this.obstacle01.x = 1000;
           this.obstacle01.body.collideWorldBounds = true; 
           this.obstacle01.play("bugsprite");
        }

        this.obstacle01.x -= 2.5;     //obstacles are constantly moving

        this.physics.add.overlap(this.player, this.obstacleGroup, obstacleHit, null, this); 
        //polling to see if player has collided with any obstacle in obstacleGroup. If so , run obstacleHit Function
        function obstacleHit (player, obstacle) //function that runs when player hits obstacle during polling
        {
            if(!(obstacle.anims.getName() == "hurtbug")){  
                //if statement added since obstacleHit is called in all the different frames where player and obstacle are overlapping
                //if statement allows code below to only happen once (the first time collision happens between player and member of obstacleGroup)
                console.log("collide"); //debugging console log
                obstacle.play("hurtbug"); // obstacle animation plays that shows it got hit by player (breaks/gets damaged)
                //insert code to decrease player health + health bar
                //insert code to play animation for character to make it appear hurt (can also just be changing the tint of the sprite.)
            }
        }


      
    }
   
}