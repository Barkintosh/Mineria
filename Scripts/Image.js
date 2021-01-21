class Image extends Component
{
    constructor(sprite, coordinate, area)
    {
        this.sprite = sprite;
        this.area = area;
        this.coordinate = coordinate;
        this.gameObject = gameObject;
        this.debug = debug;
    }

    Update()
    {
        Renderer.Image(
            this.sprite,
            this.coordinate,
            this.area,
            this.gameObject.RectTransform
        );
    }

    Draw()
    {
        //Renderer.UIText("IMAGE", "21px Press Start 2P", "black", this.gameObject.RectTransform.position, 10000);
        Renderer.UIRectangle(
            this.gameObject.RectTransform.size,
            this.gameObject.RectTransform.position,
            this.gameObject.RectTransform.scale,
            this.gameObject.RectTransform.rotation,
            this.gameObject.RectTransform.layer + 1,
            "rgba(255, 0, 255, 0.25)"
        );
    }
}