class Button
{
    constructor(action = null)
    {
        this.action = action;
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
                this.action();
            }
        }
    }
}