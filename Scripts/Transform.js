class Transform
{
    constructor(pos = {x:0, y:0}, size = {x:1, y:1}, rotation = 0, parent = undefined)
    {
        this.position = {
            x:pos.x,
            y:pos.y
        };

        this.localPosition =
        {
            x: 0,
            y: 0
        }

        this.parent = parent;
        if(parent != undefined) SetParent(parent);

        this.size = {
            x:size.x,
            y:size.y
        };

        this.rotation = rotation;
        this.localRotation = 0;

        this.name = "GameObject";

        this.debug = debug;
    }

    Update()
    {
        if(this.parent != undefined)
        {
            var rad = ToRadian(this.parent.rotation + this.localRotation);
            var distance = this.localPosition.x + this.localPosition.y;
            this.position.x = this.parent.position.x + Math.cos(rad) * distance;
            this.position.y = this.parent.position.y + Math.sin(rad) * distance;
            this.rotation = this.localRotation + this.parent.rotation;
        }
        if(this.debug) this.Draw();
    }

    SetParent(parent)
    {
        this.parent = parent;
        this.localPosition =
        {
            x: this.position.x - this.parent.position.x,
            y: this.position.y - this.parent.position.y
        }
    }

    Reset()
    {
        this.position = {x:0, y:0};
        this.localPosition = {x:0, y:0};
        this.size = {x:1 ,y:1};
    }

    ToggleDebug()
    {
        this.debug = !this.debug;
    }

    Draw(color = "white", width = 1)
    {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;

        ctx.beginPath();
        ctx.moveTo(
            this.position.x - camera.transform.position.x,
            this.position.y - camera.transform.position.y - 5
        );

        ctx.lineTo(
            this.position.x - camera.transform.position.x,
            this.position.y - camera.transform.position.y + 5
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(
            this.position.x - camera.transform.position.x - 5,
            this.position.y - camera.transform.position.y
        );

        ctx.lineTo(
            this.position.x - camera.transform.position.x + 5,
            this.position.y - camera.transform.position.y
        );
        ctx.stroke();

        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center"; 
        ctx.justify = "center"; 
        ctx.textBaseline = 'middle'; 
        ctx.fillText(
            "{ x:" + Math.floor(this.position.x) + ",  y:" + Math.floor(this.position.y) + " }",
            this.position.x - camera.transform.position.x,
            this.position.y - camera.transform.position.y + 25 * this.size.y
        );

        ctx.fillText(
            this.name,
            this.position.x - camera.transform.position.x,
            this.position.y - camera.transform.position.y + 25 * this.size.y + 10
        );

        if(this.parent != undefined)
        {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(
                this.position.x - camera.transform.position.x,
                this.position.y - camera.transform.position.y
            );
            ctx.lineTo(
                this.parent.position.x - camera.transform.position.x,
                this.parent.position.y - camera.transform.position.y
            );
            ctx.stroke();
        }
    }
}