class GameManager extends GameObject
{
    constructor()
    {
        super();

        this.player = Instantiate("Bird");

        for(var i = 0; i < 100; i++)
        {
            Instantiate("Pipe", {x: i * 200, y: GetRandomInt(-200, 200) });
        }
    }

    Update()
    {
        ctx.beginPath();
        var grd = ctx.createLinearGradient(window.innerWidth/2, window.innerHeight, window.innerWidth/2, 0);
        grd.addColorStop(0, "#C9F6FF");
        grd.addColorStop(0.5, "#7AE5F5");
        grd.addColorStop(1, "#35D6ED");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        camera.MoveTo(this.player.Transform.position.x, 0);
    }
}

class Bird extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new Rigidbody(this, 0.5));
        this.AddComponent(new SpriteRenderer(this, flappySprite, {x:0, y:0}, {x:17, y:12}));
        this.AddComponent(new BoxCollider(this, false, {x:17, y:12}));
        this.Transform.position = {x: 0, y: 0};
        this.Transform.scale = {x: 5, y: 5};
        this.Transform.name = "Bird";
        this.Transform.layer = 1;
    }
    
    Update()
    {
        super.Update();
        if(mouseDown)
        {
            this.Rigidbody.velocity = {x:0, y: 0};
            this.Rigidbody.AddForce({x:2, y: -10});
        }
        //if(this.Rigidbody.velocity.x != 0 && this.Rigidbody.velocity.y != 0)
        //   this.Transform.rotation = -Math.atan2(this.Rigidbody.velocity.x, this.Rigidbody.velocity.y) * 180/Math.PI;
    }
}

class Pipe extends GameObject
{
    constructor()
    {
        super();
        this.Transform.name = "Pipe";
        this.Transform.layer = 1;
        this.AddComponent(new BoxCollider(this, false, {x:125, y:400}, {x: 0, y: 200}));
    }

    Start()
    {
        var up = Instantiate("GameObject");
        up.AddComponent(new SpriteRenderer(up, flappySprite, {x:18, y:0}, {x:25, y:8}));
        up.Transform.name = "Up";
        up.Transform.scale = {x: 5, y: 5};
        up.Transform.position = {x: this.Transform.position.x, y: this.Transform.position.y + 8 * up.Transform.scale.y};

        for(var i = 1; i < 10; i++)
        {
            var part = Instantiate("GameObject");
            part.AddComponent(new SpriteRenderer(part, flappySprite, {x:20, y:9}, {x:21, y:8}));
            part.Transform.name = "Part";
            part.Transform.scale = {x: 5, y: 5};
            part.Transform.position = {x: up.Transform.position.x, y: up.Transform.position.y + (8 * i * part.Transform.scale.y)};
        }
    }
}