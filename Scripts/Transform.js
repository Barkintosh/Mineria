class Transform
{
    constructor(gameObject = undefined, pos = new Vector2(), scale = new Vector2(), rotation = 0, parent = undefined, layer = 0)
    {
        this.position = new Vector2(pos.x, pos.y);
        this.localPosition = new Vector2(0, 0);

        this.parent = parent;
        if(parent != undefined) SetParent(parent);

        this.scale = new Vector2(scale.x, scale.y);
        this.localScale = new Vector2(1, 1);

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

    Up()
    {
        return new Vector2(Math.sin(this.rotation * (Math.PI/180)), -Math.cos(this.rotation * (Math.PI/180))).Normalized();
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
           this.position = this.position.AddWith(this.localPosition);
           this.scale = this.scale.MultiplyWith(this.localScale);
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
        this.localPosition = new Vector2(this.position.x - this.parent.position.x, this.position.y - this.parent.position.y);

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
        this.position = Vector2.zero;
        this.localPosition = Vector2.zero;
        this.size = Vector2.one;
    }

    ToggleDebug()
    {
        this.debug = !this.debug;
    }

    Draw()
    {
        Renderer.Rectangle({x: 5, y:5}, this.position, {x:1,y:1}, 0, 1000, "grey", false, 1);
        Renderer.Text(this.gameObject.name, "16px Roboto", "grey", {x: this.position.x, y: this.position.y - 15}, 1000);
        Renderer.Text(Math.floor(this.position.x) + " | " + Math.floor(this.position.y), "12px Roboto", "grey", {x: this.position.x, y: this.position.y + 16}, 1000);
    }
}