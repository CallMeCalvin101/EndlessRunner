class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //place back ground 
        this.load.image('magicworld', './assets/magicworld.png');
        // Test Assets
        this.load.spritesheet('button', './assets/button.png', {frameWidth: 48, frameHeight: 24, startFrame: 0, endFrame: 1});
    }

    create() {
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
    }

    update() {
        

        this.testButton1.update();
        this.testButton2.update();
        this.testButton3.update();
        this.testButton4.update();
        this.testButton5.update();
        this.testButton6.update();
        this.testButton7.update();
        this.testButton8.update();
        this.testButton9.update();
    }
}