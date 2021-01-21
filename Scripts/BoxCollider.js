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
        this.position = 
        {
            x: this.gameObject.Transform.position.x + this.offset.x * this.gameObject.Transform.scale.x,
            y: this.gameObject.Transform.position.y + this.offset.y * this.gameObject.Transform.scale.y
        }
        this.size = 
        {
            x: this.baseSize.x * this.gameObject.Transform.scale.x,
            y: this.baseSize.y * this.gameObject.Transform.scale.y,
        }
    }

    Exhibit()
    {
        Renderer.Rectangle(this.size, this.position, new Vector2(1, 1), 0, 1000, "red", false, 2);
        if(this.overlaping) Renderer.Rectangle(this.size, this.position, new Vector2(1, 1), 0, 1000, "rgba(255, 0, 0, 0.25)", true);
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
    /*
    BoxOverlap(other)
    {
        console.log(this.position.x + " > " + other.position.x + other.size.x/2);

        if(other != this)
        {
           if( this.position.x < other.position.x + other.size.x
            && other.position.x < this.position.x + this.size.x
            && this.position.y < other.position.y + other.size.y
            && other.position.y < this.position.y + this.size.y
            )
            {
                //console.log(this.gameObject.Transform.name + " colliding with " + other.transform.name);
                /*
                if(!this.isTrigger || !other.isTrigger)
                {
                    var horizontalDistance = Math.abs(this.position.x - other.position.x);
                    var verticalDistance = Math.abs(this.position.y - other.position.y);

                    console.log(other.size.x/2 + this.size.x/2 - horizontalDistance);

                    if(horizontalDistance < verticalDistance)
                    {
                        if(this.position.x < other.position.x)
                        {
                            //other.size.x/2 - horizontalDistance
                            this.gameObject.Transform.position.x -= other.size.x/2 - horizontalDistance;
                        }
                        else
                        {
                            this.gameObject.Transform.position.x += other.size.x/2 - horizontalDistance;
                        }
                    }
                    else
                    {
                        if(this.position.y < other.position.y)
                        {
                            this.gameObject.Transform.position.y -= other.size.y/2 - verticalDistance;
                        }
                        else
                        {
                            this.gameObject.Transform.position.y += other.size.y/2  - verticalDistance;
                        }
                    }
                }
                return true;
            }
            return false;
        }
        else 
        {
            return false;
        }
    }
    */

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