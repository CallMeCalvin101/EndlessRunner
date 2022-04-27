class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.title = this.add.image(0, 0, 'title').setOrigin(0);
        this.title.setScale(0.5);
        this.scene.start('playScene');
    }
}