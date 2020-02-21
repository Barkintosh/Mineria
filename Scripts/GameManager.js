class GameManager extends GameObject
{
    constructor()
    {
        super();

        this.player = Instantiate("Player");

        for(var i = 0; i < 15; i++)
        {
            Instantiate("Gate", {x: 300 + i * 300, y: GetRandomInt(-200, 200) });
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
        camera.MoveTo(this.player.Transform.position.x + canvas.width / 3, 0);
    }
}

class Player extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new Bird(this));
        this.AddComponent(new Rigidbody(this, 0.15));
        this.AddComponent(new SpriteRenderer(this, flappySprite, {x:0, y:0}, {x:17, y:12}));
        this.AddComponent(new BoxCollider(this, false, {x:15, y:10}));
        this.Transform.position = {x: 0, y: 0};
        this.Transform.scale = {x: 5, y: 5};
        this.Transform.name = "Bird";
        this.name = "Bird";
        this.Transform.layer = 1;
    }
}

class Bird
{
    constructor(gameObject)
    {
        this.gameObject = gameObject;
    }

    Update()
    {
        if(mouseDown)
        {
            this.gameObject.Rigidbody.velocity = {x:0, y: 0};
            this.gameObject.Rigidbody.AddForce({x:2, y: -5});
        }
        if(this.gameObject.Rigidbody.velocity.x != 0 && this.gameObject.Rigidbody.velocity.y != 0)
           this.gameObject.Transform.rotation = -Math.atan2(this.gameObject.Rigidbody.velocity.x, this.gameObject.Rigidbody.velocity.y) * 180/Math.PI + 90;
    }
 
    OnCollision(other)
    {
        console.log("OnCollision");
        if(other.gameObject.Transform.name == "Pipe")
        {
            console.log("DEAD");
            Destroy(this.gameObject);
        }
    }
}

class Gate extends GameObject
{
    constructor()
    {
        super();
        this.hole = 250;
        this.Transform.name = "Gate";
        this.name = "Gate";
    }

    Start()
    {
        var up = Instantiate("Pipe", {x: this.Transform.position.x, y: this.Transform.position.y - this.hole/2});
        up.reversed = true;
        up.Load();

        var down = Instantiate("Pipe", {x: this.Transform.position.x, y: this.Transform.position.y + this.hole/2});
        down.reversed = false;
        down.Load();
    }
}

class Pipe extends GameObject
{
    constructor()
    {
        super();
        this.partSize = 8;
        this.tubeSize = 15;
        this.scale = 5;
        this.Transform.name = "Pipe";
        this.name = "Pipe";
    }

    Load()
    {
        var up = Instantiate("GameObject")
        up.AddComponent(new SpriteRenderer(up, flappySprite, {x:18, y:0}, {x:25, y:8}));
        up.Transform.name = "Up";
        up.name = "Up";
        up.Transform.scale = {x: this.scale, y: this.scale};

        var direction = 1;
        if(this.reversed) direction = -1;

        this.AddComponent(new BoxCollider(this, false, {x:100, y:this.partSize * this.scale * (this.tubeSize + 1)}, {x: 0, y: 0.5 * direction * this.partSize * this.scale * (this.tubeSize + 1)}));

        up.Transform.position = {x: this.Transform.position.x, y: this.Transform.position.y + direction * this.partSize/2 * this.scale};

        for(var i = 1; i < this.tubeSize; i++)
        {
            var part = Instantiate("GameObject");
            part.AddComponent(new SpriteRenderer(part, flappySprite, {x:20, y:9}, {x:21, y:8}));
            part.Transform.name = "Part";
            part.name = "Gate";
            part.Transform.scale = {x: this.scale, y: this.scale};
            part.Transform.position = {x: up.Transform.position.x, y: up.Transform.position.y + direction * (this.partSize * i * part.Transform.scale.y)};
        }
    }
}