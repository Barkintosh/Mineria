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
        this.Transform.scale = new Vector2(10, 10);
        this.Transform.layer = 1;
    }
}

class Player
{
    constructor(gameObject)
    {
        this.gameObject = gameObject;
        this.velocity = new Vector2();
        this.speed = 5;
        this.armLength = 100;
        this.acceleration = 0.5;
        this.direction = 1;

        this.weapon = Instantiate("Weapon");

        this.rightArmLR = this.gameObject.AddComponent(new LineRenderer(this.gameObject));
        this.rightArmLR.color = "rgba(229, 196, 157, 1)";
        this.rightArmLR.width = 10;
        this.rightShoulderPosition = Vector2.zero;
        this.rightHandPosition = Vector2.zero;

        this.leftArmLR = this.gameObject.AddComponent(new LineRenderer(this.gameObject));
        this.leftArmLR.color = "rgba(229, 196, 157, 1)";
        this.leftArmLR.width = 10;
        this.leftShoulderPosition = Vector2.zero;
        this.leftHandPosition = Vector2.zero;
    }

    Update()
    {
        if(Get("up")) this.velocity.y = lerp(this.velocity.y, -1, this.acceleration);
        else if(Get("down")) this.velocity.y = lerp(this.velocity.y, 1, this.acceleration);
        else this.velocity.y = lerp(this.velocity.y, 0, this.acceleration);

        if(Get("left"))
        {
            this.velocity.x = lerp(this.velocity.x, -1, this.acceleration);

            if(this.direction == 1)
            {
                this.gameObject.Transform.scale.x = -this.gameObject.Transform.scale.x;
                this.direction = -1;
            }
        }
        else if(Get("right"))
        {
            this.velocity.x = lerp(this.velocity.x, 1, this.acceleration);

            if(this.direction == -1)
            {
                this.gameObject.Transform.scale.x = -this.gameObject.Transform.scale.x;
                this.direction = 1;
            }
        }
        else this.velocity.x = lerp(this.velocity.x, 0, this.acceleration);
        this.gameObject.Transform.position.Add(this.velocity.MultiplyBy(this.speed));


        var mousePos = camera.ScreenToWorldPoint(mousePosition);
        this.rightShoulderPosition = new Vector2(
            this.gameObject.Transform.position.x + 30 * this.direction,
            this.gameObject.Transform.position.y - 24
        );
        var dirToMouse = new Vector2
        (
            mousePos.x - this.rightShoulderPosition.x,
            mousePos.y - this.rightShoulderPosition.y
        );

        var distToMouse = dirToMouse.Magnitude();
        if(distToMouse > this.armLength) distToMouse = this.armLength;

        dirToMouse = dirToMouse.Normalized();

        var handPos = new Vector2(this.rightShoulderPosition.x + dirToMouse.x * distToMouse, this.rightShoulderPosition.y + dirToMouse.y * distToMouse);

        this.weapon.Transform.position.x = lerp(this.weapon.Transform.position.x, handPos.x, 0.2);
        this.weapon.Transform.position.y = lerp(this.weapon.Transform.position.y, handPos.y, 0.2);

        var direction = new Vector2
        (
            this.weapon.Transform.position.x - this.rightShoulderPosition.x,
            this.weapon.Transform.position.y - this.rightShoulderPosition.y
        );



        this.rightHandPosition = this.weapon.Transform.position.Plus(this.weapon.Transform.Up().MultiplyBy(-35));
        this.leftHandPosition = Vector2.Lerp(
            this.leftHandPosition,
            new Vector2(
                this.gameObject.Transform.position.x - 44 * this.direction,
                this.gameObject.Transform.position.y + 30
            ),
            0.2
        );
        this.leftShoulderPosition = new Vector2(
            this.gameObject.Transform.position.x - 44 * this.direction,
            this.gameObject.Transform.position.y - 30
        );

        this.weapon.Transform.rotation = lerp(this.weapon.Transform.rotation, Vector2.Angle(Vector2.up, direction) * (180 / Math.PI), 0.1);
        
        this.rightArmLR.points = [];
        this.rightArmLR.Add(this.rightShoulderPosition);
        this.rightArmLR.Add(this.rightHandPosition);

        this.leftArmLR.points = [];
        this.leftArmLR.Add(this.leftShoulderPosition);
        this.leftArmLR.Add(this.leftHandPosition);

        camera.position = this.gameObject.Transform.position.Plus(this.weapon.Transform.position).DivideBy(2);
    }
}

class Weapon extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new SpriteRenderer(this, roguelike, {x:44 * 16 + 44 - 4.5, y:6 * 16 + 6}, {x:16, y:16}));
        this.Transform.layer = 2;
        this.Transform.scale = new Vector2(10, 10);
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
        var cY = 13 * 17;
        this.Transform.scale = {x: 10, y: 10};
        this.AddComponent(new SpriteRenderer(this, dungeon, {x:cX, y:cY}, {x:16, y:16}));
    }
}