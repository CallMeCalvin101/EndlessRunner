class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //place back ground 
        this.load.image('magicworld', './assets/magicworld.png');
        // Test Assets
        this.load.spritesheet('button', './assets/button.png', {frameWidth: 48, frameHeight: 24, startFrame: 0, endFrame: 1});
        this.load.spritesheet('miku', './assets/miku.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 3});
    }

    create() {
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
        this.anims.create({
            key: 'a1',            
            frames: this.anims.generateFrameNumbers('miku', {start: 0, end: 3, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.bar = new player(this, 100, 100,'miku',0);
        this.bar.play('a1');
    }

    update() {
        if(this.obstacle01.body.blocked.left)       //if obstacle hits left side of screen, reset it, play standard animation (instead of being broken animation if player has collided with obstacle)
        {
            // console.log("blocked on left") //for debugging
            this.obstacle01.x = 1000;
            this.obstacle01.body.collideWorldBounds = true; 
            this.obstacle01.play("bugsprite");
        }

        this.obstacle01.x -= 5;     //obstacles are constantly moving

        //player movement based on arrow keys

        if(cursors.left.isDown) {
            this.character.body.setAccelerationX(-this.ACCELERATION);
            this.character.setFlip(true, false);
            // see: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Animation.html#play__anchor
            // play(key [, ignoreIfPlaying] [, startFrame])
            // add this.character.anims.play('key for walking animation', true);

        } else if(cursors.right.isDown) {
            this.character.body.setAccelerationX(this.ACCELERATION);
            this.character.resetFlip();
            // add this.character.anims.play('key for walking animation', true);
        
        } else if(cursors.up.isDown) {
            this.character.body.setAccelerationY(-this.ACCELERATION);
            this.character.resetFlip();
            // add this.character.anims.play('key for walking animation', true);

        } else if(cursors.down.isDown) {
            this.character.body.setAccelerationY(this.ACCELERATION);
            this.character.resetFlip();
            // add this.character.anims.play('key for walking animation', true);
        }
        
        else {
            // set acceleration to 0 so DRAG will take over
            this.character.body.setAccelerationX(0);
            this.character.body.setAccelerationY(0);
            this.character.body.setDragX(this.DRAG);
            this.character.body.setDragY(this.DRAG);
        }

       

    }
}