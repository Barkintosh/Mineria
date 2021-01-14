class Renderer
{
    static calls = [];

    static Out(position = {x: 0, y: 0}, size = {x: 1, y: 1} , scale = {x: 1, y: 1})
    {
        return this.BoundsOut(
            this.Bounds(position, size, scale),
            camera.Bounds()
        );
    }

    static UIOut(position = {x: 0, y: 0}, size = {x: 1, y: 1} , scale = {x: 1, y: 1})
    {
        return this.BoundsOut(
            this.Bounds(position, size, scale, true),
            camera.CanvasBounds()
        );
    }

    static BoundsOut(drawBounds, otherBounds)
    {
        if(drawBounds.downRight.x < otherBounds.upLeft.x || drawBounds.upLeft.x > otherBounds.downRight.x)
        {
            return true;
        }
        else if(drawBounds.downRight.y < otherBounds.upLeft.y || drawBounds.upLeft.y > otherBounds.downRight.y)
        {
            return true;
        }
        else return false;
    }

    static Bounds(position = {x: 0, y: 0}, size = {x: 1, y: 1} , scale = {x: 1, y: 1}, ui = false)
    {
        return {
            upLeft: 
            {
                x: position.x - (size.x/2) * scale.x,
                y: position.y - (size.y/2) * scale.y
            },
            upRight: 
            {
                x: position.x + (size.x/2) * scale.x,
                y: position.y - (size.y/2) * scale.y
            },
            downLeft: 
            {
                x: position.x - (size.x/2) * scale.x,
                y: position.y + (size.y/2) * scale.y
            },
            downRight: 
            {
                x: position.x + (size.x/2) * scale.x,
                y: position.y + (size.y/2) * scale.y
            }
        };
    }

    static Update()
    {
        Renderer.calls.sort(function(a, b) {return a.layer - b.layer;});
        Renderer.calls.forEach(function(element) {element.Draw();});
        Renderer.calls = [];
    }
    
    static Sprite(sprite, coordinate, area, transform)
    {
        if(!Renderer.Out(transform.position, area, transform.scale))
        {
            Renderer.calls.push(
                new SpriteDrawCall(
                    sprite,
                    coordinate,
                    area, 
                    transform
                )
            );
        }
    }
    
    static Rectangle(size, position = {x: 0, y: 0}, scale = {x: 1, y: 1}, rotation = 0, layer = 0, color = "rgba(255, 255, 255, 1)", fill = true, width = 1)
    {
        if(!Renderer.Out(position, size, scale))
        {
            Renderer.calls.push(
                new RectangleDrawCall(
                    false,
                    size,
                    position,
                    scale, 
                    rotation,
                    layer,
                    color,
                    fill,
                    width
                )
            );
        }
    }

    static UIRectangle(size = {x: 0, y: 0}, position = {x: 0, y: 0}, scale = {x: 1, y: 1}, rotation = 0, layer = 0, color = "rgba(255, 255, 255, 1)", fill = true, width = 1)
    {
        if(!Renderer.UIOut(position, size, scale))
        {
            Renderer.calls.push(
                new RectangleDrawCall(
                    true,
                    size,
                    position,
                    scale, 
                    rotation,
                    layer,
                    color,
                    fill,
                    width
                )
            );
        }
    }

    static Line(points = [], color = "rgba(255, 255, 255, 1)", width = 1, loop = false, layer = 0)
    {
        Renderer.calls.push(
            new LineDrawCall(
                false,
                layer,
                points,
                color, 
                width,
                loop
            )
        );
    }

    static UILine(points = [], color = "rgba(255, 255, 255, 1)", width = 1, loop = false, layer = 0)
    {
        Renderer.calls.push(
            new LineDrawCall(
                true,
                layer,
                points,
                color, 
                width,
                loop
            )
        );
    }
    
    static Circle()
    {
        
    }

    static Text(text = "Text", font = "16px Arial", color = "white", position = {x: 0, y: 0}, layer = 0)
    {
        if(!Renderer.Out(position))
        {
            Renderer.calls.push(
                new TextDrawCall(
                    false,
                    text,
                    font,
                    color,
                    position,
                    layer
                )
            );
        }
    }

    static UIText(rectTransform = null, text = "Text", font = "16px Arial", color = "white", offset = {x:0, y:0})
    {
        if(!Renderer.UIOut(rectTransform.position + offset))
        {
            Renderer.calls.push(
                new TextDrawCall(
                    true,
                    text,
                    font,
                    color,
                    {x: rectTransform.position.x + offset.x, y: rectTransform.position.y + offset.y},
                    rectTransform.layer
                )
            );
        }
    }

    static Image(sprite, coordinate, area, rectTransform)
    {
        if(!Renderer.UIOut(rectTransform.position, rectTransform.size, rectTransform.scale))
        {
            Renderer.calls.push(
                new ImageDrawCall(
                    sprite,
                    coordinate,
                    area, 
                    rectTransform
                )
            );
        }
    }
}

