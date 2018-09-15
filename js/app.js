// variables of game
let player,
    allEnemies = [],
    lost = false;


// Enemies our player must avoid
// class represent enemies
class Enemy {
  //constructor of class enemy
  constructor() {
    this.sprite = 'images/enemy-bug.png';
	  this.x = 0;
	   // set initial y to 3 so that they will be in pave road and not grasses.
	  this.y = 50;
	  this.speed = Math.floor(Math.random() * 250 + 50);
  }
  //update the enemies
  update(dt,  x, y) {
    this.x = this.x + (dt * this.speed);
    if ( this.x > 500 ){
      this.x = 0;
      this.speed = Math.floor(Math.random() * 200 + 100);
    };
  }
  //rende of enemies
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

// class represent of player
class Player {
  // constructor of player
  constructor() {
    this.level = 1
    this.character = "Boy";
    this.sprite = "images/char-boy.png";
  	this.x = 200;
  	this.y = 400;
  	this.lives = 4;
    this.score = 0;
  	this.livesImage = "images/Heart.png";
  }
  // update player
  update(){
    this.checkCollisions();
  }
  // check collision where the player lost lives
  checkCollisions() {
      for ( var index=0; index < allEnemies.length; index++) {
        if ( allEnemies[index].x < player.x + 50 && allEnemies[index].x > player.x - 50 ){
          if ( allEnemies[index].y < player.y + 45 && allEnemies[index].y > player.y - 45 ){
            player.x = 200;
            player.y = 400;
            player.lives--;
            if( player.lives === 0 ){
              player.score = 0;
              lost = true;
            }
          };
        };
      }
  }

  // method render to show differents information of the game
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "14pt Arial";
    ctx.fillText("Score: "+this.score, 35, 560);
    ctx.strokeText("Score: "+this.score, 35, 560);
    ctx.fillText("Level: "+this.level, 35, 80);
    ctx.strokeText("Level: "+this.level, 35, 80);
    ctx.fillText("Character: "+this.character, 250, 80);
    ctx.strokeText("Character: "+this.character, 250, 80);
    for( var i = 0; i < this.lives; i++ ) {
  		ctx.drawImage(Resources.get(this.livesImage), i*40+340, 540, 40, 45 );
    }
  }
  // up level 2 and change the character Cat Girl
  changeCatGirl(){
      player.level = 2;
      player.character = "Cat Girl";
      player.sprite = "images/char-cat-girl.png";
  }
  // up level 3 and change the character Horn Girl
  changeHornGirl(){
      player.level = 3;
      player.character = "Horn Girl";
      player.sprite = "images/char-horn-girl.png";
  }
  // up level 4 and change the character Pink Girl
  changePinkGirl(){
      player.level = 4;
      player.character = "Pink Girl";
      player.sprite = "images/char-pink-girl.png";
  }
  // up level 5 and change the character Princess Girl
  changePrincessGirl(){
      player.level = 5;
      player.character = "Pricess Girl";
      player.sprite = "images/char-princess-girl.png";
  }
  //logic when the character move to different directions
  handleInput(key){
    if ( key == 'left' ){
  		this.x = this.x - 100;
  		if ( this.x < 0 ){
  			this.x = 0;
  		};
  	};
  	if ( key == 'right' ){
  		this.x = this.x + 100;
  		if ( this.x > 400 ){
  			this.x = 400;
  		};
  	};
  	if ( key == 'up' ){
  		this.y = this.y - 90;
  		if ( this.y < 0 ){
  			this.y = 400;
  			this.x = 200;
        this.score+=1000;
  		};
      if (this.score == 10000){
          this.changeCatGirl();
      } else if(this.score == 20000){
          this.changeHornGirl();
      } else if (this.score == 30000){
          this.changePinkGirl();
      } else if (this.score == 40000){
          this.changePrincessGirl();
      }
  	};
  	if ( key == 'down' ){
  		this.y = this.y + 90;
  		if ( this.y > 400 ){
  			this.y = 400;
  		};
  	};
  }

}
// create player
player = new Player();
// Place all enemy objects in an array called allEnemies
for ( var i=0; i < 3; i++ ){
	allEnemies.push(new Enemy());
	allEnemies[i].y = i * 90 + 50;
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
