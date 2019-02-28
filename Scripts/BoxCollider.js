class BoxCollider
{
    constructor(transform, isTrigger = false, size = {x:1, y:1}, offset = {x:0, y:0})
    {
        this.transform = transform;
        this.size = size;
        this.offset = offset;
        this.isTrigger = isTrigger;

        this.shown = false;
        this.overlaping = false;
    }

    Update()
    {
        // UPDATE POSITION
        this.position = 
        {
            x: (this.transform.position.x - camera.transform.position.x) + this.offset.x,
            y: (this.transform.position.y - camera.transform.position.y) + this.offset.y
        }

        // DEBUG
        if(this.shown) this.Draw();
    }

    ToggleShown()
    {
        this.shown = !this.shown;
    }

    Draw(color = "red", width = 1)
    {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.rect(
            this.position.x - this.size.x/2,
            this.position.y - this.size.y/2,
            this.size.x,
            this.size.y
        );
        ctx.stroke();

        if(this.overlaping)
        {
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fillRect(
                this.position.x - this.size.x/2,
                this.position.y - this.size.y/2,
                this.size.x,
                this.size.y
            );
        }
    }

/*
    if(box1.position.x < box2.position.x + box2.size.x
    && box2.position.x < box1.position.x + box1.size.x
    && box1.position.y < box2.position.y + box2.size.y
    && box2.position.y < box1.position.y + box1.size.y
*/

    BoxOverlap(other)
    {
        if(other != this)
        {
            if(this.position.x < other.position.x + other.size.x
            && other.position.x < this.position.x + this.size.x
            && this.position.y < other.position.y + other.size.y
            && other.position.y < this.position.y + this.size.y
            )
            {
                if(!this.isTrigger || !other.isTrigger)
                {
                    var horizontalDistance = Math.abs(this.position.x) - Math.abs(other.position.x);
                    var verticalDistance = Math.abs(this.position.y) - Math.abs(other.position.y);

                    if(horizontalDistance < verticalDistance)
                    {
                        if(this.position.x < other.position.x)
                        {
                            //other.size.x/2 - horizontalDistance
                            this.transform.position.x -= 4;
                        }
                        else
                        {
                            this.transform.position.x += 4;
                        }
                    }
                    else
                    {
                        if(this.position.y < other.position.y)
                        {
                            this.transform.position.y -= 4;
                        }
                        else
                        {
                            this.transform.position.y += 4;
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
}