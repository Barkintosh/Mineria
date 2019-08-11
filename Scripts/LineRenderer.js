class LineRenderer
{
    constructor(gameObject, points, width = 1, color = "white", loop = false)
    {   
        this.points = points;
        this.width = width;
        this.color = color;
        this.gameObject = gameObject;
        this.loop = loop;
    }

    Update()
    {
        var drawPoint = 
        {
            x: (this.gameObject.Transform.position.x - camera.Transform.position.x),
            y: (this.gameObject.Transform.position.y - camera.Transform.position.y)
        }

        if(this.points.length > 0)
        {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;

            /*
            if(this.gameObject.Transform.rotation != 0)
            {
                var rad = this.gameObject.Transform.rotation * Math.PI / 180;
                ctx.translate(drawPoint.x, drawPoint.y);
                ctx.rotate(rad);

                this.Draw(drawPoint);

                ctx.rotate(-rad);
                ctx.translate(-drawPoint.x, -drawPoint.y);
            }
            else this.Draw(drawPoint);
            */

            this.Draw(drawPoint);
        }
    }

    Draw(drawPoint)
    {
        // BEGIN
        ctx.beginPath();
        ctx.moveTo(
            drawPoint.x + this.points[0].x,
            drawPoint.y + this.points[0].y
        );
        // PATH
        for(var i = 1; i < this.points.length; i++)
        {
            ctx.lineTo(
                drawPoint.x + this.points[i].x,
                drawPoint.y + this.points[i].y 
            );
        }
        // END
        if(this.loop)
        {
            ctx.lineTo(
                drawPoint.x + this.points[0].x,
                drawPoint.y + this.points[0].y
            );
        }

        // DRAW
        ctx.stroke();
    }
}