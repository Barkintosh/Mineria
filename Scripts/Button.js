class Button
{
    constructor(position = {x:0, y:0}, width = 10, height = 10, text = "undefined", color = "white", action = null)
    {
        this.position = 
        {
            x: position.x,
            y: position.y
        }

        // STYLE
        this.text = text;
        this.action = action;
        this.width = width;
        this.height = height;
        this.color = color;

        this.action = action;

        //canvas.addEventListener("click", this.Check);
    }

    IsClicked(x, y)
    {
        if(x > this.position.x
        && x < this.position.x + this.width
        && y > this.position.y
        && y < this.position.y + this.height){ return true; }
        else return false;
    }

    Update()
    {
        this.Draw();
        if(mouseDown)
        {
            if(this.IsClicked(mouseX, mouseY))
            {
                console.log(this.action.name);
                this.action();
            }
        }
    }

    Draw()
    {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center"; 
        ctx.justify = "center"; 
        ctx.textBaseline = 'middle'; 
        ctx.fillText(this.text, this.position.x + this.width/2, this.position.y + this.height/2, this.width, this.height);
    }
}