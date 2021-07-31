//object to store global variables
const config = {
    canvasWidth: 700,
    canvasHeight: 450,
    playerWidth: 80,
    playerHeight: 30,
    playerSpeed: 10,
    playerScore: 0,

    ballXSpeed: 5,
    ballYSpeed: 5,

    timeElapsed: 0,
    pi: 3.141592653589793,

    random: (seed, multiplier, increment, modulus) => (multiplier * seed + increment) % modulus
}

//function that runs when the window loads
window.onload = () => {
    //calls the create canvas to draw the html elements
    const canvas = createCanvas()
    //gets the context of the canvas
    var ctx = canvas.getContext("2d");
    //draw the background of the canvas
    drawBackground(ctx, config.playerScore)
    //creates the player with the x, y, and context
    const p = new player(310, 400, ctx)
    //creates the ball with the context
    const b = new ball(ctx)
    //creates the bricks with 10 in each row and 5 in each column and context
    bricks = createBricks(10, 5, ctx)
    //create an object to store the state of if a key is pressed
    const controller = {
        //stores if A is pressed and has the associated function to call if true
        "KeyA": { pressed: false, func: p.moveLeft },
        //stores if D is pressed and has the associated function to call if true
        "KeyD": { pressed: false, func: p.moveRight },
    }

    //add an event listener for whn I press a key
    document.addEventListener("keydown", (e) => {
        //check if the key I press is one of the key codes in the controller object
        //and sets the pressed state to true
        controller[e.code] && (controller[e.code].pressed = true);
    })
    //add an event listener for when I release a key
    document.addEventListener("keyup", (e) => {
        //check if the key I release is one of the key codes in the controller object
        controller[e.code] && (controller[e.code].pressed = false);
        //and sets the pressed state to false
    })
    //this will call the animate function every 25 milliseconds
    //it also passes in the context, player, ball, array of bricks, and controller object
    setInterval(animate, 25, ctx, p, b, bricks, controller)
}

//function that draws the background and score
const drawBackground = (ctx, score) => {
    //first sets the color to light grey
    ctx.fillStyle = "lightgrey";
    //create a rectangle that fills the canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    //change the color to black
    ctx.fillStyle = "black"
    //set the font for the score
    ctx.font = "20px Arial"
    //display the score on the screen
    ctx.fillText(`Score ${score}`, 15, 30)
}

//this will call one of the functions in the controller object
//if it's true which will move the player left or right
const runPressedButtons = (controller) => {
    //gets the keys of the controller (That would be KeyA, and KeyD)
    //then we call a for each to go through both keys where "key" is either KeyA or KeyD
    Object.keys(controller).forEach(key => {
        //using the specific key from the controller, we can check the state of pressed
        //and if true will call the function for that respective key. 
        //(either p.moveRight() or p.moveLeft())
        controller[key].pressed && controller[key].func()
    })
}

//renders all the objects in Breakout
const render = (ctx, p, b, bricks) => {
    //first clear the screen
    ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight)
    //draw the background again
    drawBackground(ctx, config.playerScore)
    //draw the player
    p.render()
    //draw the ball
    b.render()
    //draw each brick using a foreach loop
    bricks.forEach(br => {
        br.render()
    })
}

//basically our game loop
const animate = (ctx, p, b, bricks, controller) => {
    //update the time elapsed for seeds in the random function
    config.timeElapsed ++
    //draws all the objects in our game
    render(ctx, p, b, bricks)
    //runs to check if we press A or D
    runPressedButtons(controller)
    //check if the ball touches the player
    b.checkPlayerCollisions(p)
    //check if the ball touches the walls
    b.checkWallCollisions()
    //check if the ball touches one of the bricks
    b.checkBrickCollisions(bricks)
    //moves the ball
    b.moveBall()

    
}

//this will create any number of bricks you specify with numX and numY
const createBricks = (numX, numY, ctx) => {
    //creates empty array to store all the bricks in
    bricks = []
    //calculates the width based on the size of the canvas divided by the number of bricks
    //in each row. Then subtract 11 so there's space between each brick horizontally.
    let w = (config.canvasWidth/numX) - 11
    //calculates teh height based on the size of the canvas fivided by the number of bricks
    //in each column. Then subtract 5 so there's space between each brick vertically.
    let h = ((config.canvasHeight/3)/numY) - 5
    //nested for loop for creating the bricks with the speciic amount in the x and y direction
    for(let i = 0; i < numX; i++){
        for(let j = 0; j < numY; j++){
            //create the x value based off a constant, 10, which moves the brick to the right
            //plus i*10 which separates and gives space between the bricks. and i*w which is
            //the width of the brick itself
            let x = 10 + i*10 + i*w
            //same for y except we start at 40 to give room for the score
            let y = 40 + j*10 + j*h
            //create a brick from a brick class with the appropriate x, y, w, h, and ctx
            var br = new brick(x, y, w, h, ctx)
            //add that object to the bricks array
            bricks.push(br)
        }
    }
    //send the bricks outside the function to be reused 
    return bricks
}

//this function draws all the html elements
const createCanvas = () => {
    //creates the container where all the elements are being stored
    const container = document.createElement("div")
    //give the container an ID
    container.id="container"
    //change the display to flex for easy centering
    container.style.display = "flex"
    //change direction to column instead of row
    container.style.flexDirection = "column"
    //add this container to the body
    document.body.appendChild(container)

    //create a title to be displayed above the game
    const title = document.createElement("h1")
    //give it the text Breakout
    title.innerHTML = "Breakout!"
    //center the text
    title.style.textAlign = "center"
    title.style.fontFamily = "Arial"
    title.style.fontSize = "50px"
    //add the title to the container
    container.appendChild(title)

    //create the canvas which is our game
    const canvas = document.createElement("canvas");
    //give it an id
    canvas.id = "canvas"
    //set the width and height to our global variables
    canvas.width = config.canvasWidth
    canvas.height = config.canvasHeight
    //create a border around the game
    canvas.style.border = "4px solid black"
    canvas.style.borderRadius = "8px"
    //sets the size of the canvas staticly
    canvas.style.margin = "0 auto"
    //add this canvas to the container
    container.appendChild(canvas)

    //create an instructions text below the game
    const instructions = document.createElement("h1")
    //give it an ID
    instructions.id = "instruct"
    //displayed instruction texts
    instructions.innerHTML = "Use A and D to move!"
    //center the text
    instructions.style.textAlign = "center"
    instructions.style.fontFamily = "Arial"
    instructions.style.fontSize = "20px"
    //add this text to the container
    container.appendChild(instructions)
    //change the background color of the entire webpage to lightblue
    document.body.style.backgroundColor = "lightblue"
    //return the canvas to be reused / redrawn
    return canvas
}
