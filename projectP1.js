"use strict";
let ctx;
let carX = 24;
let carY = 31;
let bombX=(randomInteger(1,10) * 50) - 25;
let bombY=(randomInteger(1,10) * 50) - 13;
let thiefX = (randomInteger(1,10) * 50) - 26; 
let thiefY = (randomInteger(1,10) * 50) - 14;
let score = 0;
let weeWooColor;
let onOff = undefined;
let enemyMovement;
let spikeX;
let spikeY;
//setup function
function setup() {
	ctx = document.getElementById("surface").getContext("2d");
    document.getElementById("surface").style.background="lightgreen";
    weeWooColor = setInterval(weeWoo,500);
    enemyMovement = setInterval(randomDirectionBomb,500);
    draw();
    
}
//police car image
function drawPoliceCar(x,y){
    ctx.beginPath();
    
    ctx.save();
    ctx.translate(x,y);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.lineTo(-20, 0);
    ctx.lineTo(20, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-18,-5);
    ctx.lineTo(18,-5);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-15,-10);
    ctx.lineTo(15,-10);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-12,-15);
    ctx.lineTo(12,-15);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(12,0,5,0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(-8,0,5,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(0,-18,5,Math.PI,0);
    ctx.fill();

    ctx.fillStyle = "silver";
    ctx.beginPath();
    ctx.arc(6,-8,7,Math.PI,0);
    ctx.fill();

    ctx.restore();
}

//thief image
function drawThief(x,y){
    ctx.save();
    ctx.translate(x,y+3);

    ctx.beginPath();
    ctx.strokeStyle="orange";
    ctx.lineWidth = 5;
    ctx.lineTo(-10,-3);
    ctx.lineTo(15,-3);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-8,0);
    ctx.lineTo(13,0);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle="green";
    ctx.lineWidth = 5;
    ctx.lineTo(-10,-15);
    ctx.lineTo(15,-15);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-8,-20);
    ctx.lineTo(13,-20);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-5,-23);
    ctx.lineTo(10,-23);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.lineTo(-10,-10);
    ctx.lineTo(15,-10);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.lineTo(-4,-10);
    ctx.lineTo(1,-10);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(5,-10);
    ctx.lineTo(10,-10);
    ctx.stroke();

    ctx.restore();
}

//bomb image
function drawBomb(x,y){
    ctx.save();
    ctx.translate(x,y);
    
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineTo(-6,-1);
    ctx.lineTo(6,-1);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-10,-4);
    ctx.lineTo(10,-4);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-12,-7);
    ctx.lineTo(12,-7);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-13,-9);
    ctx.lineTo(13,-9);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-13,-12);
    ctx.lineTo(13,-12);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.lineTo(-12,-15);
    ctx.lineTo(12,-15);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.lineTo(-10,-18);
    ctx.lineTo(10,-18);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-8,-20);
    ctx.lineTo(8,-20);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(-3,-24);
    ctx.lineTo(3,-24);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.lineTo(-3,-26);
    ctx.lineTo(5,-26);
    ctx.stroke();
    
    ctx.restore();

}

//grid lines, 1 nested loop.
function gridLines(){
    let gridX = 0;
    let gridY = 0;
    ctx.save();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 5;
    for (let i=0; i<5; i++){
        for (let j=0;j<i; j++){
            ctx.beginPath();
            ctx.lineTo(gridX+50, 0);
            ctx.lineTo(gridX+50, 500);
            gridX += 50;
            ctx.stroke()
            ctx.translate(0,0);
            ctx.beginPath();
            ctx.lineTo(0, gridY+50);
            ctx.lineTo(500, gridY+50);
            gridY += 50;
            ctx.stroke();
        }
    }
    ctx.restore();
}
//function that will never make all images on the same spot.
function neverSamePos() {
    if(distanceCalculation(stopX,stopY,bombX,bombY) < 50){
        bombX = (randomInteger(1,10) * 50) - 25;
        bombY = (randomInteger(1,10) * 50) - 13;
    } else if(carX == bombX || carX == bombY){
        bombX = (randomInteger(1,10) * 50) - 25;
        bombY = (randomInteger(1,10) * 50) - 13;
    }
}

