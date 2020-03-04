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
            return a.layer - b.layer;
        });

        this.drawCalls.forEach(function(element)
        {
            element.Draw();
        });

        this.drawCalls = [];
    }
    
    Sprite(sprite, coordinate, area, transform)
    {
        this.drawCalls.push(
            new SpriteDrawCall(
                sprite,
                coordinate,
                area, 
                transform
            )
        );
    }
    
    Rectangle(size, position = {x: 0, y: 0}, scale = {x: 1, y: 1}, rotation = 0, layer = 0, color = "rgba(255, 255, 255, 1)", fill = true, width = 1)
    {
        this.drawCalls.push(
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

    UIRectangle(size = {x: 0, y: 0}, position = {x: 0, y: 0}, scale = {x: 1, y: 1}, rotation = 0, layer = 0, color = "rgba(255, 255, 255, 1)", fill = true, width = 1)
    {
        this.drawCalls.push(
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
    
    Circle()
    {
        
    }

    Text(text = "Text", font = "16px Arial", color = "white", position = {x: 0, y: 0}, layer = 0)
    {
        this.drawCalls.push(
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

    UIText(rectTransform = null, text = "Text", font = "16px Arial", color = "white", offset = {x:0, y:0})
    {
        this.drawCalls.push(
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

    Image(sprite, coordinate, area, rectTransform)
    {
        this.drawCalls.push(
            new ImageDrawCall(
                sprite,
                coordinate,
                area, 
                rectTransform
            )
        );
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
                x: (this.position.x - camera.Transform.position.x),
                y: (this.position.y - camera.Transform.position.y)
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
                x: (this.position.x - camera.Transform.position.x),
                y: (this.position.y - camera.Transform.position.y)
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