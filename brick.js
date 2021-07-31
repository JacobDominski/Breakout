//class brick 
class brick {
    //the constructor to set the properties of the object 
    constructor(x, y, w, h, ctx) {
        //x position
        this.x = x
        //y position
        this.y = y
        //width
        this.width = w
        //height
        this.height = h
        //context
        this.ctx = ctx
        //amount of lives of each brick
        this.lives = 4
    }

    //render function draws the brick
    render = () => {
        //switch to determine the color based on  the lives
        //the purpose of the modulos 4 is if the number of lives exceeds 4, it will continue to cycle
        switch(this.lives % 4){
            //if the lives is at 3
            case 3:
                //change color
                this.ctx.fillStyle = "#3FC1C9"
                break
            //if the lives is at 2
            case 2:
                this.ctx.fillStyle = "#F5F5F5"
                break
            //if the lives is at 1
            case 1:
                this.ctx.fillStyle = "#FC6185"
                break
            //if the lives is at 4 or 0 and if 0 it would be destoryed
            case 0:
                this.ctx.fillStyle = "#364F6B"
                break
            //any other value that is skipped (Should never run)
            default:
                this.ctx.fillStyle = "black"
                break
        }

        //draws the brick with the desired x, y, width, and height
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        
    }
}