//draw function that is called under setup function
function draw(){
    ctx.clearRect(0,0,500,500);
    ctx.save();
    neverSamePos();
    gridLines();
    drawPoliceCar(carX,carY);
    if (distanceCalculation(carX,carY,thiefX,thiefY) < 40){
    score += 1;
    document.getElementById("currentScore").innerHTML = "Score: " + score;
    thiefX = (randomInteger(1,10) * 50) - 27;
    thiefY = (randomInteger(1,10) * 50) - 16;
    }
// calculation if bomb comes to the thief
    if (distanceCalculation(thiefX,thiefY,bombX,bombY) < 40){
        score -= 1;
        document.getElementById("currentScore").innerHTML = "Score: " + score;
        thiefX = (randomInteger(1,10) * 50) - 27;
        thiefY = (randomInteger(1,10) * 50) - 16;
        }

// calculation if bomb come to the spike trap.

if (distanceCalculation(spikeX,spikeY,bombX,bombY) < 30){
    score += 5;
    document.getElementById("currentScore").innerHTML = "Score: " + score;
    spikeX = undefined;
    spikeY = undefined;
    bombX = (randomInteger(1,10) * 50) - 27;
    bombY = (randomInteger(1,10) * 50) - 16;
    }

    drawThief(thiefX, thiefY);    
       
    if (distanceCalculation(carX,carY,bombX,bombY) < 40){
	ctx.font = "bold 70px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("You Failed!",60,250);
    clearInterval(enemyMovement);
    document.getElementById("surface").style.background="gray";
    clearInterval(weeWooColor);
	}
    drawBomb(bombX, bombY);



 // keeps on placing randomly. if onOff = true
    if (onOff == true){
        stopSignOn();
    } else {
        stopX;
        stopY;
    }

    if (spikeX == undefined || spikeY == undefined){
		spikeY = -1000
		spikeX = -1000
	}

    drawSpikedTrap(spikeX,spikeY);



    
    
    ctx.restore();
}

//random intager.
function randomInteger(low, high){
	let randomInt = Math.random() * (high - low) + low;
	let appInteger = Math.round(randomInt)
	return appInteger;
}

//function that moves the car when specific key presses.
function updatePolicePos(e){
    if (e.key == "ArrowRight" || e.key.toLowerCase() == "d"){
        if (carX >= 470 || distanceCalculation(carX,carY,bombX,bombY) < 40 || distanceCalculation(carX,carY,stopX,stopY) == 78){
            carX += 0;
            } else {
            carX += 50;
            }
    } else if (e.key == "ArrowDown" || e.key.toLowerCase() == "s" ){
        if (carY >= 470 || distanceCalculation(carX,carY,bombX,bombY) < 40 || distanceCalculation(carX,carY,stopX,stopY) == 74){
            carY += 0;
            } else {
            carY += 50;
            }
    } else if (e.key == "ArrowLeft" || e.key.toLowerCase() == "a"){
        if (carX <= 30 || distanceCalculation(carX,carY,bombX,bombY) < 40|| distanceCalculation(carX,carY,stopX,stopY) == 31){
            carX -= 0;
            } else {
            carX -= 50;
            }
    } else if (e.key == "ArrowUp" || e.key.toLowerCase() == "w"){
        if (carY <= 31 || distanceCalculation(carX,carY,bombX,bombY) < 40|| distanceCalculation(carX,carY,stopX,stopY) == 40){
            carY -= 0;
            } else {
            carY -= 50;
            }
    }

    if (e.key == " "){
        spikeX = carX-14
        spikeY = carY-8
    }

    draw();

}


function distanceCalculation(x1,y1,x2,y2){
	let result = Math.pow((x1 - x2), 2);
	result += Math.pow((y1-y2), 2);
	result = Math.sqrt(result);
    result = Math.round(result);
	return result;
}


function resetBttn(){
    carX = 24;
    carY = 30;
    bombX=(randomInteger(1,10) * 50) - 25;
    bombY=(randomInteger(1,10) * 50) - 13;
    thiefX = (randomInteger(1,10) * 50) - 27; 
    thiefY = (randomInteger(1,10) * 50) - 16;
    score = 0;
    clearInterval(weeWooColor);
    clearInterval(enemyMovement)
    enemyMovement = setInterval(randomDirectionBomb, 500)
    weeWooColor = setInterval(weeWoo,500);
    document.getElementById("surface").style.background="lightgreen";
    document.getElementById("currentScore").innerHTML = "Score: " + score; 
    spikeY = undefined;
    spikeX = undefined;
    draw();
}

// color of the canvas background. changes every random sec.
function weeWoo(){
    let randomNum = Math.random();
    
    if(randomNum < 0.3){
    document.getElementById("surface").style.background="lightpink";    
    }else if(randomNum < 0.6){
    document.getElementById("surface").style.background="lightblue";    
    }
    
}


let stopX = 0;
let stopY = 0;
/*
    stopX = randomInteger(1,10)*50;
    stopY = randomInteger(1,10)*50;
*/

