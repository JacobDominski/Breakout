class ball {

    //sets the properties of the ball
    constructor (ctx) {
        //sets the context
        this.ctx = ctx
        //sets the radius
        this.r = 10
        //moves the ball to the starting position
        this.resetBall()
    }

    //reset ball function
    resetBall = () => {
        // sets the x and y to the middle/bottom of the screen
        this.x = config.canvasWidth/2
        this.y = config.canvasHeight/1.5
        //resets the direction x and direction y value
        this.dx = 0
        this.dy = 0
        //after 1000 milliseconds (1 second)
        setTimeout(()=>{
            //get the value of 1 or -1 (50/50 chance)
            let dir = (config.random(config.timeElapsed, 1664525, 1013904223, 232) > 70) ? -1 : 1
            //apply the change to the direction x
            this.dx = config.ballXSpeed * dir
            this.dy = config.ballYSpeed
            //reset time elapsed
            config.timeElapsed = 0
        }, 1000)
    }

    //render draws the circle
    render = () => {
        
        //tells the computer we are drawing a shape
        this.ctx.beginPath();
        //the arc draws a circle
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * config.pi, false)
        //we fill the circle pastel green
        this.ctx.fillStyle = '#f9b400';
        this.ctx.fill();

    }

    //moveo ball modifies the x and y values with dx and dy
    moveBall = () => {
        this.x += this.dx
        this.y += this.dy
        //if the ball reaches the bottom of the canvas
        if(this.y + this.r > config.canvasHeight + this.r*2){
            //goes back to the starting position
            this.resetBall();
        }
    }
    //check player collisions is if the ball and player touch
    checkPlayerCollisions = (p) => {
        //if the balls y position is greater than the player's (lower on the screen)
        if (this.y - (this.r*2) >= p.y - p.height) {
            //if the balls x and y position meet within the bounds of the player's
            if (this.x > p.x && this.x - this.r < (p.x + p.width)){
                //if the ball touches the player from the side
                if (this.y + this.r > p.y && this.y + this.r < p.y + p.height) {
                    //flip the x direction
                    this.dx *= -1
                }else {
                    //if the ball touches the player from the top
                    //flip the y direction
                    this.dy *= -1
                }

            }
        }
    }

    //check if the ball touches one of the walls
    checkWallCollisions = () => {
        //if the ball touches the left or right wall
        if ((this.x - this.r <= 0) || (this.x + this.r >= config.canvasWidth)){
            //flip the x direction
            this.dx *= -1
        }
        //if the ball touches the top of the wall
        if(this.y-this.r < 0){
            //
            this.dx *= -1
        }
    }
    //check if the ball touches one of the bricks (insert the bricks array)
    checkBrickCollisions = (bricks) => {
        //for each brick in the bricks array
        bricks.forEach((br, i) => {
            //check if the ball is less than or greater than the bricks position for y
            if ((this.y - this.r * 2 < br.y + br.height) && (this.y + this.r * 2 > br.y)){
                //if true, check if the ball is less than or greater than the bricks position for x
                if ((this.x + this.r * 2 > br.x) && (this.x < br.x + br.width)){
                    //if true
                    //check if touching from sides or top/bottom
                    if (this.y + this.r > br.y && this.y + this.r < br.y + br.height) {
                        this.dx *= -1
                    }else {
                        this.dy *= -1
                    }
                    //decrease a life
                    br.lives -= 1
                    //if the life of the brick reaches 0
                    if (br.lives <= 0){
                        //delete the object
                        br = null
                        //delete the object inside the bricks array
                        delete bricks[i]
                        //add 10 to the player score
                        config.playerScore += 10
                    }else {
                        //add 2 if you just hit the brick
                        config.playerScore += 2
                    }
                    // if (this.x + this.r > br.x && this.x + this.r < br.x + br.width)
                }
            }
            
        })
    }
}
