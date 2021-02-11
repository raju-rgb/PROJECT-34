var dog, dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup(){
    createCanvas(500,500);
    database= firebase.database();

    dog = createSprite(250,350,50,50);
    dog.addImage(dogImg);
    dog.scale=0.2;

    foodStock =  database.ref('Food');
    foodStock.on("value", readStock);
    //foodStock.set(20);
}

function draw(){
    background(46, 139, 87);

    if(keyWentDown(LEFT_ARROW)){
        foodStock = foodStock - 1
        WriteStock(foodS);
        dog.addImage(happyDog); 
    }

    if(keyWentUp(LEFT_ARROW)){
        //foodStock = foodStock - 0
        dog.addImage(dogImg);
    }

    if(foodS === 0){
        foodS = 10
    }

    drawSprites();
    textSize(20);
    fill("black");
    text("FOOD REMAINING : "+ foodS,150, 150);
    text("PRESS UP ARROW TO FEED THE DOG!" ,50 , 50 )
    
}

function WriteStock(x){
    if(x<=0){
        x=0
    }
    else{
        x=x-1;
    }
    database.ref('/').update({
        Food:x
    })
}
function readStock(data){
    foodS = data.val();
    
}


