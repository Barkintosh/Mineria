class BoxCollider extends Collider
{
    constructor(size = new Vector2(), offset = new Vector2(), isTrigger = false)
    {
        super();
        this.baseSize = size;
        this.size = size;
        this.offset = offset;
        this.isTrigger = isTrigger;
    }

    Update()
    {
        super.Update();
        this.position = this.gameObject.Transform.position.Plus(new Vector2(this.gameObject.Transform.Up().x * this.offset.y + this.gameObject.Transform.Right().y * this.offset.x, this.gameObject.Transform.Up().y * this.offset.x + this.gameObject.Transform.Right().x * -this.offset.y).MultiplyWith(this.gameObject.Transform.scale));
        this.size = this.baseSize.MultiplyWith(this.gameObject.Transform.scale);
    }

    Exhibit()
    {
        Renderer.Rectangle(this.size, this.position, new Vector2(1, 1), 0, 1000, "red", false, 2);
        if(this.overlaping) Renderer.Rectangle(this.size, this.position, new Vector2(1, 1), 0, 1000, "rgba(255, 0, 0, 0.25)", true);
    }

    Bounds()
    {
        return {
            w: 0,
            x: 0,
            y: 0,
            z: 0
        };
    }

    Overlap(other)
    {
        if(other instanceof BoxCollider)
        {
            return this.gameObject.Transform.position.x + this.offset.x - this.size.x/2 < other.gameObject.Transform.position.x + other.offset.x + other.size.x/2
            && other.gameObject.Transform.position.x + other.offset.x - other.size.x/2 < this.gameObject.Transform.position.x + this.offset.x + this.size.x/2
            && this.gameObject.Transform.position.y + this.offset.y - this.size.y/2 < other.gameObject.Transform.position.y + other.offset.y + other.size.y/2
            && other.gameObject.Transform.position.y + other.offset.y - other.size.y/2 < this.gameObject.Transform.position.y + this.offset.y + this.offset.y + this.size.y/2;
        }
        else if(other instanceof CircleCollider)
        {
            return false;
        }
        return false;
    }

    IsPointInBounds(position)
    {
        var pos = ScreenToWorld(position.x, position.y);
        if(pos.x > this.gameObject.Transform.position.x - this.size.x
        && pos.x < this.gameObject.Transform.position.x + this.size.x
        && pos.y > this.gameObject.Transform.position.y - this.size.y
        && pos.y < this.gameObject.Transform.position.y + this.size.y) return true;
        else return false;  
    }
}