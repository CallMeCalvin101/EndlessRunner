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
        this.testButtons = this.add.group();
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let testButton = new Button(this, 90 + (60 * i), game.config.height * (2/3) + 20 + (30 * j), 'button').setOrigin(0, 0);
                this.testButtons.add(testButton);
            }
        }

        this.testButtons.runChildUpdate = true;
    }

    update() {
        // no functions yet
    }
}