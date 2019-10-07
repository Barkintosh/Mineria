class Renderer
{
    constructor()
    {
        //this.calls = [];
    }

    Update()
    {
    
    }
    
    Image()
    {
    
    }
    
    Rectangle(position, size, rotation, color)
    {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(
            position.x - size.w/2,
            position.y - size.h/2,
            size.w,
            size.h
        );
    }
    
    Circle()
    {
        
    }
}