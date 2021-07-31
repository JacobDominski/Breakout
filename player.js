class player {
    //constructor to initialize all the properties for the player
    constructor(x, y, ctx){
        //set the x, y, and context
        this.x = x
        this.y = y
        this.ctx = ctx
        //set the width and height to the global variables in config
        this.width = config.playerWidth
        this.height = config.playerHeight
    }

    //draws the player
    render = () => {
        //pastel green color
        this.ctx.fillStyle = "#2fca91"
        //draws the rectangle with the desired x, y, width, and height
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    //moves the player right 
    moveRight = () => {
        ///checks if the player is at the edge
        if(this.x + this.width > config.canvasWidth){
            //sets the player to right at the edge
            this.x = config.canvasWidth - this.width
        }else{
            //continues to move right
            this.x += config.playerSpeed
        }
    }

    //moves the player left
    moveLeft = () => {
        //checks if the player is at the edge on the left
        if(this.x < 0){
            //sets the player to the left at the edge
            this.x = 0
        }else{
            //continues to move left
            this.x -= config.playerSpeed
        }
    }
}
