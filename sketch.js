var tower,towerImg;
var door,doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var gameState="play";

function preload(){
  towerImg= loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200);
  ghost.addImage("ghost", ghostImg);
  ghost.scale=0.3;
  
  doorGroup= new Group();
  climberGroup = new Group();
}

function draw(){
  background("black");
  
  if (gameState==="play"){
      if (tower.y>400){
   tower.y=300;
  }
    if (keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+3;
  }
  
  if (keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5;
  } 
   if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
    
  if (ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
    
  spawnDoor();
  drawSprites();
}
  
  if (gameState==="end"){
    stroke("black");
    fill("red");
    textSize(30);
    text("Game Over",230,250);
  }
  
  
 
  
  
  
}
function spawnDoor(){
  if (frameCount%240===0){
    door=createSprite(200,-50);
    climber=createSprite(200,10);
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    door.velocityY=1;
    climber.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth+=1;        
    door.lifetime=600;
    climber.lifetime=600;
    doorGroup.add(door);
    climberGroup.add(climber);
  }
}