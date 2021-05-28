//creating sprites
var gameState = "none";
var gameSta = "serve";
var comScore = 0;
var plaScore = 0;
var pla1Score = 0;
var pla2Score = 0;
var striker,goal1,goal2,Mallet1,Mallet2,edges;
function setup(){
  goal1 = createSprite(200, 10, 100, 20);
  goal1.shapeColor = "yellow";
  goal2 = createSprite(200, 390, 100, 20);
  goal2.shapeColor = "yellow";
  Mallet1 = createSprite(200, 50, 50, 10);
  Mallet1.shapeColor = "black";
  Mallet2 = createSprite(200, 350, 50, 10);
  Mallet2.shapeColor = "black";
  striker = createSprite(200, 200, 10, 10);
  striker.shapeColor = "white";
  edges = new Group();
  up_edge = createSprite(width/2,0,width,10);
  // up_edge.visible = false;
  edges.add(up_edge);
  right_edge = createSprite(width,height/2,10,height);
  // right_edge.visible = false;
  edges.add(right_edge);
  bottom_edge = createSprite(width/2,height,width,10);
  // bottom_edge.visible = false;
  edges.add(bottom_edge);
  left_edge = createSprite(0,height/2,10,height);
  // left_edge.visible = false;
  edges.add(left_edge);
}
function draw() {
  //the state of game in which we have to select modes 
  if (gameState === "none") {
    background("white");
  text("Press 1 to play with Computer", 140, 180);
  text("Press 2 to play between 2 players", 135, 200);
  //if 1 is pressed player can play with AI
    if (keyDown("1")) {
      gameState = "1"
    }
  //if 2 is pressed 2 players can play
    if (keyDown("2")) {
      gameState = "2" ;
    }
  }
  if(gameState === "1") {
    background("green");
    fill("white");
    stroke("white");
    rect(0, 5, 400, 5);
    rect(0, 390, 400, 5);
    rect(5, 0, 5, 400);
    rect(390, 0, 5, 400);
    rect(0, 100, 400, 5);
    rect(0, 300, 400, 5);
    drawSprites();
    //press space to start the game
    if (gameSta === "serve") {
      text("Press Space to Strike",150,180);
      text("Press S to change mode", 130, 230);
      if (keyDown("s")) {
        gameState = "none";
        gameSta = "serve"
        comScore = 0;
        plaScore = 0;
      }
    }
    text(comScore,20, 180);
    text(plaScore,20, 230);
    if (gameSta === "play") {
      //press up arrow key to move Mallet2 upwards
      if(keyDown("up")) {
        if(Mallet2.y>210) {
          Mallet2.y = Mallet2.y - 10; 
        }
      }
      //press left arrow key to move Mallet2 leftwards 
      if(keyDown("left")) {
        Mallet2.x = Mallet2.x - 10; 
      }
      //press down arrow key to move Mallet2 downwards 
      if(keyDown("down")) {
        if(Mallet2.y>25) {
          Mallet2.y = Mallet2.y + 10;
        }
      }
      //press right arrow key to move Mallet2 rightwards 
      if(keyDown("right")) {
        Mallet2.x = Mallet2.x + 10  
      }
    }
    //computer AI
    Mallet1.x = striker.x;
    //dotted line
    for (var i = 0; i < 400; i=i+20) {
      line(i, 200, i+10, 200);
    }
    //objects bouncing
    striker.bounceoff(edges);
    striker.bounceoff(Mallet1);
    striker.bounceoff(Mallet2);
    Mallet2.bounceoff(edges);
    //Its starting moving
    if (keyDown("space") && gameSta === "serve") {
      serve();
      gameSta = "play";
    }
    //Its increase points
    if(striker.isTouching(goal1) || striker.isTouching(goal2)) {
      if(striker.isTouching(goal2)) {
        comScore += 1;
      }
      if (striker.isTouching(goal1)) {
        plaScore += 1;
      }
      reset();
      gameSta = "serve";
    }
    //After 10 points game ends
    if(comScore=== 5 || plaScore=== 5) {
      gameSta = "gameover";
      text("GAME OVER", 160, 170);
      text("Press R to restart", 150, 190);
      text("Press S to change mode", 130, 230);
    }
    //game restarts by pressing r
    if (keyDown("r") && gameSta === "gameover") {
      gameSta = "serve";
      comScore = 0;
      plaScore = 0;
    }
    //game shows option to change mode by pressing s
    if (keyDown("s") && gameSta === "gameover") {
      gameState = "none";
      gameSta = "serve"
      comScore = 0;
      plaScore = 0;
    }
    
  }
  if (gameState === "2") {
    background("red");
    fill("white");
    stroke("white");
    rect(10, 0, 5, 400);
    rect(390, 0, 5, 400);
    rect(0, 5, 400, 5);
    rect(0, 390, 400, 5);
    rect(0, 100, 400, 5);
    rect(0, 300, 400, 5);
    drawSprites();
    //press space to start the game
    if (gameSta === "serve") {
      text("Press Space to Strike",150,180);
      text("Press S to change mode", 130, 230);
      if (keyDown("s")) {
        gameState = "none";
        gameSta = "serve"
        pla1Score = 0;
        pla2Score = 0;
      }
    }
    text(pla1Score,20, 180);
    text(pla2Score,20, 230);
    textSize(15);
    text("Player1", 65, 25);
    text("Player2", 65, 375);
    if (gameSta === "play") {
      //press up arrow key to move Mallet2 upwards
      if(keyDown("up")) {
        if(Mallet2.y>210) {
          Mallet2.y = Mallet2.y - 10; 
        }
      }
      //press left arrow key to move Mallet2 leftwards
      if(keyDown("left")) {
        Mallet2.x = Mallet2.x - 10; 
      }
      //press down arrow key to move Mallet2 downwards
      if(keyDown("down")) {
        if(Mallet2.y>25) {
          Mallet2.y = Mallet2.y + 10;
        }
      }
      //press right arrow key to move Mallet2 rightwards
      if(keyDown("right")) {
        Mallet2.x = Mallet2.x + 10  
      }
      //press w to move Mallet1 upwards
      if(keyDown("w")) {
        if(Mallet1.y<375) {
          Mallet1.y = Mallet1.y - 10; 
        }
      }
      //press d to move Mallet1 leftwards
      if(keyDown("d")) {
        Mallet1.x = Mallet1.x + 10; 
      }
      //press s to move Mallet1 downwards
      if(keyDown("s")) {
        if(Mallet1.y<190) {
          Mallet1.y = Mallet1.y + 10;
        }
      }
      //press a to move Mallet1 rightwards
      if(keyDown("a")) {
        Mallet1.x = Mallet1.x - 10  
      }       
    }
    //dotted line
    for (var i = 0; i < 400; i=i+20) {
      line(i, 200, i+10, 200);
    }
    //objects bouncing
    striker.bounceOff(edges);
    striker.bounceOff(Mallet1);
    striker.bounceOff(Mallet2);
    Mallet2.bounce(edges);
    Mallet1.bounce(edges)
    //Its starting moving
    if (keyDown("space") && gameSta === "serve") {
      serve();
      gameSta = "play";
    }
    //Its increase points
    if(striker.isTouching(goal1) || striker.isTouching(goal2)) {
      if(striker.isTouching(goal2)) {
        pla1Score += 1;
      }
      if (striker.isTouching(goal1)) {
        pla2Score += 1;
      }
      reset();
      gameSta = "serve";
    }
    //After 5 points game ends
    if(pla1Score === 5 || pla2Score === 5) {
      gameSta = "gameover";
      if (pla1Score === 5) {
        text("Player1 Wins", 160, 170);
      }
      if (pla2Score === 5) {
        text("Player2 Wins", 160, 170);
      }
      text("Press R to restart", 150, 190);
      text("Press S to change mode", 130, 230);
    }
    //game restarts by pressing r
    if (keyDown("r") && gameSta === "gameover") {
      gameSta = "serve";
      pla1Score = 0;
      pla2Score = 0;
    }
    //game shows option to change mode by pressing s
    if (keyDown("s") && gameSta === "gameover") {
      gameState = "none";
      gameSta = "serve"
      pla1Score = 0;
      pla2Score = 0;
    }
  }
  
}
//function to run the ball
function serve() {
  striker.velocityX = 7;
  striker.velocityY = 8;
}

//funnction to reset when game is over
function reset() {
  striker.x = 200;
  striker.y = 200;
  striker.velocityX = 0;
  striker.velocityY = 0;
}
function createEdgeSprites()
{

}
