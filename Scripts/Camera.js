class Camera extends GameObject
{
    constructor()
    {
        super();

        this.transform = new Transform( {x:0, y:0}, {x:1, y:1} );
        this.zoom = 1;
        this.target = undefined;
    }

    FocusOn(transformTarget)
    {
        this.target = transformTarget;
    }

    MoveTo(posX, posY)
    {
        this.transform.position.x = posX - canvas.width/2;
        this.transform.position.y = posY - canvas.height/2;
    }

    Update()
    {
        if(this.target != undefined)
        {
            this.MoveTo(this.target.position.x, this.target.position.y);
        }
    }
}