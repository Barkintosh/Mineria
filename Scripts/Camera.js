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
        this.zoom = 1;
        this.target = undefined;
        this.occlusion = 0;
        this.position = this.gameObject.Transform.position;
    }

    FocusOn(transformTarget)
    {
        this.target = transformTarget;
    }

    MoveTo(posX, posY)
    {
        this.gameObject.Transform.position.x = posX - canvas.width/2;
        this.gameObject.Transform.position.y = posY - canvas.height/2;
    }

    Update()
    {
        this.position = this.gameObject.Transform.position;
        if(this.target != undefined) this.MoveTo(this.target.position.x, this.target.position.y);
    }

    ScreenToWorldPoint(mousePosition)
    {
        return {x:mousePosition.x + this.gameObject.Transform.position.x, y: mousePosition.y + this.gameObject.Transform.position.y};
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