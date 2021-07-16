const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit;
var blink;
var sad;
var eat;

function preload() {

  bg_img = loadImage("background.png");
  melon_img = loadImage("melon.png");
  rabbit_img = loadImage("Rabbit-01.png");
  blink= loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat= loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad= loadAnimation("sad_1.png","sad_2.png","sad_3.png");
 
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping= false;
 
}


function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  bunny = createSprite(250,600,100,100)
  //bunny.addImage(rabbit_img)
  bunny.addAnimation("blinking",blink);
 
  bunny.addAnimation("eating",eat);

  bunny.addAnimation("crying",sad);
  
  bunny.scale =0.2;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30})

  fruit = Bodies.circle(240,300,20)
  //World.add(world,fruit);
  Matter.Composite.add(rope.body,fruit)
  fruit_con= new Link(rope,fruit)

  button = createImg('cut_btn.png')
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(drop)

  
  eat.frameDelay=60;
  sad.frameDelay=60;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  ground.show();
  rope.show();
 // ellipse(fruit.position.x,fruit.position.y,20,20);
 imageMode(CENTER);
 if(fruit!=null){
  image(melon_img,fruit.position.x,fruit.position.y,70,70)
 }
 
  Engine.update(engine);
  if(collide(fruit,bunny) == true){
    bunny.changeAnimation("eating",eat);

  }
  if(collide(fruit,ground.body)){
     bunny.changeAnimation("crying",sad);

  }
blink.frameDelay=60;
 
   drawSprites();
}
function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con= null;
}
function collide(body,sprite) {
  if(body !=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80) {
      World.remove(world,fruit);
      fruit=null;
      return true
    }else{
      return false
    }
  }
  
}
