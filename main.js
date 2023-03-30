var mario_img, mario_abajo,mario_espera, mario_saltar;;
var nube1_img,nube2_img;
var plataforma_img, piso;
var posicionesNubes=[];
var listamonedas=[{x:546,y:100},{x:170,y:323},{x:575,y:500},{x:0808,y:900},{x:754,y:100}];
var pipelist=[{x:393,y:700},{x:900,y:700}];
var goomba;
var pipes;
var gangdamstyle;
var lista_bloques=[{x:600,y:462},{x:630,y:462},{x:660,y:462}];



function preload(){
    mario_img=loadAnimation("imgs/mario/mario01.png","imgs/mario/mario02.png","imgs/mario/mario03.png");
    mario_abajo=loadAnimation("imgs/mario/mario18.png");
    mario_espera=loadAnimation("imgs/mario/mario06.png");
    mario_saltar=loadAnimation("imgs/mario/mario05.png");
    marioimg=loadAnimation("imgs/mario/mario01_left.png","imgs/mario/mario02_left.png","imgs/mario/mario03_left.png");
    nube1_img=loadImage("imgs/scene/cloud01.png");
    nube2_img=loadImage("imgs/scene/cloud02.png");
    plataforma_img=loadImage("imgs/scene/platform.png");
    coin_img=loadAnimation("imgs/blocks/coin01.png","imgs/blocks/coin02.png","imgs/blocks/coin03.png","imgs/blocks/coin04.png","imgs/blocks/coin05.png");
    tube_thing=loadImage("imgs/scene/tube.png");
    goomba=loadAnimation("imgs/enemy/enemyMushroom01.png","imgs/enemy/enemyMushroom02.png");
    block_thing=loadImage("imgs/blocks/blocks002.png");
}

function setup(){
    canvas=createCanvas(windowWidth,windowHeight);
    mario= createSprite(10,windowHeight-340,10,10);
    mario.addAnimation("espera",mario_espera);
    mario.addAnimation("abajo",mario_abajo);
    mario.addAnimation("caminando",mario_img);
    mario.addAnimation("saltando",mario_saltar);
    mario.addAnimation("caminando_a_izquierda",marioimg);
    mario.changeAnimation("espera");
    mario.scale=0.6;
    pipes=new Group();
    gangdamstyle=new Group();


    piso=createSprite(10,650,5000,20);
    piso.shapeColor="brown";
    //piso.addImage(plataforma_img);
    for(var i in listamonedas)
    {
       moneda = createSprite(listamonedas[i].x,listamonedas[i].y,40,40);
       moneda.addAnimation("moneda",coin_img);
       moneda.scale=1.8;
    }
    for(var i in pipelist)
    {
       pipe = createSprite(pipelist[i].x,pipelist[i].y,60,80);
       pipe.addImage("pipe",tube_thing);
       pipe.scale=2.4;
       pipes.add(pipe);
    }
    for(var i in lista_bloques)
    {
       bloque = createSprite(lista_bloques[i].x,lista_bloques[i].y,40,40);
       bloque.addImage("bloque",block_thing);
       bloque.scale=1.5;
    }
}

function nubes()
{
    if(frameCount%90===0)
    {
    var r = random(175,300);
    var n = random(1,2); 
    nube=createSprite(windowWidth,r,150,20);
    nube.scale=2.2;
    nube.shapeColor="white";
    if(n===1)
    {
        nube.addImage(nube1_img);
    }
    else
    {
       nube.addImage(nube2_img);
    }
    nube.velocityX=-4;
    nube.lifetime=600;
    }
}
function goombas()
{
    if(frameCount%90===0)
    {
    var r = random(631,640);
    var n = random(1,2); 
    g=createSprite(windowWidth,r,150,20);
    g.scale=2.2;
    g.shapeColor="brown";
    g.addAnimation("goomba",goomba);
    g.velocityX=-2;
    gangdamstyle.add(g);
    }
}
function draw(){
    background("#5caeed");
    mario.changeAnimation("espera");
    if(keyDown("s")){   
        mario.changeAnimation("abajo");
        changePosition(mario,0,2)
    }
    if(keyWentUp("s")){   
        changePosition(mario,0,-2)
    }
    if(keyDown("w")){   
        mario.changeAnimation("saltando");
        changePosition(mario,0,-10)
    }

    if(keyDown("d")){   
        changePosition(mario,5,0);
        mario.changeAnimation("caminando");
    }
    if(keyDown("a")){   
        changePosition(mario,-5,0);
        mario.changeAnimation("caminando_a_izquierda");
    }
    //mario.velocityY=4;
    drawSprites();
    textSize(25);
    fill("red")
    text(mouseX + " - "+ mouseY,mouseX,mouseY);
    mario.collide(piso);
    mario.y=mario.y+6;
    //gravedad
    nubes();
    goombas();

    mario.collide(pipes);

    if(gangdamstyle.isTouching(mario))
    {
        for(var i=0;i<gangdamstyle.length;i++)
        {
           if(gangdamstyle[i].isTouching(mario))
           {
             gangdamstyle[i].destroy();
           }
        }
    }
}


function changePosition(sprite,x,y){
    sprite.x = sprite.x + x;
    sprite.y = sprite.y + y;
}
function posicionObjeto(x,y){

}


