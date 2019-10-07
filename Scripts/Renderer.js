class Renderer
{
    constructor()
    {
        this.calls = [];
    }

    Update()
    {
    
    }
    
    Image(sprite, coordinate, area, position, size, rotation, scale)
    {
        ctx.save();
        var rad = rotation * Math.PI / 180;
        ctx.translate(position.x, position.y);
        ctx.scale(scale.x, scale.y);
        ctx.rotate(rad);

        ctx.drawImage
        (
            sprite,
            coordinate.x,
            coordinate.y,
            area.x,
            area.x,

            -size.w/2,
            -size.h/2,
            size.w,
            size.h
        );

        ctx.restore();
    }
    
    Rectangle(position, size, rotation, scale, color)
    {
        ctx.save();
        var rad = rotation * Math.PI / 180;
        ctx.translate(position.x, position.y);
        ctx.scale(scale.x, scale.y);
        ctx.rotate(rad);

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(
            -size.w/2,
            -size.h/2,
            size.w,
            size.h
        );

        ctx.restore();
    }
    
    Circle()
    {
        
    }
}