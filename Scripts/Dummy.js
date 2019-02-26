class Dummy extends GameObject
{
    constructor()
    {
        super();

        this.transform = new Transform( {x:0, y:0}, {x:1, y:1} );       
        this.AddComponent(new SpriteRenderer(this.transform, creeperSprite, {x:0, y:0}, 32, 32, HorizontalAlignement.MIDDLE, VerticalAlignement.DOWN));
        
        let bounds = [
            // LEFT TOP
            -scale/2,
            -scale,
            // RIGHT TOP
            scale/2,
            -scale,
            // LEFT DOWN
            scale/2,
            0,
            // RIGHT DOWN
            -scale/2,
            0];

        this.AddComponent(new Collider(this.transform, bounds));

        this.speed = GetRandomInt(-10, 10);
    }

    Update()
    {
        super.Update();

        this.transform.position.x += Math.cos(time) * this.speed;
        this.transform.position.y += Math.sin(time) * this.speed;
    }
}