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
        if(this.points.length > 1)
        {
            Renderer.Line(
                this.points, 
                this.color,
                this.width,
                this.loop,
                this.gameObject.Transform.layer
            );
            Renderer.Circle(
                this.width * 0.5,
                this.points[0],
                this.gameObject.Transform.layer,
                this.color,
                true,
                0
            );
            Renderer.Circle(
                this.width * 0.5,
                this.points[this.points.length - 1],
                this.gameObject.Transform.layer,
                this.color,
                true,
                0
            );
        }
    }

    Add(point = new Vector2())
    {
        this.points[this.points.length] = point;
    }
}