var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var spookySound;
var gameState = "play";




function preload() {

  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");

  ghostImg = loadAnimation("ghost-standing.png", "ghost-jumping.png");

   spookySound=loadSound("spooky.wav");
  





}


function setup() {

  createCanvas(600, 600);
  spookySound.loop();

  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 3;

  ghost = createSprite(300, 400);
  ghost.addAnimation("jumping", ghostImg);
  ghost.scale = 0.5;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup=new Group();

}

function draw() {
  background(0);

  if(gameState==="play"){


    if (tower.y >= 600) {
      tower.y = 300;
    }
  
    ghost.velocityY = ghost.velocityY + 0.5;
  
    if (keyDown("space")) {
      ghost.velocityY = -10;
    }
  
  
   
  
    ghost.collide(climbersGroup);
  
    if (keyDown(RIGHT_ARROW)) {
  
      ghost.x = ghost.x + 10;
  
    }
  
    if (keyDown(LEFT_ARROW)) {
  
      ghost.x = ghost.x - 10;
    }

    if(ghost.isTouching(invisibleBlockGroup) || ghost.y>600){

      gameState="Over";

    }

    spawnDoor();
    drawSprites();
    
  }

  else if(gameState==="Over"){

    gameOver();

  }


}

function spawnDoor() {

  if (frameCount % 100 === 0) {
    door = createSprite(Math.round(random(100, 450)), -5);
    door.addImage(doorImg);
    door.velocityY = 3;

    doorsGroup.add(door);
    door.lifetime = 200;

    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;


    climber = createSprite(door.x, 50);
    climber.addImage(climberImg);
    climber.velocityY = 3;
    climbersGroup.add(climber);
    climber.lifetime = 200;

    invisibleBlock=createSprite(climber.x,60,100,20);
    invisibleBlock.velocityY=3;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible=false;
    invisibleBlock.lifetime=200;

  }
}

function gameOver(){
  textSize(30);
  fill("rgb(250,0,0)");
  text("Game Over",300,300);

}
