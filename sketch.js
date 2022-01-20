var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostjump;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostjump = loadImage("ghost-jumping.png");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300);  
  ghost.addImage("parado",ghostImg);
  ghost.addImage("pulando", ghostjump);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  createDoor();

  if(tower.y > 600){
      tower.y = 0;
    }

  ghost.velocityY = ghost.velocityY = 3;

  if(keyDown("space")){
    ghost.velocityY = -2;
    ghost.changeImage("pulando", ghostjump);
    
  }
  else {
    ghost.changeImage("parado", ghostImg);
  }


  if(keyDown("D")){
    ghost.velocityX = 5;
  }
  else {
    ghost.velocityX = 0;
    
  }
  if(keyDown("A")){
    ghost.velocityX = -5;
  }

  doorsGroup.depth = ghost.depth;
  ghost.depth = ghost.depth +1;

  ghost.collide(invisibleBlockGroup);

  drawSprites();
}

function createDoor() {
if (frameCount % 240 === 0) {
  door = createSprite(200, -50);
  door.addImage("door", doorImg);
  door.x = Math.round(random(120, 500));
  door.velocityY = 1;
  door.lifetime = 800;
  doorsGroup.add(door);

  climber = createSprite(200, 10);
  climber.addImage("climber", climberImg);
  climber.velocityY = 1;
  climber.lifetime = 800;
  climbersGroup.add(climber);
  climber.x = door.x;

  invisibleBlock = createSprite(200, 15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.velocityY = 1;
  invisibleBlock.lifetime = 800;
  invisibleBlock.scale = 0.5;
  invisibleBlock.visible = false;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.x = door.x;
 }
}
