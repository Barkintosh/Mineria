const VerticalAnchor = Object.freeze({"up":1, "middle":2, "down":3});
const HorizontalAnchor = Object.freeze({"left":1, "middle":2, "right":3});

class RectTransform
{
    constructor(gameObject = undefined, pos = {x:0, y:0}, size = {x:0, y:0}, scale = {x:1, y:1}, rotation = 0, parent = undefined, layer = 0)
    {
        this.position = {
            x:pos.x,
            y:pos.y
        };

        this.vAnchor = VerticalAnchor.middle;
        this.hAnchor = HorizontalAnchor.middle;

        this.size = size;

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
        this.gameObject = gameObject;

        if(this.gameObject.Transform != undefined)
            this.gameObject.RemoveComponent(this.gameObject.Transform);

    }

    Update()
    {
        if(this.parent != undefined)
        {
           this.position.x = this.parent.position.x + this.localPosition.x;
           this.position.y = this.parent.position.y + this.localPosition.y;
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
        this.size = {x:0, y:0};
        this.position = {x:0, y:0};
        this.localPosition = {x:0, y:0};
        this.scale = {x:1 ,y:1};
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
            this.position.x,
            this.position.y - 5
        );
        ctx.lineTo(
            this.position.x,
            this.position.y + 5
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(
            this.position.x - 5,
            this.position.y
        );
        ctx.lineTo(
            this.position.x + 5,
            this.position.y
        );
        ctx.stroke();
        ctx.fillText(
            this.name,
            this.position.x,
            this.position.y + 25 * this.scale.y + 10
        );
        ctx.fillText(
            "Layer : " + this.layer,
            this.position.x,
            this.position.y + 25 * this.scale.y + 20
        );

        if(this.parent != undefined)
        {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(
                this.position.x,
                this.position.y
            );
            ctx.lineTo(
                this.parent.position.x,
                this.parent.position.y
            );
            ctx.stroke();
        }

        Render.UIText(this.gameObject.name, "32px Press Start 2P", "black", this.position, 10000);
        Render.UIText("{x:" + Math.floor(this.position.x) + ",  y:" + Math.floor(this.position.y) + "}", "10px Roboto", "black", {x: this.position.x, y: this.position.y + 16}, 10000);
    }
}