class player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);     
        
        this.moveSpeed = 12; 
        this.isFiring = false;
           
        this.hbar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 0.8;
        this.draw();
        this.healthbar=scene.add.existing(this.hbar);

    }
    update(){
        if(!this.isFiring){
            if(keyUP.isDown && this.x >= borderUISize + this.height){
                this.x -= this.moveSpeed;
            } else if(keyDOWN.isDown && this.x <= game.config.height - borderUISize - this.height){
                this.x+=this.moveSpeed;
            }
        }
       
    } 

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize;
    
    }

    decrease (atkhp){
        this.value -= atkhp;
        if(this.value <0){
            this.value = 0;
        }
        this.draw();
        return (this.value ==0);
    }

    increase(addhp){
        this.value -= atkhp;
        if(this.value <0){
            this.value = 0;
        }
        this.draw();
        return (this.value ==0);
    }
    draw(){
        this.hbar.clear();
        this.hbar.fillStyle(0x000000);
        this.hbar.fillRect(this.x, this.y, 200,10);
        this.hbar.fillStyle(0xffffff);
        this.hbar.fillRect(this.x+2, this.y+2, 80, 10);
        var d = Math.floor(this.p* this.value);
        this.hbar.fillRect(this.x+2, this.y+2,d,10);
    }
}