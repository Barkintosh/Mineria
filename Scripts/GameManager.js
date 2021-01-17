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
        this.AddComponent(new Player());
        this.Transform.scale = new Vector2(10, 10);
        this.Transform.layer = 1;
    }
}

class Player extends Component
{
    constructor()
    {
        super();
        this.velocity = new Vector2();
        this.speed = 5;
        this.armLength = 150;
        this.acceleration = 0.5;
        this.direction = 1;

        this.right = Instantiate("HandObject").Hand;
        this.left = Instantiate("HandObject").Hand;
        this.weapon = Instantiate("Weapon");
        this.weapon.Transform.SetParent(this.right.Transform);
    }

    Update()
    {
        this.right.attach = this.gameObject.Transform;
        this.left.attach = this.gameObject.Transform;

        if(Inputs.Get("up")) this.velocity.y = lerp(this.velocity.y, -1, this.acceleration);
        else if(Inputs.Get("down")) this.velocity.y = lerp(this.velocity.y, 1, this.acceleration);
        else this.velocity.y = lerp(this.velocity.y, 0, this.acceleration);

        if(Inputs.Get("left"))
        {
            this.velocity.x = lerp(this.velocity.x, -1, this.acceleration);

            if(this.direction == 1)
            {
                this.gameObject.Transform.scale.x = -this.gameObject.Transform.scale.x;
                this.direction = -1;
            }
        }
        else if(Inputs.Get("right"))
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
        
        var mousePos = camera.ScreenToWorldPoint(Inputs.mousePosition);
        var dirToMouse = mousePos.Less(this.Transform.position.Plus(this.right.offset));
        var distToMouse = dirToMouse.Magnitude();
        if(distToMouse > this.armLength) distToMouse = this.armLength;
        dirToMouse = dirToMouse.Normalized();

        var handPosition = this.Transform.position.Plus(new Vector2(dirToMouse.x * distToMouse, dirToMouse.y * distToMouse));
        this.right.Transform.position = Vector2.Lerp(this.right.Transform.position, handPosition, 0.5);
        this.left.Transform.position = Vector2.Lerp(this.left.Transform.position, handPosition, 0.5);
        this.right.offset = new Vector2(30 * this.direction, -25);
        this.left.offset = new Vector2(-40 * this.direction, -25);


        var handRotation = Vector2.Angle(Vector2.up, dirToMouse) * (180 / Math.PI);
        this.right.Transform.rotation = lerp(this.right.Transform.rotation, handRotation, 0.1);
        this.left.Transform.rotation = lerp(this.right.Transform.rotation, handRotation, 0.1);
        //this.weapon.Transform.localPosition = new Vector2(0, 50);
        //this.weapon.Transform.rotation = lerp(this.weapon.Transform.rotation, (Vector2.Angle(Vector2.up, this.Transform.position.Plus(this.right.offset).Direction(this.right.Transform.position)) + 180) * (180 / Math.PI), 0.1);
        
        
        
        camera.position = this.gameObject.Transform.position.Plus(this.weapon.Transform.position).DivideBy(2);

        this.right.Draw(this.Transform.position.Plus(this.right.offset));
        this.left.Draw(this.Transform.position.Plus(this.left.offset));
    }
}

class HandObject extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new Hand());
        this.AddComponent(new CircleCollider(30));
        this.AddComponent(new LineRenderer([], 10, "rgba(229, 196, 157, 1)", false));
        this.Transform.layer = 2;
    }
}

class Hand extends Component
{
    constructor()
    {
        super();
        this.offset = new Vector2();
    }

    Update()
    {
        Renderer.Rectangle
        (
            new Vector2(16, 16),
            this.Transform.position,
            this.Transform.scale,
            this.Transform.rotation,
            this.layer + 100,
            "rgba(229, 196, 157, 1)",
        );

    }

    Draw(shoulderPosition)
    {
        this.gameObject.LineRenderer.points = [];
        this.gameObject.LineRenderer.Add(shoulderPosition);
        this.gameObject.LineRenderer.Add(this.Transform.position);
    }
}

class Weapon extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new SpriteRenderer(this, roguelike, {x:44 * 16 + 44 - 4.5, y:6 * 16 + 6}, {x:16, y:16}));
        this.AddComponent(new CircleCollider(6));
        this.Transform.layer = 2;
        this.Transform.localScale = new Vector2(10, 10);
    }
}

class Map extends GameObject
{
    constructor()
    {
        super();
        for(var x = 0; x < 10; x++)
        {
            for(var y = 0; y < 10; y++)
            {
                var s = Instantiate("Slab");
                s.Transform.position.x = (x * 16 - 5 * 16) * 10;
                s.Transform.position.y = (y * 16 - 5 * 16) * 10;
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