class ImageDrawCall
{
    constructor(sprite, coordinate, area, rectTransform)
    {
        this.sprite = sprite;
        this.coordinate = coordinate;
        this.area = area;
        this.rectTransform = rectTransform;
        this.layer = this.rectTransform.layer + 100;
    }

    Draw()
    {
        var pos = this.rectTransform.position;
        var size = this.rectTransform.size;

        ctx.save();
        ctx.translate(this.rectTransform.position.x, this.rectTransform.position.y);
        ctx.scale(this.rectTransform.scale.x, this.rectTransform.scale.y);
        ctx.rotate(this.rectTransform.rotation * Math.PI / 180);

        ctx.drawImage
        (
            this.sprite,
            this.coordinate.x,
            this.coordinate.y,
            this.area.x,
            this.area.y,

            -size.x/2,
            -size.y/2,
            size.x,
            size.y
        );

        ctx.restore();
    }
}

class SpriteDrawCall
{
    constructor(sprite, coordinate, area, transform)
    {
        this.sprite = sprite;
        this.coordinate = coordinate;
        this.area = area;
        this.transform = transform;
        this.layer = this.transform.layer;
    }

    Draw()
    {
        ctx.save();

        var point = 
        {
            x: (this.transform.position.x - camera.gameObject.Transform.position.x),
            y: (this.transform.position.y - camera.gameObject.Transform.position.y)
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
    constructor(ui = false, size = {x: 0, y: 0}, position = {x: 0, y: 0}, scale = {x: 1, y: 1}, rotation = 0, layer = 0, color = "rgba(255, 255, 255, 1)", fill = true, width = 1)
    {
        this.size = size;
        this.color = color;
        this.position = position; 
        this.scale = scale;
        this.layer = layer;
        this.rotation = rotation;
        this.fill = fill;
        this.width = width;

        this.ui = ui;
        if(this.ui) this.layer += 100;
    }

    Draw()
    {
        var point = this.position;
        if(!this.ui)
        {
            point = 
            {
                x: (this.position.x - camera.gameObject.Transform.position.x),
                y: (this.position.y - camera.gameObject.Transform.position.y)
            }
        }

        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation * Math.PI / 180);

        if(this.fill)
        {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(
                -this.size.x/2,
                -this.size.y/2,
                this.size.x,
                this.size.y
            );
        }
        else
        {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.rect(
                -this.size.x/2,
                -this.size.y/2,
                this.size.x,
                this.size.y
            );
            ctx.stroke();
        }
        ctx.restore();
    }
}

class TextDrawCall
{
    constructor(
        ui = false,
        text = "Text", 
        font = "16px Arial", 
        color = "white", 
        position = {x: 0, y: 0}, 
        layer = 0)
    {
        this.text = text;
        this.font = font;
        this.color = color;
        this.layer = layer;
        this.position = position;
        this.ui = ui;
        if(this.ui) this.layer += 100;
    }

    Draw()
    {
        var point = this.position;
        if(!this.ui)
        {
            point = 
            {
                x: (this.position.x - camera.gameObject.Transform.position.x),
                y: (this.position.y - camera.gameObject.Transform.position.y)
            }
        }

        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.textAlign = "center"; 
        ctx.justify = "center"; 
        ctx.textBaseline = 'middle'; 
        ctx.fillText(this.text, point.x, point.y);
    }
}

class LineDrawCall
{
    constructor(ui = false, layer = 0, points = [], color = "rgba(255, 255, 255, 1)", width = 1, loop = false)
    {
        this.loop = loop;
        this.points = points;
        this.ui = ui;
        this.color = color;
        this.width = width;
        this.layer = layer;
        if(this.ui) this.layer += 100;
    }

    Draw()
    {
        if(this.points.length == 0) return;

        if(!this.ui)
        {
            for(var i = 0; i < this.points.length; i++)
            {
                this.points[i] = new Vector2(
                    this.points[i].x - camera.gameObject.Transform.position.x,
                    this.points[i].y - camera.gameObject.Transform.position.y
                );
            }
        }

        // BEGIN
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.moveTo(
            this.points[0].x,
            this.points[0].y
        );
        // PATH
        for(var i = 1; i < this.points.length; i++)
        {
            ctx.lineTo(
                this.points[i].x,
                this.points[i].y 
            );
        }
        // END
        if(this.loop)
        {
            ctx.lineTo(
                this.points[0].x,
                this.points[0].y
            );
        }

        // DRAW
        ctx.stroke();
    }
}