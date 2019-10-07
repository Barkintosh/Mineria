class Renderer
{
    constructor()
    {
        this.drawCalls = [];
    }

    Update()
    {
        this.drawCalls.sort(function(a, b)
        {
            return a.transform.layer - b.transform.layer;
        });

        this.drawCalls.forEach(function(element)
        {
            element.Draw();
        });

        this.drawCalls = [];
    }
    
    Image(sprite, coordinate, area, transform)
    {
        this.drawCalls.push(
            new ImageDrawCall(
                sprite,
                coordinate,
                area, 
                transform
            )
        );
    }
    
    Rectangle(size, transform, color = "rgba(255, 255, 255, 1)")
    {
        this.drawCalls.push(
            new RectangleDrawCall(
                size,
                transform,
                color
            )
        );
    }
    
    Circle()
    {
        
    }
}

class ImageDrawCall
{
    constructor(sprite, coordinate, area, transform)
    {
        this.sprite = sprite;
        this.coordinate = coordinate;
        this.area = area;
        this.transform = transform;
    }

    Draw()
    {
        ctx.save();

        var point = 
        {
            x: (this.transform.position.x - camera.Transform.position.x),
            y: (this.transform.position.y - camera.Transform.position.y)
        }

        ctx.translate(point.x, point.y);
        ctx.scale(this.transform.scale.x, this.transform.scale.y);
        ctx.rotate(this.transform.rotation * Math.PI / 180);

        ctx.drawImage
        (
            this.sprite,
            this.coordinate.x,
            this.coordinate.y,
            this.area.x,
            this.area.y,

            -this.area.x/2,
            -this.area.y/2,
            this.area.x,
            this.area.y
        );

        ctx.restore();
    }
}

class RectangleDrawCall
{
    constructor(size, transform, color = "rgba(255, 255, 255, 1)")
    {
        this.size = size;
        this.transform = transform;
        this.color = color;
    }

    Draw()
    {
        ctx.save();

        var point = 
        {
            x: (this.transform.position.x - camera.Transform.position.x),
            y: (this.transform.position.y - camera.Transform.position.y)
        }

        ctx.translate(point.x, point.y);
        ctx.scale(this.transform.scale.x, this.transform.scale.y);
        ctx.rotate(this.transform.rotation * Math.PI / 180);

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(
            -this.size.x/2,
            -this.size.y/2,
            this.size.x,
            this.size.y
        );

        ctx.restore();
    }
}