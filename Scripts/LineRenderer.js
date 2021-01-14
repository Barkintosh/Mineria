class LineRenderer
{
    constructor(gameObject, points = [], width = 1, color = "white", loop = false)
    {   
        this.gameObject = gameObject;
        this.points = points;
        this.width = width;
        this.color = color;
        this.loop = loop;
    }

    Update()
    {
        Renderer.Line(
            this.points, 
            this.color,
            this.width,
            this.loop,
            this.gameObject.Transform.layer
        );
    }

    Add(point = new Vector2())
    {
        this.points[this.points.length] = point;
    }
}