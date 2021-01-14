class SpriteRenderer
{
    constructor(gameObject, sprite, coordinate, area)
    {   
        this.sprite = sprite;
        this.area = area;
        this.coordinate = coordinate;
        this.gameObject = gameObject;

        this.debug = debug;
    }

    NewSprite(sprite, coordinate, area)
    {
        this.sprite = sprite;
        this.coordinate = coordinate;  
        this.area = area;
    }

    Update()
    {
        if(this.debug)
        {
            Renderer.Rectangle(
                this.area,
                this.gameObject.Transform.position,
                this.gameObject.Transform.scale,
                this.gameObject.Transform.rotation,
                this.gameObject.Transform.layer,
                "rgba(255, 255, 0, 0.25)"
            );
        }
        else
        {
            Renderer.Sprite(
                this.sprite,
                this.coordinate,
                this.area,
                this.gameObject.Transform
            );
        }
    }

    ToggleDebug()
    {
        if(this.debug == undefined) this.debug = true;
        else this.debug = !this.debug;
    }

    GetHorizontalShift()
    {
        if(this.horizontalAlignement == HorizontalAlignement.LEFT) return 0;
        else if(this.horizontalAlignement == HorizontalAlignement.RIGHT) return -this.width;
        else return -this.width/2;
    }

    GetVerticalShift()
    {
        if(this.verticalAlignement == VerticalAlignement.DOWN) return -this.height;
        else if(this.verticalAlignement == VerticalAlignement.TOP) return 0;
        else return -this.height/2;
    }
}