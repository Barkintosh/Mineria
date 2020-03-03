class GameManager extends GameObject
{
    constructor()
    {
        super();
        this.playing = false;
        this.player = Instantiate("Player");
        this.player.Bird.Freeze();
        this.player.Bird.manager = this;

        this.Background = Instantiate("Background");
        this.score = 0;

        this.offset = 0;

        for(var i = 0; i < 3; i++)
        {
            this.SpawnPipe();
        }

        this.btn = Instantiate("GameObject");
        this.btn.name = "Button";
        this.btn.AddComponent(new RectTransform(this.btn, {x: 0, y: 0}, {x:208, y:116}, {x: 2, y: 2}));
        this.btn.AddComponent(new Image(this.btn, flapSprite, {x:354, y:118}, {x:52, y:29}));
        this.btn.AddComponent(new Button(this.btn, () => {
            this.player.Bird.UnFreeze();
            Destroy(this.btn);

            this.scoreText = Instantiate("GameObject");
            this.scoreText.name = "scoreText";
            this.scoreText.AddComponent(new RectTransform(this.scoreText));
            this.scoreText.RectTransform.vAnchor = VerticalAnchor.up;
            this.scoreText.RectTransform.hAnchor = HorizontalAnchor.middle;
            this.scoreText.RectTransform.position = {x: 0, y: 200};
            this.scoreText.AddComponent(new Text(this.scoreText, "0", "Roboto", "white", 128));
        }));
    }

    SpawnPipe()
    {
        Instantiate("Gate", {x: 900 + this.offset, y: GetRandomInt(-200, 200) });
        this.offset += 400;
    }

    AddToScore()
    {
        this.score++;
        this.scoreText.Text.text = this.score;
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

class Background extends GameObject
{
    constructor()
    {
        super();

        this.offset = 0;
        this.name = "Background";
        this.Transform.scale = {x: 4, y: 4};
        
        for(var i = 0; i < 15; i++)
        {
            var city = Instantiate("GameObject");
            city.AddComponent(new SpriteRenderer(city, flapSprite, {x:0, y:0}, {x:138, y:256}));
            city.name = i;
            city.Transform.SetParent(this.Transform);
            city.Transform.localPosition = {x: 0 + i * 138 * 4, y: 0};
        }
    }

    Update()
    {
        this.Transform.position.x -= 0.5;
    }
}

class Player extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new Bird(this));
        this.AddComponent(new Rigidbody(this, 0.1));
        this.AddComponent(new SpriteRenderer(this, flappySprite, {x:0, y:0}, {x:17, y:12}));
        this.AddComponent(new BoxCollider(this, false, {x:15, y:10}));
        this.Transform.position = {x: 0, y: 0};
        this.Transform.scale = {x: 5, y: 5};
        this.Transform.name = "Bird";
        this.name = "Bird";
        this.Transform.layer = 2;
    }
}

class Bird
{
    constructor(gameObject)
    {
        this.gameObject = gameObject;
        this.freeze = false;
    }

    Freeze()
    {
        this.freeze = true;
        this.gameObject.Rigidbody.activated = false;
    }
    UnFreeze()
    {
        this.freeze = false;
        this.gameObject.Rigidbody.activated = true;
    }

    Update()
    {
        if(this.freeze) return;

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
        if(other.gameObject.Transform.name == "Pipe")
        {
            Destroy(this.gameObject);
        }
        else if(other.gameObject.name == "Gate")
        {
            this.manager.SpawnPipe();
            this.manager.AddToScore();
        }
    }

    OnTriggerEnter(other)
    {

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

        this.AddComponent(new BoxCollider(this, true, {x:100, y:this.hole}, {x: 0, y: 0}));
    }

    Start()
    {
        var up = Instantiate("Pipe", {x: this.Transform.position.x, y: this.Transform.position.y - this.hole/2});
        up.Transform.SetParent(this.Transform);
        up.reversed = true;
        up.Load();

        var down = Instantiate("Pipe", {x: this.Transform.position.x, y: this.Transform.position.y + this.hole/2});
        down.Transform.SetParent(this.Transform);
        down.reversed = false;
        down.Load();
    }
}

class Pipe extends GameObject
{
    constructor()
    {
        super();
        this.partSize = 40;
        this.tubeSize = 15;
        this.scale = 5;
        this.Transform.name = "Pipe";
        this.name = "Pipe";
    }

    Load()
    {
        var up = Instantiate("GameObject");
        up.Transform.SetParent(this.Transform);
        var offset = 0;
        this.reversed ? offset = -this.scale * 4 : offset = this.scale * 4;
        up.Transform.layer = 1;
        up.Transform.localPosition = {x:0, y:offset};
        up.AddComponent(new SpriteRenderer(up, flappySprite, {x:18, y:0}, {x:25, y:8}));
        up.Transform.name = "Edge";
        up.name = "Edge";
        up.Transform.localScale = {x: this.scale, y: this.scale};


        var direction = 1;
        if(this.reversed) direction = -1;

        this.AddComponent(new BoxCollider(this, false, {x:100, y:this.partSize * this.scale * (this.tubeSize + 1)}, {x: 0, y: 0.5 * direction * this.partSize * this.scale * (this.tubeSize + 1)}));

        up.Transform.position = {x: this.Transform.position.x, y: this.Transform.position.y + direction * this.partSize/2 * this.scale};

        for(var i = 1; i < this.tubeSize; i++)
        {
            var part = Instantiate("GameObject");
            part.Transform.SetParent(this.Transform);

            part.AddComponent(new SpriteRenderer(part, flappySprite, {x:20, y:9}, {x:21, y:8}));
            part.Transform.name = "Part";
            part.name = "Part";
            part.Transform.localScale = {x: this.scale, y: this.scale};
            part.Transform.localPosition = {x: 0, y: direction * (this.partSize * i * part.Transform.scale.y)};
        }
    }
}