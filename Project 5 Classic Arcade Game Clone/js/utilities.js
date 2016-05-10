function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function selectRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function detectCollision(item, player) {
    return (player.x < item.x + item.body.x/2 &&
            player.x > item.x - player.body.x/2 &&
            player.y < item.y + item.body.y/2 &&
            player.y > item.y - player.body.y/2)
}
