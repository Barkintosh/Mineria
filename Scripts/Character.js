class Character extends GameObject
{
    constructor()
    {
        super();

        this.baseSpeed = 250;
        this.vSpeed = 0;
        this.hSpeed = 0;
        this.moving = false;
        this.falling = false;
        
        this.AddComponent(new Transform( {x:0, y:0}, {x:1, y:1} ));

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

        this.AddComponent(new Collider(this.Transform, bounds));
        this.AddComponent(new SpriteRenderer(this.Transform, characterSprite, {x:0, y:0}, 32, 32, HorizontalAlignement.MIDDLE, VerticalAlignement.DOWN));
    }

    Movement()
    {
        if(leftArrow || rightArrow) this.moving = true;

        if(this.moving)
        {
            if(leftArrow)
            {
                this.vSpeed = lerp(this.vSpeed, -this.baseSpeed/delta, 0.5);
            }
            else
            {
                this.vSpeed = lerp(this.vSpeed, this.baseSpeed/delta, 0.5);
            }
        }
        else this.vSpeed = lerp(this.vSpeed, 0, 0.5); 
        this.Transform.position.x += this.vSpeed;
        this.moving = false;
    }

    Update()
    {
        super.Update();
        this.Movement();
    }
}