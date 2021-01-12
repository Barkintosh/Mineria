class GameManager extends GameObject
{
    constructor()
    {
        super();
        Instantiate("Character");
        Instantiate("Map");
    }
}

class Character extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new SpriteRenderer(this, roguelike, {x:0, y:0}, {x:16, y:16}));
        this.AddComponent(new BoxCollider(this, false, {x:15, y:10}));
        this.AddComponent(new Player(this));
        this.Transform.scale = {x: 10, y: 10};
        this.Transform.layer = 1;

        camera.Focus(this.Transform);
        camera.Teleport();
    }
}

class Player
{
    constructor(gameObject)
    {
        this.gameObject = gameObject;
        this.velocity = {x: 0, y: 0};
        this.speed = 5;
        this.acceleration = 0.5;
        this.weapon = Instantiate("Weapon");
    }

    Update()
    {
        if(Get("up")) this.velocity.y = lerp(this.velocity.y, -1, this.acceleration);
        else if(Get("down")) this.velocity.y = lerp(this.velocity.y, 1, this.acceleration);
        else this.velocity.y = lerp(this.velocity.y, 0, this.acceleration);

        if(Get("left")) this.velocity.x = lerp(this.velocity.x, -1, this.acceleration);
        else if(Get("right")) this.velocity.x = lerp(this.velocity.x, 1, this.acceleration);
        else this.velocity.x = lerp(this.velocity.x, 0, this.acceleration);

        this.gameObject.Transform.position.x += this.velocity.x * this.speed;
        this.gameObject.Transform.position.y += this.velocity.y * this.speed;


        var pos = camera.ScreenToWorldPoint(mousePosition);
        this.weapon.Transform.position.x = lerp(this.weapon.Transform.position.x, pos.x, 0.1);
        this.weapon.Transform.position.y = lerp(this.weapon.Transform.position.y, pos.y, 0.1);

        if(Get("next"))
            this.weapon.GetComponent("SpriteRenderer").coordinate.x += 1;
        else if(Get("previous"))
            this.weapon.GetComponent("SpriteRenderer").coordinate.x -= 1;
    }
}

class Weapon extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new SpriteRenderer(this, roguelike, {x:44 * 16 + 44 - 4.5, y:6 * 16 + 6}, {x:16, y:16}));
        this.Transform.layer = 2;
        this.Transform.scale = {x: 10, y: 10};
    }
}

class Map extends GameObject
{
    constructor()
    {
        super();
        for(var x = 0; x < 50; x++)
        {
            for(var y = 0; y < 50; y++)
            {
                var s = Instantiate("Slab");
                s.Transform.position.x = (x * 16 - 25 * 16) * 10;
                s.Transform.position.y = (y * 16 - 25 * 16) * 10;
            }
        }
    }
}

class Slab extends GameObject
{
    constructor()
    {
        super();
        var cX = 17 * 17 + 17 * GetRandomInt(0, 4);
        var cY = 11 * 17;
        this.Transform.scale = {x: 10, y: 10};
        this.AddComponent(new SpriteRenderer(this, dungeon, {x:cX, y:cY}, {x:16, y:16}));
    }
}