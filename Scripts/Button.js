class Button
{
    constructor(position = {x:0, y:0}, width = 10, height = 10, text = "undefined", action)
    {
        this.position = 
        {
            x: position.x,
            y: position.y
        }
        this.text = text;
        this.action = action;
        this.width = width;
        this.height = height;

        this.action = action;

        //this.event = document.addEventListener('mouseDownEvent', this.Click());
    }
/*
    Click()
    {
        console.log("lul");

        if(this.IsClicked(mouseX, mouseY))
        {
            this.action();
        }
    }
*/
    IsClicked(x, y)
    {
        if(x > this.position.x
        && x < this.position.x + this.width
        && y > this.position.y
        && y < this.position.y + this.height) return true;
        else return false;
    }

    Update()
    {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        ctx.font = "14px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center"; 
        ctx.justify = "center"; 
        ctx.textBaseline = 'middle'; 
        ctx.fillText(this.text, this.position.x + this.width/2, this.position.y + this.height/2, this.width, this.height);
        
        if(mouseDown && this.IsClicked(mouseX, mouseY))
        {
            this.action();
        }
        
    }


}