class Text
{
    constructor(gameObject = null, text = "", font = "Arial", color = "white", size = 11)
    {
        this.gameObject = gameObject;
        this.text = text;
        this.font = font;
        this.color = color;
        this.size = size;
    }

    Update()
    {
        Render.UIText(this.gameObject.RectTransform, this.text, this.size + "px "+ this.font, this.color);
    }
}