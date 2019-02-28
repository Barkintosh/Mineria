class Transform
{
    constructor(pos = {x:0, y:0}, size = {x:1, y:1}, rotation = 0, parent = undefined)
    {
        this.position = {
            x:pos.x,
            y:pos.y
        };
        this.size = {
            x:size.x,
            y:size.y
        };
        this.rotation = rotation;
        this.parent = parent;
        this.shown = false;
    }

    Update()
    {
        if(this.shown) this.Draw();
    }

    ToggleShown()
    {
        this.shown = !this.shown;
    }

    Draw(color = "white", width = 1)
    {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;

        ctx.beginPath();
        ctx.moveTo(
            this.position.x - camera.transform.position.x,
            this.position.y - camera.transform.position.y - 10
        );

        ctx.lineTo(
            this.position.x - camera.transform.position.x,
            this.position.y - camera.transform.position.y + 10
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(
            this.position.x - camera.transform.position.x - 10,
            this.position.y - camera.transform.position.y
        );

        ctx.lineTo(
            this.position.x - camera.transform.position.x + 10,
            this.position.y - camera.transform.position.y
        );
        ctx.stroke();

        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center"; 
        ctx.justify = "center"; 
        ctx.textBaseline = 'middle'; 
        ctx.fillText(
            "{ x:" + Math.floor(this.position.x) + ", y:" + Math.floor(this.position.y) + " }",
            this.position.x - camera.transform.position.x,
            this.position.y - camera.transform.position.y + 25
        );
    }
}