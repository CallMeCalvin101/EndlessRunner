/*  Button Prefab Used in order to handle the minigame
 *  Author: Vincent Kurniadjaja
 *
 */

class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        // Variables to track button behavior
        this.isClickable = false;
        this.refreshTime = 100;
    }

    update() {
        // Decrements Internal Timer
        if (this.isClickable == false && this.refreshTime > 0) {
            this.refreshTime -= 1;
        }

        // Sets button to 'on' when timer hits 0
        if (this.refreshTime <= 0) {
            this.isClickable = true;
        }

        // If mouse click is in button and button is on, set button to off resets timer to a random time
        if (gamePointer.x < this.x + this.width && gamePointer.x > this.x &&
            gamePointer.y < this.y + this.height && gamePointer.y > this.y &&
            (gamePointer.isDown || gamePointer.wasTouched) && this.isClickable == true) {
                this.isClickable = false;
                this.refreshTime = (Math.floor(Math.random() * 5) + 1) * 100;
        }

        // Toggles Button Images
        if (this.isClickable == true) {
            this.setFrame(1);
        } else {
            this.setFrame(0);
        }
    }


    reset() {
        this.isClickable = false;
        this.refreshTime = 60;
    }
}