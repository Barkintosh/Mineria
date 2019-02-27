class Dummy extends GameObject
{
    constructor()
    {
        super();

        this.AddComponent(new Transform( {x:0, y:0}, {x:1, y:1} ));
        this.AddComponent(new SpriteRenderer(this.Transform, creeperSprite, {x:0, y:0}, 32, 32, HorizontalAlignement.MIDDLE, VerticalAlignement.MIDDLE));
        
        let bounds = [
            // LEFT TOP
            -16,
            -16,
            // RIGHT TOP
            16,
            -16,
            // LEFT DOWN
            16,
            16,
            // RIGHT DOWN
            -16,
            16];

        this.AddComponent(new Collider(this.Transform, bounds));
        //this.speed = GetRandomInt(-5, 5);

        //this.transform.size = {x:1, y:1};
    }

    Update()
    {
        super.Update();

        //this.transform.position.x += Math.cos(time) * this.speed;
        ///this.transform.position.y += Math.sin(time) * this.speed;


        if(this.Collider.PointInBounds(mouseX, mouseY))
        {
            Destroy(this);
        }
    }
}