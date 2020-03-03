class Button
{
    constructor(gameObject = null, action = null)
    {
        this.gameObject = gameObject;
        this.action = action;
    }

    IsClicked(x, y)
    {
        if(x > this.gameObject.RectTransform.position.x - this.gameObject.RectTransform.size.x/2 * this.gameObject.RectTransform.scale.x
        && x < this.gameObject.RectTransform.position.x + this.gameObject.RectTransform.size.x/2 * this.gameObject.RectTransform.scale.x
        && y > this.gameObject.RectTransform.position.y - this.gameObject.RectTransform.size.y/2 * this.gameObject.RectTransform.scale.y
        && y < this.gameObject.RectTransform.position.y + this.gameObject.RectTransform.size.y/2 * this.gameObject.RectTransform.scale.y)
        { return true; }
        else return false;
    }

    Update()
    {
        if(mouseDown && this.IsClicked(mouseX, mouseY))
        {
            this.action();
        }
    }
}