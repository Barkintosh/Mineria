class Dummy extends GameObject
{
    constructor()
    {
        super();
        this.name = "Dummy";
        this.AddComponent(new Transform( {x:0, y:0}, {x:1, y:1} ));
        this.AddComponent(new SpriteRenderer(this.Transform, creeperSprite, {x:0, y:0}, 32, 32, HorizontalAlignement.MIDDLE, VerticalAlignement.MIDDLE));
        this.AddComponent(new BoxCollider(this.Transform, false, {x:32, y:32}));
        //this.speed = GetRandomInt(-5, 5);

        //this.transform.size = {x:1, y:1};
    }

    Update()
    {
        super.Update();

        //this.transform.position.x += Math.cos(time) * this.speed;
        ///this.transform.position.y += Math.sin(time) * this.speed;

/*
        if(mouseDown && this.Collider.PointInBounds(mouseX, mouseY))
        {
            Destroy(this);
        }
*/
    }
}