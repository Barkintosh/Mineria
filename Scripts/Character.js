class Character extends GameObject
{
    constructor()
    {
        super();
        this.baseSpeed = 100;
        this.vSpeed = 0;
        this.hSpeed = 0;
        
        this.AddComponent(new Transform( {x:0, y:0}, {x:1, y:1} ));
        this.AddComponent(new SpriteRenderer(this.Transform, characterSprite, {x:0, y:0}, 32, 32, HorizontalAlignement.MIDDLE, VerticalAlignement.MIDDLE));
        this.AddComponent(new BoxCollider(this.Transform, false, {x:32, y:32}, {x:0, y:0}));

        this.Transform.name = "Character";
    }

    Movement()
    {
        if(upArrow)
        {
            this.vSpeed = lerp(this.vSpeed, -this.baseSpeed/delta, 0.5);
        }
        else if(downArrow)
        {
            this.vSpeed = lerp(this.vSpeed, this.baseSpeed/delta, 0.5);
        }
        else
        {
            this.vSpeed = lerp(this.vSpeed, 0, 0.5);
        }
        
        if(leftArrow)
        {
            this.hSpeed = lerp(this.hSpeed, -this.baseSpeed/delta, 0.5);
        }
        else if(rightArrow)
        {
            this.hSpeed = lerp(this.hSpeed, this.baseSpeed/delta, 0.5);
        }
        else 
        {
            this.hSpeed = lerp(this.hSpeed, 0, 0.5);
        }

        this.Transform.localPosition.x += this.hSpeed;
        this.Transform.localPosition.y += this.vSpeed;

        this.moving = false;
    }

    Update()
    {
        super.Update();
        this.Movement();
    }
}