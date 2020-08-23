const segmentSize = 20 // Make sure divisible by game width/height to avoid wonky things
const gameWidth = 600
const gameHeight = 400
const speed = 1
const initialLength = 5
let pos;
let velocity;
let trail;
let length;

let applePos;

const easy = 7
const medium = 15
const hard = 30

let scoreDom;
let score;
let highScore;

function setup() {
    createCanvas(gameWidth, gameHeight);
    frameRate(medium)
    pos = createVector(gameWidth / 2, gameHeight / 2)
    velocity = createVector(speed, 0)
    trail = []
    length = initialLength

    applePos = createVector(0, 0)
    updateApplePos()

    scoreDom = document.getElementById('score')
    highScore = 0
    scoreDom.innerText = 'Score: ' + (length - initialLength) + ' High Score: ' + highScore

    for (i = 0; i < length; i++) {
        trail[i] = createVector(pos.x, pos.y)
    }
}

function draw() {
    background(40);
    
    // Draw apple
    fill('#ff0000');
    square(applePos.x, applePos.y, segmentSize)
    
    // Draw snake
    fill('#03fc28');
    
    pos.x += velocity.x * segmentSize
    pos.y += velocity.y * segmentSize

    // Did we collide with the edge?
    // FIXME: Should stop drawing old snake? Or something, causes flickering atm
    if (pos.x >= gameWidth || pos.x < 0 || pos.y >= gameHeight || pos.y < 0) {
        length = initialLength
        pos.x = gameWidth / 2
        pos.y = gameHeight / 2

        // trail = []
        // length = initialLength
        // trail.push(createVector(pos.x, pos.y))
    }
    
    // Draw trail
    for (i = 0; i < length; i++) {
        // Did we collide with our trail?
        if (pos.x == trail[i].x && pos.y == trail[i].y) {
            length = initialLength
        }

        square(trail[i].x, trail[i].y, segmentSize);
    }

    // Did we get the apple?
    if (pos.x == applePos.x && pos.y == applePos.y) {
        length++
        highScore = Math.max(highScore, length - initialLength)
        updateApplePos()
    }

    trail.push(createVector(pos.x, pos.y))
    
    // Keep array length in check
    while(trail.length > length) {
        trail.shift()
    }
    scoreDom.innerText = 'Score: ' + (length - initialLength) + ' High Score: ' + highScore
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        velocity.x = -speed
        velocity.y = 0
    } else if (keyCode === RIGHT_ARROW) {
        velocity.x = speed
        velocity.y = 0
    } else if (keyCode === UP_ARROW) {
        velocity.x = 0
        velocity.y = -speed
    } else if (keyCode === DOWN_ARROW) {
        velocity.x = 0
        velocity.y = speed
    }

    if (key === '1') {
        frameRate(easy)
    } else if (key === '2') {
        frameRate(medium)
    } else if (key === '3') {
        frameRate(hard)
    }

    return false;
}

function updateApplePos() {
    const segmentsWide = gameWidth / segmentSize
    const segmentsTall = gameHeight / segmentSize
    applePos.x = segmentSize * Math.floor(segmentsWide *  Math.random())
    applePos.y = segmentSize * Math.floor(segmentsTall *  Math.random())
    console.log(applePos.x)
    console.log(applePos.y)
}
