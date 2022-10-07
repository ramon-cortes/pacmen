var pos = 0;
const pacArray = [
    ['images/PacMan1.png', 'images/PacMan2.png'],
    ['images/PacMan3.png', 'images/PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.round(Math.random() * scale),
        y: Math.round(Math.random() * scale)
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  //open or closed mouth
  let mouthStatus = Math.round(Math.random());
  let face = [0, mouthStatus];
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  //                  direction mouth-status
  //                       ↓        ↓
  newimg.src = pacArray[face[0]][face[1]];
  newimg.width = 100;

  console.log(`${position.x} ${position.y}`);
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';


  // add new Child image to game
  game.appendChild(newimg);
  // return details in an object
  return {
      position,
      velocity,
      face,
      newimg
  }
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)            
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x + 'px';
        item.newimg.style.top = item.position.y + 'px';

        //console.log(pacArray[item.face[0]][item.face[1]]);
        item.newimg.src = pacArray[item.face[0]][item.face[1]];            
    })
    setTimeout(update, 100); //original 20
}

function checkCollisions(item) {
  //open and close mouth
  if (item.face[1] === 0) {
    item.face[1] = 1;
  } else {
    item.face[1] = 0;
  }

  

  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
    //change face direction
    if (item.face[0] === 0) {
      item.face[0] = 1;
    } else {
      item.face[0] = 0;
    }
  }

  //squishy effect right wall
  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth - 100) {
    if (item.face[0] === 0) {
      //getting close to the right wall
      item.newimg.style.width = item.newimg.width - (item.velocity.x / 2.5) + 'px';
    } else {
      //getting away from the right wall
      item.newimg.style.width = item.newimg.width - (item.velocity.x / 2.5) + 'px';
    }        
    item.newimg.style.height = 100;
  } else if (item.position.x + item.velocity.x < 100) {
    if (item.face[0] === 1) {
      //getting close to the left wall
      item.newimg.style.width = item.newimg.width + (item.velocity.x / 2.5) + 'px';
    } else {
      //getting away from the left wall
      item.newimg.style.width = item.newimg.width + (item.velocity.x / 2.5) + 'px';
    }        
    item.newimg.style.height = 100 + 'px';
  } else {
    item.newimg.style.width = 100 + 'px';
    item.newimg.style.height = 100 + 'px';
  }

  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}
