class Hp {
    constructor(scene, x, y) {
        this.hbar = new Phaser.GameObjects.Graphics(scene);  
        this.x = x;
        this.y = y;
        this.value = 100;
        this.pval = 0.8;
        this.draw();
        this.healthbar=scene.add.existing(this.hbar);

    }  
 
    decrease (atkhp){
        this.value -= atkhp;
        if(this.value <0){
            this.value = 0;
        }
        this.draw();
    }

    increase(addhp){
        this.value += addhp;
        if(this.value >= 100){
            this.value = 100;
        }
        this.draw();
    }

    // Get Function that returns the current hp
    getHP() {
        return this.value;
    }

    draw(){
        this.hbar.clear();
        this.hbar.fillStyle(0x000000);
        this.hbar.fillRect(this.x, this.y, 200,10);
        this.hbar.fillStyle(0xffffff);
        this.hbar.fillRect(this.x+2, this.y+2, 180, 10);
        var d = Math.floor(this.pval* this.value);
        this.hbar.fillRect(this.x+2, this.y+2,d,10);
    }
}