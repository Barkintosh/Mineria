class CircleCollider extends Collider
{
    constructor(radius = 0, offset = new Vector2(), isTrigger = false)
    {
        super();
        this.radius = radius;
        this.baseRadius = radius;
        this.offset = offset;
        this.isTrigger = isTrigger;
    }

    Update()
    {
        super.Update();
        this.position = new Vector2
        (
            this.gameObject.Transform.position.x + this.offset.x * this.gameObject.Transform.scale.x,
            this.gameObject.Transform.position.y + this.offset.y * this.gameObject.Transform.scale.y
        );
            
        if(this.gameObject.Transform.scale.x >= this.gameObject.Transform.y)
        {
            this.radius = this.baseRadius * this.gameObject.Transform.scale.x;
        }
        else
        {
            this.radius = this.baseRadius * this.gameObject.Transform.scale.y;
        }
    }

    Exhibit()
    {
        Renderer.Circle(this.radius, this.position, 100, "rgba(255, 0, 0, 1)", false, 1);
        if(this.others.length > 0) Renderer.Circle(this.radius, this.position, 100, "rgba(255, 0, 0, 0.5)", true);
    }

    Overlap(other)
    {
        if(other instanceof CircleCollider)
        {
            var distance = Vector2.Distance(this.gameObject.Transform.position, other.gameObject.Transform.position);
            return distance < this.radius + other.radius;
        }
        else if(other instanceof BoxCollider)
        {
            return false;
        }
        return false;
    }
}