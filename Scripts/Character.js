class Character extends GameObject
{
    constructor()
    {
        super();
        this.baseSpeed = 100;
        this.vSpeed = 0;
        this.hSpeed = 0;
        
        this.AddComponent(new SpriteRenderer(this.Transform, characterSprite, {x:0, y:0}, 32, 32, HorizontalAlignement.MIDDLE, VerticalAlignement.MIDDLE));
        this.AddComponent(new BoxCollider(this.Transform, false, {x:32, y:32}));
        this.Transform.name = "Character";

        //this.ball = this.CreateAura();
        //console.log(this.ball);
    }

    CreateAura()
    {
        var ball = Instantiate("GameObject");
        ball.AddComponent(new SpriteRenderer(ball.Transform, ballSprite, {x:0, y:0}, 16, 16));
        ball.Transform.name = "Energy";
        ball.Transform.SetParent(this.Transform);
        return ball;
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

        this.Transform.position.x += this.hSpeed;
        this.Transform.position.y += this.vSpeed;

        this.moving = false;
    }

    Update()
    {
        super.Update();
        this.Movement();

        //this.ball.Transform.localPosition.x = Math.cos(time) * 32;
        //this.ball.Transform.localPosition.y = Math.sin(time) * 32;
    }
}