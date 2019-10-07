class Collider
{
    constructor(transform, newBounds)
    {
        this.transform = transform;
        this.baseBounds = this.CopyArray(newBounds);
        this.bounds = this.CopyArray(this.baseBounds);
        this.shown = false;
    }

    Update()
    {
        // UPDATE POSITION
        this.position = 
        {
            x: (this.transform.position.x - camera.Transform.position.x),
            y: (this.transform.position.y - camera.Transform.position.y)
        }

        // UPDATE BOUNDS
        for( let i = 0; i < this.bounds.length; i += 2)
        {
            this.bounds[i] = this.baseBounds[i] * this.transform.scale.x;
            this.bounds[i+1] = this.baseBounds[i+1] * this.transform.scale.y;
        }

        // DEBUG
        if(this.shown) this.Draw();
    }

    ToggleDebug()
    {
        this.shown = !this.shown;
    }

    Draw(color = "white", width = 1)
    {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();

        ctx.moveTo(
            (this.bounds[0] + this.position.x),
            (this.bounds[1] + this.position.y)
        );

        for( let i = 2; i < this.bounds.length; i += 2)
        {
            ctx.lineTo(
                this.bounds[i] + this.position.x,
                this.bounds[i+1] + this.position.y
            );
        }

        ctx.lineTo(
            this.bounds[0] + this.position.x,
            this.bounds[1] + this.position.y
        );
        ctx.stroke();
    }

    IsColliding(other)
    {    
        for( let i = 0; i < this.bounds.length; i += 4)
        {
            for( let j = 0; j < other.bounds.length; j += 4)
            {
                if(IsIntersecting(
                    this.bounds[i] + this.transform.position.x,
                    this.bounds[i+1] + this.transform.position.y,
                    this.bounds[i+2] + this.transform.position.x,
                    this.bounds[i+3] + this.transform.position.y,
                    other.bounds[j] + other.transform.position.x,
                    other.bounds[j+1] + other.transform.position.y,
                    other.bounds[j+2] + other.transform.position.x,
                    other.bounds[j+3] + other.transform.position.y
                    ))
                {
                    return true;
                }
            }
        }
        return false;
    }

    CopyArray(array)
    {
        var newArray = [];
        for(var i = 0; i < array.length; i++)
        {
            newArray[i] = array[i];
        }
        return newArray;
    }

    IsPointInBounds(posX, posY)
    {
        var pos = ScreenToWorld(posX, posY);
        if(pos.x > this.transform.position.x + this.bounds[0]
        && pos.x < this.transform.position.x + this.bounds[4]
        && pos.y > this.transform.position.y + this.bounds[1]
        && pos.y < this.transform.position.y + this.bounds[5]) return true;
        else return false;  
    }
}