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
        this.position = this.gameObject.Transform.position.Plus(new Vector2(this.gameObject.Transform.Up().x * this.offset.y + this.gameObject.Transform.Right().y * this.offset.x, this.gameObject.Transform.Up().y * this.offset.x + this.gameObject.Transform.Right().x * -this.offset.y).MultiplyWith(this.gameObject.Transform.scale));
            
        if(this.gameObject.Transform.scale.x >= this.gameObject.Transform.y)
            this.radius = this.baseRadius * this.gameObject.Transform.scale.x;
        else
            this.radius = this.baseRadius * this.gameObject.Transform.scale.y;
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
            var distance = Vector2.Distance(this.gameObject.Transform.position.Plus(this.offset), other.gameObject.Transform.position.Plus(other.offset));
            return distance < this.radius + other.radius;
        }
        else if(other instanceof BoxCollider)
        {
            var distance = Vector2.Distance(this.gameObject.Transform.position.Plus(this.offset), other.gameObject.Transform.position.Plus(other.offset));
            if(distance < this.radius) return true;



            return false;
        }
        return false;
    }
}