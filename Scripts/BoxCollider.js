class BoxCollider
{
    constructor(transform, isTrigger = false, size = {x:1, y:1}, offset = {x:0, y:0})
    {
        this.transform = transform;
        this.baseSize = size;
        this.size = size;
        this.offset = offset;
        this.isTrigger = isTrigger;
        this.overlaping = false;

        this.debug = debug;

    }

    Update()
    {
        // UPDATE POSITION
        this.position = 
        {
            x: (this.transform.position.x - camera.transform.position.x) + this.offset.x * this.transform.size.x,
            y: (this.transform.position.y - camera.transform.position.y) + this.offset.y * this.transform.size.y
        }
        this.size = 
        {
            x: this.baseSize.x * this.transform.size.x,
            y: this.baseSize.y * this.transform.size.y,
        }
        // DEBUG
        if(this.debug) this.Draw();
    }

    ToggleDebug()
    {
        this.debug = !this.debug;
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

    OnCollision(other)
    {
        this.overlaping = true;
    }

    BoxOverlap(other)
    {
        //console.log(this.position.x + " > " + other.position.x + other.size.x/2);

        if(other != this)
        {
           if( this.position.x - this.size.x/2 < other.position.x + other.size.x/2
            && other.position.x - other.size.x/2 < this.position.x + this.size.x/2
            && this.position.y - this.size.y/2 < other.position.y + other.size.y/2
            && other.position.y - other.size.y/2 < this.position.y + this.size.y/2
            )
            {
                //console.log(this.transform.name + " colliding with " + other.transform.name);
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
                            this.transform.position.x -= other.size.x/2 - horizontalDistance;
                        }
                        else
                        {
                            this.transform.position.x += other.size.x/2 - horizontalDistance;
                        }
                    }
                    else
                    {
                        if(this.position.y < other.position.y)
                        {
                            this.transform.position.y -= other.size.y/2 - verticalDistance;
                        }
                        else
                        {
                            this.transform.position.y += other.size.y/2  - verticalDistance;
                        }
                    }
                }
                */
                return true;
            }
            return false;
        }
        else 
        {
            return false;
        }
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
                //console.log(this.transform.name + " colliding with " + other.transform.name);
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
                            this.transform.position.x -= other.size.x/2 - horizontalDistance;
                        }
                        else
                        {
                            this.transform.position.x += other.size.x/2 - horizontalDistance;
                        }
                    }
                    else
                    {
                        if(this.position.y < other.position.y)
                        {
                            this.transform.position.y -= other.size.y/2 - verticalDistance;
                        }
                        else
                        {
                            this.transform.position.y += other.size.y/2  - verticalDistance;
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
        if(pos.x > this.transform.position.x - this.size.x
        && pos.x < this.transform.position.x + this.size.x
        && pos.y > this.transform.position.y - this.size.y
        && pos.y < this.transform.position.y + this.size.y) return true;
        else return false;  
    }
}