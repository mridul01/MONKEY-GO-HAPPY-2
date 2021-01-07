var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var  obstacleGroup , bananaGroup;
var survivalTime,score;
var ground,groundImage;
var inivisibleGround;
var PLAY =1;
var END ;
var gameState = PLAY;
var jumpSound,checkPointSound,dieSound;
var gameOver,gameOverImg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
    
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("jungle.jpg");
  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  gameOverImg = loadImage("gameOver.png");
  restartImg  = loadImage("Restart-Transparent-Background-PNG.png");
}

function setup() {
  createCanvas(500,470);

  obstacleGroup = new Group();   
  bananaGroup = new Group();
  
         ground = createSprite(0,200,500,15);
         ground.addImage(groundImage);
         ground.x = ground.width /2;
         ground.velocityX = -3;
  
      invisibleGround = createSprite(250,442,500,10);
      invisibleGround.visible = false;
  
    monkey = createSprite(100,400,20,20);
    monkey.addAnimation("running",monkey_running);
    monkey.scale = 0.13;
  
   gameOver = createSprite(250,210,100,100);
   gameOver.addImage(gameOverImg);
  gameOver.scale = 0.6;
  
  gameOver.visible = false ; 
  
 survivalTime = 0;
  score = 0;
  
}


function draw() {
      
  if(monkey.isTouching(bananaGroup)){
    switch(score){
      case 10: monkey.scale = 0.15;
        break;
        case 20 : monkey.scale = 0.17;
        break;
        case 30 : monkey.scale = 0.19;
        break;
        case 40 : monkey.scale = 0.2;
        break;
         default : break ;
    }
  }

    if(gameState===PLAY){
      
               if (ground.x < 0) {
                 ground.x = ground.width /2;
                 }

               if (invisibleGround.x > 0) {
                 invisibleGround.x = invisibleGround.width /2;
                 }

            if(keyDown("space")&& monkey.y >=50){
              monkey.velocityY = -15;
              jumpSound.play();
            }
            monkey.velocityY = monkey.velocityY + 0.6;

            monkey.collide(invisibleGround);

               spawnObstacle();
              spawnBanana();

            if(bananaGroup.isTouching(monkey)){
              bananaGroup.destroyEach();
              checkPointSound.play();
              score = score+2;
            }
      
           
        survivalTime=Math.ceil(frameCount/frameRate());
       invisibleGround.velocityX = -(10 +score/10);

      
        if(obstacleGroup.isTouching(monkey)){
          gameState = END;
          dieSound.play();
          monkey.destroy();
          obstacleGroup.destroyEach();
          bananaGroup.destroyEach();
          
          gameOver.visible = true;
        }
      
    }
  
 else if(gameState===END){
   
       
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
        
    }

  drawSprites();
  
  textSize(20);
        fill("black");
        text("SURVIVAL TIME:" + survivalTime,30,30);
  
      textSize(20);
        fill("black");
        text("SCORE:" + score,360,30);
}

function spawnObstacle(){
  if(frameCount%140===0){
    var obstacle = createSprite(430,400,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
  obstacleGroup.velocityX = -(10+ score/10);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
  obstacleGroup.depth = monkey.depth;
  monkey.depth = monkey.depth+1;

}

function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,Math.round(random(120,230)),5,8);
    banana.addImage(bananaImage);
    banana.scale = 0.12;
  banana.velocityX = -3;
     bananaGroup.velocityX = -(10+ score/10);

    
    bananaGroup.add(banana);
  }
}