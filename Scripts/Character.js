class Character extends GameObject
{
    constructor()
    {
        super();
        this.baseSpeed = 100;
        this.vSpeed = 0;
        this.hSpeed = 0;
        
        this.AddComponent(new SpriteRenderer(this.Transform, minecraftBlocksSprite, {x:32, y:48}, 16, 16));
        this.AddComponent(new BoxCollider(this.Transform, false, {x:16, y:16}));
        this.Transform.size = {x: 1, y: 1};
        this.Transform.name = "Character";

        //this.ball = this.CreateAura();
        //this.ball.Transform.localPosition.x += 25;
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

    CreateArrow()
    {
        var arrow = Instantiate("GameObject");
        arrow.AddComponent(new SpriteRenderer(arrow.Transform, arrowSprite, {x:0, y:0}, 8, 23));
        arrow.AddComponent(new BoxCollider(arrow.Transform, false, {x:16, y:16}));
        arrow.AddComponent(new Rigidbody(arrow.Transform));
        arrow.AddComponent(new Animator(arrow.SpriteRenderer, arrowSprite, 4, {x:0, y:0}, {x:8, y:23}, 1));

        arrow.Transform.size = {x: 2, y: 2};

        arrow.Transform.position.x = this.Transform.position.x;
        arrow.Transform.position.y = this.Transform.position.y;

        arrow.Transform.name = "Arrow";
        return arrow;
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

        //this.Transform.rotation += 10;

        this.moving = false;
    }

    Update()
    {
        super.Update();
        this.Movement();

        if(mouseDown)
        {
            var a = this.CreateArrow();
            var mouseScreenPosition = camera.ScreenToWorldPoint({x: mouseX, y: mouseY});
            var dir = {x:(mouseScreenPosition.x - this.Transform.position.x) * 0.1, y:(mouseScreenPosition.y - this.Transform.position.y)*0.1};
            a.Rigidbody.AddForce(dir);
        }
    }
}