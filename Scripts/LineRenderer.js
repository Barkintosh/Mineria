class LineRenderer extends Component
{
    constructor(points = [], width = 1, color = "white", loop = false)
    {
        super();
        this.points = points;
        this.width = width;
        this.color = color;
        this.loop = loop;
    }

    Update()
    {
        if(!this.debug)
        {
            Renderer.Line(
                this.points, 
                this.color,
                this.width,
                this.loop,
                this.gameObject.Transform.layer
            );
        }
    }

    Add(point = new Vector2())
    {
        this.points[this.points.length] = point;
    }
}