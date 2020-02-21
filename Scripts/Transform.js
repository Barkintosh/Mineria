class Transform
{
    constructor(pos = {x:0, y:0}, scale = {x:1, y:1}, rotation = 0, parent = undefined, layer = 0)
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

        this.scale = {
            x:scale.x,
            y:scale.y
        };

        this.rotation = rotation;
        this.localRotation = 0;
        this.name = "GameObject";
        this.debug = debug;
        this.layer = layer;
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
            this.position.x - camera.Transform.position.x,
            this.position.y - camera.Transform.position.y - 5
        );
        ctx.lineTo(
            this.position.x - camera.Transform.position.x,
            this.position.y - camera.Transform.position.y + 5
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(
            this.position.x - camera.Transform.position.x - 5,
            this.position.y - camera.Transform.position.y
        );
        ctx.lineTo(
            this.position.x - camera.Transform.position.x + 5,
            this.position.y - camera.Transform.position.y
        );
        ctx.stroke();
        ctx.fillText(
            this.name,
            this.position.x - camera.Transform.position.x,
            this.position.y - camera.Transform.position.y + 25 * this.scale.y + 10
        );
        ctx.fillText(
            "Layer : " + this.layer,
            this.position.x - camera.Transform.position.x,
            this.position.y - camera.Transform.position.y + 25 * this.scale.y + 20
        );

        if(this.parent != undefined)
        {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(
                this.position.x - camera.Transform.position.x,
                this.position.y - camera.Transform.position.y
            );
            ctx.lineTo(
                this.parent.position.x - camera.Transform.position.x,
                this.parent.position.y - camera.Transform.position.y
            );
            ctx.stroke();
        }

        Render.Text(this.name, "32px Press Start 2P", "black", {x: this.position.x, y: this.position.y}, 10000);
        Render.Text("{x:" + Math.floor(this.position.x) + ",  y:" + Math.floor(this.position.y) + "}", "10px Roboto", "black", {x: this.position.x, y: this.position.y + 16}, 10000);
    }
}