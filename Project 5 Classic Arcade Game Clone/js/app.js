var score = 0;
var difficulty = 0;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

//Define the Avatar of all items and characters
var Avatar = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};
// Draw the avatar on the screen
Avatar.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    sprite = sprite || 'images/enemy-bug.png';
    Avatar.call(this, x, y, sprite);
    this.speed = getRandomInt(100, 200);
};
Enemy.prototype = Object.create(Avatar.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.body = {
    'x': TILE_WIDTH,
    'y': TILE_HEIGHT
};
Enemy.prototype.restart = function() {
    //The position new bugs appear
    this.x = -this.body.x / 2;
    var startY = [60, 145, 230];
    this.y = selectRandomItem(startY);
    //Speed increase with difficulty
    this.speed = getRandomInt(100, 200) + difficulty * 25;
};
// Update the enemy's position
Enemy.prototype.update = function(dt) {
    if (this.x <= canvas.width + this.body.x / 2) {
        this.x += dt * (this.speed);
    } else {
        this.restart();
    }
    if (player.detectCollision(this)) {
        // If the bug hits player, do follow
        player.reset();
        score = 0;
        difficulty = 0;
        $('#score').text(score);
    }
};

// The player we control
var Player = function(x, y, sprite) {
    sprite = sprite || 'images/char-boy.png';
    x = x || 200;
    y = y || 400;
    Avatar.call(this, x, y, sprite);
};
Player.prototype = Object.create(Avatar.prototype);
Player.prototype.constructor = Player;
Player.prototype.body = {
    'x': TILE_WIDTH,
    'y': TILE_HEIGHT
};
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};
//Read the input and move
Player.prototype.update = function() {
    var xStep = TILE_WIDTH;
    var yStep = TILE_HEIGHT;
    switch (this.action) {
        case 'up':
            if (this.y > canvas.boundaries.up) {
                this.y -= yStep;
            }
            break;
        case 'right':
            if (this.x < canvas.boundaries.right) {
                this.x += xStep;
            }
            break;
        case 'down':
            if (this.y < canvas.boundaries.down) {
                this.y += yStep;
            }
            break;
        case 'left':
            if (this.x > canvas.boundaries.left) {
                this.x -= xStep;
            }
            break;
    }
    this.action = null;
};
Player.prototype.handleInput = function(e) {
    this.action = e;
};
//Detect whether collision happens between player and some item
Player.prototype.detectCollision = function(item) {
    return (this.x < item.x + item.body.x/2 &&
            this.x > item.x - player.body.x/2 &&
            this.y < item.y + item.body.y/2 &&
            this.y > item.y - player.body.y/2);
};


//The star stand for our goal
var Star = function(x, y, sprite) {
    sprite = sprite || 'images/Star.png';
    x = x || 200;
    y = y || 70;
    Avatar.call(this, x, y, sprite);
};
Star.prototype = Object.create(Avatar.prototype);
Star.prototype.constructor = Star;
Star.prototype.body = {
    'x': TILE_WIDTH,
    'y': TILE_HEIGHT
};
Star.prototype.refresh = function() {
    startX = [0, 100, 200, 300, 400];
    this.x = selectRandomItem(startX);
};
Star.prototype.update = function() {
    //Once we reach the star, we get one point and its
    //position changes
    if (player.detectCollision(this)) {
        this.refresh();
        score += 1;
        $('#score').text(score);
        player.reset();
        //Every time you get 3 scores, the difficulty increase
        difficulty = Math.floor(score/3);
    }
};


// Instantiate all objects.
var allEnemies = [
    new Enemy(-100, 60),
    new Enemy(-100, 145),
    new Enemy(-100, 230)
];
var player = new Player();
var star = new Star();


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
