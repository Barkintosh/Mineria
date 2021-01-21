class Transform extends Component
{
    constructor(gameObject = undefined, pos = new Vector2(), scale = new Vector2(1, 1), rotation = 0, parent = undefined, layer = 0)
    {
        super();
        this.position = pos;
        this.localPosition = new Vector2(0, 0);

        this.parent = parent;
        if(parent != undefined) SetParent(parent);

        this.scale = scale;
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

    Right()
    {
        return new Vector2(Math.sin((this.rotation + 90) * (Math.PI/180)), -Math.cos((this.rotation + 90) * (Math.PI/180))).Normalized();
    }

    Update()
    {
        super.Update();
        if(this.parent != undefined)
        {
            
            this.scale = this.parent.scale.MultiplyWith(this.localScale);
            this.rotation = this.parent.rotation + this.localRotation;
            this.position = this.parent.position.Plus(
                new Vector2(
                    this.Up().x * this.localPosition.y + this.Right().y * this.localPosition.x,
                    this.Up().y * this.localPosition.x + this.Right().x * -this.localPosition.y
                )
            );
        }
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

    Exhibit()
    {
        Renderer.Rectangle({x: 2, y:2}, this.position, {x:1,y:1}, 0, 1000, "blue", false, 1);
        Renderer.Text(this.gameObject.name, "16px Roboto", "white", {x: this.position.x, y: this.position.y + 15}, 1000);
        Renderer.Text(Math.floor(this.position.x) + " | " + Math.floor(this.position.y), "12px Roboto", "white", {x: this.position.x, y: this.position.y + 30}, 1000);
        var a = [];
        a[a.length] = this.position;
        a[a.length] = this.position.Plus(this.Up().MultiplyBy(25));
        Renderer.Line(a, "red", 1, false, 100);

        a = [];
        a[a.length] = this.position;
        a[a.length] = this.position.Plus(this.Right().MultiplyBy(25));
        Renderer.Line(a, "yellow", 1, false, 100);
    }
}