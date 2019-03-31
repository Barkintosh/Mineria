class Character extends GameObject
{
    constructor()
    {
        super();
        this.baseSpeed = 100;
        this.vSpeed = 0;
        this.hSpeed = 0;
        
        this.AddComponent(new SpriteRenderer(this.Transform, minecraftBlocksSprite, {x:32, y:48}, 16, 16));
        this.AddComponent(new BoxCollider(this.Transform, false, {x:32, y:32}));
        this.Transform.size = {x: 3, y: 3};
        this.Transform.name = "Character";

        //this.ball = this.CreateAura();
    }

    CreateAura()
    {
        var ball = Instantiate("GameObject");
        ball.AddComponent(new SpriteRenderer(ball.Transform, ballSprite, {x:0, y:0}, 16, 16));
        ball.AddComponent(new BoxCollider(ball.Transform, false, {x:16, y:16}));
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

        //this.Transform.rotation += 1;

        this.moving = false;
    }

    Update()
    {
        super.Update();
        this.Movement();

        /*
        this.ball.Transform.localPosition.x = Math.cos(time) * 48;
        this.ball.Transform.localPosition.y = Math.sin(time) * 48;

        console.log(this.Transform.localPosition);
        */
    }
}