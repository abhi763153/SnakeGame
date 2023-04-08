// Game constant and variable

let inputDir ={x : 0, y : 0};
const foodSound = new Audio('food.wav');
const moveSound = new Audio('move.wav');
const gameOverSound = new Audio('gameOver.wav');
const musicSound = new Audio('gameMusic.wav');
let speed = 5;
let lastPaintTime = 0;
let snakeArray = [
    {x : 13, y : 15}
]

let food = {x : 6, y : 7};
let score = 0;


// Game Functions

function main(ctime){
    window.webkitRequestAnimationFrame(main);
    // console.log(ctime);

    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){
    // If you bump in yourself
    
    return false;
}

function gameEngine(){
    // Part : 1 Updation the snake array & food.
    // Part : 2 Render the snake and food

    if(isCollide(snakeArray)){
        gameOverSound.play();
        foodSound.pause();
        inputDir = {x : 0, y : 0};
        alert('Game Over!! Please press any key to play again');
        snakeArray = [{x : 13, y : 15}];
        foodSound.play();
        score = 0;
    }

    // If you have eaten the food then increase 
    // the score and regenrate the food.
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        snakeArray.unshift({x :snakeArray[0].x + inputDir.x, y :snakeArray[0].y + inputDir.y});
        
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }

    // Moving the snake
    for(let i = snakeArray.length-2; i>=0; i--){
            snakeArray[i+1] = {...snakeArray[i]};
        }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;





    // Displaying the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);

    })

    // Displaying the food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');

    board.appendChild(foodElement);


}





// Main logic start from here 
window.requestAnimationFrame(main);

window.addEventListener('keydown', e=>{
        inputDir = {x:0, y:1};

        switch(e.key){

            case 'ArrowUp' :
                console.log("ArrowUp");
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            case 'ArrowDown' :
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case 'ArrowLeft' :
                console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case 'ArrowRight' :
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
                break;

        }
})