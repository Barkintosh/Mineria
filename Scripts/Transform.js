class Transform
{
    constructor(gameObject = undefined, pos = {x:0, y:0}, scale = {x:1, y:1}, rotation = 0, parent = undefined, layer = 0)
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
        this.localScale = {
            x:scale.x,
            y:scale.y
        };

        this.rotation = rotation;
        this.localRotation = 0;
        this.name = "GameObject";
        this.debug = debug;
        this.layer = layer;
        this.gameObject = gameObject;
        this.children = [];

        if(this.gameObject.RectTransform != undefined)
            this.gameObject.RemoveComponent(this.gameObject.RectTransform);
    }

    Update()
    {
        if(this.parent != undefined)
        {
            /*
            var rad = ToRadian(this.parent.rotation + this.localRotation);
            var distance = this.localPosition.x + this.localPosition.y;
            this.position.x = this.parent.position.x + Math.cos(rad) * distance;
            this.position.y = this.parent.position.y + Math.sin(rad) * distance;
            this.rotation = this.localRotation + this.parent.rotation;
            */
           this.position.x = this.parent.position.x + this.localPosition.x;
           this.position.y = this.parent.position.y + this.localPosition.y;

           this.scale.x = this.localScale.x * this.parent.scale.x;
           this.scale.y = this.localScale.y * this.parent.scale.y;
        }
        if(this.debug) this.Draw();
    }

    AddChild(child)
    {
        this.children[this.children.length] = child;
    }

    RemoveChild(child)
    {
        for(let i = 0; i < this.children.length; i++)
        {
            if(this.children[i] == child) this.children.splice(i, 1);
        }
    }

    SetParent(parent)
    {
        this.parent = parent;
        this.parent.AddChild(this);
        this.localPosition =
        {
            x: this.position.x - this.parent.position.x,
            y: this.position.y - this.parent.position.y
        }

        var pIndex = GetObjectIndex(this.parent.gameObject);
        var mIndex = GetObjectIndex(this.gameObject);
        if(pIndex != -1 && mIndex != -1)
        {
            scene.move(mIndex, pIndex + 1);
        }
    }

    UnParent()
    {
        this.parent.RemoveChild(this);
        this.parent = undefined;
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

    Draw()
    {
        Render.Rectangle({x: 5, y:5}, this.position, {x:1,y:1}, 0, 1000, "grey", false, 1);
        Render.Text(this.gameObject.name, "16px Roboto", "grey", {x: this.position.x, y: this.position.y - 15}, 1000);
        Render.Text(Math.floor(this.position.x) + " | " + Math.floor(this.position.y), "12px Roboto", "grey", {x: this.position.x, y: this.position.y + 16}, 1000);
    }
}