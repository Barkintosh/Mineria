class CameraObject extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new Camera(this));
        this.name = "CAMERA";
    }
}

class Camera
{
    constructor(gameObject)
    {
        this.gameObject = gameObject;
        this.target = undefined;
        this.occlusion = 0;
        this.lerp = 0.15;
        this.position = this.gameObject.Transform.position;
    }

    Focus(transform)
    {
        this.target = transform;
    }

    Update()
    {
        this.Calculate();
        this.Apply();
    }

    Calculate()
    {
        if(this.target != undefined) this.position = this.target.position;
    }

    Apply()
    {
        this.gameObject.Transform.position.x = lerp(this.gameObject.Transform.position.x, this.position.x - canvas.width/2, this.lerp);
        this.gameObject.Transform.position.y = lerp(this.gameObject.Transform.position.y, this.position.y - canvas.height/2, this.lerp);
    }

    Teleport()
    {
        this.gameObject.Transform.position.x = this.position.x - canvas.width/2;
        this.gameObject.Transform.position.y = this.position.y - canvas.height/2;
    }

    ScreenToWorldPoint(position)
    {
        return new Vector2(position.x + this.gameObject.Transform.position.x, position.y + this.gameObject.Transform.position.y);
    }

    Bounds()
    {
        return {
            upLeft: 
            {
                x: this.gameObject.Transform.position.x + this.occlusion,
                y: this.gameObject.Transform.position.y + this.occlusion
            },
            upRight: 
            {
                x: this.gameObject.Transform.position.x + canvas.width - this.occlusion,
                y: this.gameObject.Transform.position.y + this.occlusion
            },
            downLeft: 
            {
                x: this.gameObject.Transform.position.x + this.occlusion,
                y: this.gameObject.Transform.position.y + canvas.height - this.occlusion
            },
            downRight: 
            {
                x: this.gameObject.Transform.position.x + canvas.width - this.occlusion,
                y: this.gameObject.Transform.position.y + canvas.height - this.occlusion
            }
        };
    }

    CanvasBounds()
    {
        return {
            upLeft: 
            {
                x: 0 + this.occlusion,
                y: 0 - this.occlusion
            },
            upRight: 
            {
                x: canvas.width - this.occlusion,
                y: 0 - this.occlusion
            },
            downLeft: 
            {
                x: 0 + this.occlusion,
                y: canvas.height + this.occlusion
            },
            downRight: 
            {
                x: canvas.width - this.occlusion,
                y: canvas.height + this.occlusion
            }
        };
    }
}