class Controller
{
    constructor(gameObject)
    {
        this.baseSpeed = 100;
        this.vSpeed = 0;
        this.hSpeed = 0;
        this.gameObject = gameObject;
    }

    CreateArrow()
    {
        var arrow = Instantiate("GameObject");
        arrow.AddComponent(new SpriteRenderer(arrow, arrowSprite, {x:0, y:0}, 8, 23));
        arrow.AddComponent(new BoxCollider(arrow, false, {x:8, y:8}));
        arrow.AddComponent(new Rigidbody(arrow));
        arrow.AddComponent(new Flipbook(arrow.SpriteRenderer, arrowSprite, 4, {x:0, y:0}, {x:8, y:23}, 1));
        arrow.AddComponent(new Arrow(arrow));

        arrow.Transform.size = {x: 2, y: 2};

        arrow.Transform.position.x = this.gameObject.Transform.position.x;
        arrow.Transform.position.y = this.gameObject.Transform.position.y;

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
        this.gameObject.Transform.position.x += this.hSpeed;
        this.gameObject.Transform.position.y += this.vSpeed;
        this.moving = false;
    }

    Update()
    {
        this.Movement();
        if(mouseDown)
        {
            var a = this.CreateArrow();
            var mouseScreenPosition = camera.ScreenToWorldPoint({x: mouseX, y: mouseY});
            a.Rigidbody.AddForce({x:(mouseScreenPosition.x - this.gameObject.Transform.position.x) * 0.1, y:(mouseScreenPosition.y - this.gameObject.Transform.position.y)*0.1});
        }
    }
}

class Arrow
{
    constructor(gameObject)
    {
        this.gameObject = gameObject;
    }

    Update()
    {
        if(this.gameObject.Transform.position.y > 300) Destroy(this.gameObject);

        if(this.gameObject.Rigidbody.velocity.x != 0 && this.gameObject.Rigidbody.velocity.y != 0)
            this.gameObject.Transform.rotation = -Math.atan2(this.gameObject.Rigidbody.velocity.x, this.gameObject.Rigidbody.velocity.y) * 180/Math.PI;
    }

    OnCollision(other)
    {
        if(other.gameObject.Controller === undefined && other.gameObject.Arrow === undefined)
        {
            this.gameObject.Transform.SetParent(other.gameObject.Transform)
            this.gameObject.Rigidbody.velocity = {x: 0, y: 0};
            this.gameObject.Rigidbody.gravityScale = 0;
            this.gameObject.Flipbook.speed = 0;
        }
    }
}