class SpriteRenderer extends Component
{
    constructor(sprite, coordinate, area)
    {   
        super();
        this.sprite = sprite;
        this.area = area;
        this.coordinate = coordinate;
    }

    Sprite(sprite, coordinate, area)
    {
        this.sprite = sprite;
        this.coordinate = coordinate;  
        this.area = area;
    }

    Update()
    {
        super.Update();
        Renderer.Sprite(
            this.sprite,
            this.coordinate,
            this.area,
            this.gameObject.Transform
        );
    }

    Exhibit()
    {
        super.Exhibit();
        Renderer.Rectangle(
            this.area,
            this.gameObject.Transform.position,
            this.gameObject.Transform.scale,
            this.gameObject.Transform.rotation,
            this.gameObject.Transform.layer + 1,
            "rgba(255, 255, 0, 0.25)"
        );
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