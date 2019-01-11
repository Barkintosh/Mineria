class Collider
{
    constructor(bounds)
    {
        this.bounds = bounds;
    }

    Update(position)
    {
        /*
        for( let i = 0; i < this.bounds.length; i += 1)
        {
            if(i%2 == 0) this.bounds[i];
            else this.bounds[i];
        }
        */
       this.position = 
       {
           x: (position.x*scale/canvas.width),
           y: (position.y*scale/canvas.height)
       }
       console.log(this.position);
    }

    Draw(color = "white", width = 1)
    {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();

        ctx.moveTo(this.bounds[0] + this.position.x, this.bounds[1] + this.position.y);
        for( let i = 2; i < this.bounds.length; i += 2)
        {
            ctx.lineTo(this.bounds[i] + this.position.x, this.bounds[i+1] + this.position.y);
        }
        ctx.lineTo(this.bounds[0] + this.position.x, this.bounds[1] + this.position.y);

        ctx.stroke();
    }

    IsColliding(other)
    {        
        for( let i = 0; i < this.bounds.length; i += 4)
        {
            for( let j = 0; j < other.bounds.length; j += 4)
            {

                //denom = ((LineB2.Y – LineB1.Y) * (LineA2.X – LineA1.X)) – ((LineB2.X – LineB1.X) * (LineA2.Y - LineA1.Y));

                var denom = ( (other.bounds[j+3] - other.bounds[j+1]) * (other.bounds[i+2] - other.bounds[i]) ) - ( (other.bounds[j+3] - other.bounds[j]) * (other.bounds[i+3] - other.bounds[i+1]) );
                console.log(denom);

                if (denom != 0)
                {

                }
            }
        }
        return null;
    }
}