//stop sign image.
function stopSign(x,y){
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(-25,-25,22,0,Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 12;
    ctx.lineTo(-43,-25);
    ctx.lineTo(-8,-25);
    ctx.stroke();
    ctx.restore();

    if (stopX == 50 || stopY == 50){
        stopX = randomInteger(1,10) * 50;
        stopY = randomInteger(1,10) * 50;
    }
}

//random walls, still can't make it work. whenever calls in the funtion, walls keep placing randomly.
function stopSignOn(){
    for (let i=0; i<10; i++){
        stopX = randomInteger(1,10) * 50;
        stopY = randomInteger(1,10) * 50;
        stopSign(stopX,stopY);
        }
}

let moneyX = 100;
let moneyY = 50;


//function drawMoney,
function drawMoney(){
    ctx.save();
    ctx.translate(moneyX, moneyY);

    ctx.beginPath();
    ctx.lineWidth = 22;
    ctx.strokeStyle = "black";
    ctx.lineTo(-43,-25);
    ctx.lineTo(-5,-25);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle="green";
    ctx.lineWidth = 14;
    ctx.lineTo(-40,-25);
    ctx.lineTo(-8,-25);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(-24,-25,5,2*Math.PI,0);
    ctx.fill();

    ctx.restore();

}


function drawSpikedTrap(x,y){
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
	ctx.fillStyle="maroon";
	ctx.lineTo(-5,20);
	ctx.lineTo(5,20);
	ctx.lineTo(0,0);
	ctx.lineTo(-5,20);	
	ctx.fill();

    ctx.beginPath();
    ctx.lineTo(5,20);
	ctx.lineTo(15,20);
	ctx.lineTo(10,0);
	ctx.lineTo(5,20);	
	ctx.fill();

    ctx.beginPath();
    ctx.lineTo(15,20);
	ctx.lineTo(25,20);
	ctx.lineTo(20,0);
	ctx.lineTo(15,20);	
	ctx.fill();

    ctx.beginPath();
    ctx.lineTo(25,20);
	ctx.lineTo(35,20);
	ctx.lineTo(30,0);
	ctx.lineTo(25,20);	
	ctx.fill();

    ctx.restore();
}







let bombRight;
let bombUp;
//let randomDirArray = [thiefX = thiefX-50, thiefX= thiefX + 50, thiefY = thiefY-50, thiefY = thiefY+50];

function bombUpDown(){

    if (bombX > 470){
        bombRight = false;
    } else if (bombX < 30){
        bombRight = true;
    } else if (bombY < 80){
        bombUp = false;
    } else if (bombY > 450){
        bombUp = true;
    }
    

    if (bombRight == true){
        bombX +=50;
    } else if (bombRight == false){
        bombX -=50;
    } else if (bombUp == true){
        bombY-=50;
    } else if (bombUp == false){
        bombY+=50;
    } 
    draw();
}
//"left", "right", "up", "down"
let randomMovement;

function randomDirectionBomb(){
randomMovement = randomInteger(1,4);
    if(bombX < 25 && bombY > 450){
        randomMovement = randomInteger(5,6)
    } else if (bombX < 25){
        randomMovement = randomInteger(2,4)
    } else if (bombX > 470 && bombY > 450){
        randomMovement = randomInteger(6,7)
    } else if (bombX > 470){
        randomMovement = randomInteger(6,8);
    } else if (bombY < 80){
        randomMovement = randomInteger(1,3);
    } else if (bombY > 450){
        randomMovement = randomInteger(9,11);
    }


    if (randomMovement == 1 || randomMovement == 7 || randomMovement == 9){
        bombX -=50; 
    }else if (randomMovement == 2 || randomMovement == 5 || randomMovement == 10){
        bombX +=50;
    }else if (randomMovement == 3 || randomMovement == 8){
        bombY +=50;
    }else if (randomMovement == 4 || randomMovement == 6 || randomMovement == 11){
        bombY -=50;
    }
    draw();
}
bombUp = undefined;
let bombR;
    let bombL;
    let bombU;
    let bombD

function moveBombClockwise(){

    if (bombX == 475 && bombY == 37){
        bombD = true;
    } else if (bombX == 475 && bombY == 487){
        bombL = true;
    } else if (bombX == 25 && bombY == 487){
        bombU = true;
    } else if (bombX == 25 && bombY == 37){
        bombR = true;
    }

    if (bombR == true){
        bombX +=50;
    } else if (bombL == true){
        bombX -=50;
    } else if (bombU == true){
        bombY-=50;
    } else if (bombD == true){
        bombY+=50;
    } 


    draw();
}



