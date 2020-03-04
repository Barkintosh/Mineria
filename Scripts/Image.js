class Image
{
    constructor(gameObject, sprite, coordinate, area)
    {
        this.sprite = sprite;
        this.area = area;
        this.coordinate = coordinate;
        this.gameObject = gameObject;
        this.debug = debug;
    }

    Update()
    {
        if(this.debug) this.Draw();
        else
        {
            Render.Image(
                this.sprite,
                this.coordinate,
                this.area,
                this.gameObject.RectTransform
            );
        }
        

    }

    Reset()
    {

    }

    ToggleDebug()
    {
        this.debug = !this.debug;
    }

    Draw()
    {
        //Render.UIText("IMAGE", "21px Press Start 2P", "black", this.gameObject.RectTransform.position, 10000);
    
        Render.UIRectangle(
            this.gameObject.RectTransform.size,
            this.gameObject.RectTransform.position,
            this.gameObject.RectTransform.scale,
            this.gameObject.RectTransform.rotation,
            this.gameObject.RectTransform.layer,
            "rgba(255, 0, 255, 0.25)"
        );
    
    }
}