var bg,bgImg;
var player, hpImg, hp_casting;
var dementer,dementerImg;
var hallows1,hallows2,hallows3;
var hallows1Img,hallows2Img,hallows3Img
var dementerGroup
var spells = 50;
var gameState = "fight"
var spellsImg


function preload(){
  
  hpImg = loadImage("assets/hp.png")
  hp_casting = loadImage("assets/hp_casting.png")

  hallows1Img = loadImage("assets/hallows_1.png")
  hallows2Img = loadImage("assets/hallows_2.png")
  hallows3Img = loadImage("assets/hallows_3.png")

  dementerImg = loadImage("assets/dementer.png")

  bgImg = loadImage("assets/bg.png")
spellsImg = loadImage("assets/spells.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(hpImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)



   hallows1 = createSprite(displayWidth-150,40,20,20)
   hallows1.visible = false
    hallows1.addImage("hallows1",hallows1Img)
    hallows1.scale = 0.4

    hallows2 = createSprite(displayWidth-100,40,20,20)
    hallows2.visible = false
    hallows2.addImage("hallows2",hallows2Img)
    hallows2.scale = 0.4

    hallows3 = createSprite(displayWidth-150,40,20,20)
    hallows3.addImage("hallows3",hallows3Img)
    hallows3.scale = 0.4
   
    dementerGroup = new Group();
    spellsGroup = new Group()
}

function draw() {
  background(0); 

  if(gameState === "fight"){

//moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  spells = createSprite(displayWidth-1150,player.y-30,20,10)
  spells.addImage(spellsImg);
  spells.velocityX = 20
  
  spellsGroup.add(spells)
  player.depth = spells.depth
  player.depth = player.depth+2
  player.addImage(hp_casting)
  spells = spells-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(hpImg)
}

//go to gameState "bullet" when player runs out of bullets
if(spells==0){
  gameState = "spells"
    
}

//destroy the zombie when bullet touches it
if(dementerGroup.isTouching(spellsGroup)){
  for(var i=0;i<dementerGroup.length;i++){     
      
   if(dementerGroup[i].isTouching(spellsGroup)){
        dementerGroup[i].destroy()
        spellsGroup.destroyEach()
       
        } 
  
  }
}

//destroy zombie when player touches it
if(dementerGroup.isTouching(player)){

 for(var i=0;i<dementerGroup.length;i++){     
      
  if(dementerGroup[i].isTouching(player)){
       dementerGroup[i].destroy()
       } 
 
 }
}

//calling the function to spawn zombies
enemy();


drawSprites();

 
}

if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  dementerGroup.destroyEach();
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  dementerGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "spells"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of Spells!!!",470,410)
  dementerGroup.destroyEach();
  player.destroy();
  spellsGroup.destroyEach();

}
}


function enemy(){
  if(frameCount%50===0){

    
    dementer = createSprite(random(500,1100),random(100,500),40,40)

    dementer.addImage(dementerImg)
    dementer.scale = 0.15
    dementer.velocityX = -3
    dementer.debug= true
    dementer.setCollider("rectangle",0,0,400,400)
   
dementer.lifetime = 400
   dementerGroup.add(dementer)
  }

}