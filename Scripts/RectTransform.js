const VerticalAnchor = {"up":1, "middle":2, "down":3};
const HorizontalAnchor = {"left":1, "middle":2, "right":3};

class RectTransform
{
    constructor(gameObject = undefined, pos = {x:0, y:0}, size = {x:0, y:0}, scale = {x:1, y:1}, rotation = 0, parent = undefined, layer = 0)
    {
        this.position = {
            x:pos.x,
            y:pos.y
        };
        this.localPosition =
        {
            x:pos.x,
            y:pos.y
        }
        this.scale = {
            x:scale.x,
            y:scale.y
        };

        this.vAnchor = VerticalAnchor.middle;
        this.hAnchor = HorizontalAnchor.middle;
        this.size = size;
        this.parent = parent;
        if(parent != undefined) SetParent(parent);
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

        this.ApplyAnchor();
    }

    ApplyAnchor()
    {
        switch(this.vAnchor)
        {
            case VerticalAnchor.up:
                break;
            case VerticalAnchor.middle:
                this.position.y = this.localPosition.y + canvas.clientHeight/2;
                break;
            case VerticalAnchor.down:
                this.position.y = this.localPosition.y + canvas.clientHeight;
                break;
        }

        switch(this.hAnchor)
        {
            case HorizontalAnchor.left:
                break;
            case HorizontalAnchor.middle:
                this.position.x = this.localPosition.x + canvas.clientWidth/2;
                break;
            case HorizontalAnchor.right:
                this.position.x = this.localPosition.x + canvas.clientWidth;
                break;
        }
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

    Draw()
    {
        Render.UIRectangle({x: 5, y:5}, this.position, {x:1,y:1}, 0, 0, "blue", false, 1);
        Render.UIText(this, this.gameObject.name, "16px Roboto", "blue", {x:0,y:-15});
        Render.UIText(this, Math.floor(this.position.x) + " | " + Math.floor(this.position.y), "12px Roboto", "blue", {x:0,y:15});
    }
}