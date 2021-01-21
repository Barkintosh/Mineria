class GameManager extends GameObject
{
    constructor()
    {
        super();
        Instantiate("CharacterObject");
        Instantiate("Map");
        Instantiate("WeaponObject");
    }
}

class CharacterObject extends GameObject
{
    constructor()
    {
        super();
        //this.AddComponent(new SpriteRenderer(roguelike, {x:0, y:0}, {x:16, y:16}));
        this.AddComponent(new Character());
        this.AddComponent(new Player());
        this.Transform.layer = 1;
    }
}

class Character extends Component
{
    constructor()
    {
        super();
        this.velocity = new Vector2();
        this.speed = 5;
        this.armLength = 150;
        this.acceleration = 0.5;
        this.direction = 1;
        this.aimPosition = new Vector2();
        this.right = Instantiate("HandObject").Hand;
        this.left = Instantiate("HandObject").Hand;
        this.right.gameObject.AddComponent(new CircleCollider(30));
        this.weaponUnderHand = null;
    }

    Equip(w)
    {
        this.weapon = w;
        this.weapon.Transform.SetParent(this.right.Transform);
        this.weapon.Transform.localPosition = new Vector2(0, 40);
    }

    Drop()
    {
        if(this.weapon != undefined)
        {
            this.weapon.Transform.UnParent();
            this.weapon = undefined;
        }
    }

    Update()
    {
        var s
        Renderer.Rectangle(new Vector2(50, 100), this.Transform.position, this.Transform.scale, this.Transform.rotation, 1, "rgb(229, 194, 152)", true, 0);


        this.right.attach = this.gameObject.Transform;
        this.left.attach = this.gameObject.Transform;
        
        var dirToMouse = this.aimPosition.Less(this.Transform.position.Plus(this.right.offset));
        var distToMouse = dirToMouse.Magnitude();
        if(distToMouse > this.armLength) distToMouse = this.armLength;
        dirToMouse = dirToMouse.Normalized();

        var rightHandPosition = this.Transform.position.Plus(new Vector2(dirToMouse.x * distToMouse, dirToMouse.y * distToMouse));
        var leftHandPosition = this.Transform.position;
        
        this.right.Transform.position = Vector2.Lerp(this.right.Transform.position, rightHandPosition, 0.5);
        this.left.Transform.position = Vector2.Lerp(this.left.Transform.position, rightHandPosition, 0.5);
        this.right.offset = new Vector2(25 * this.direction, -50);
        this.left.offset = new Vector2(-25 * this.direction, -50);


        var handRotation = Vector2.Angle(Vector2.up, dirToMouse) * (180 / Math.PI);
        this.right.Transform.rotation = lerp(this.right.Transform.rotation, handRotation, 0.1);
        //this.left.Transform.rotation = lerp(this.right.Transform.rotation, handRotation, 0.1);
        

        this.right.Draw(this.Transform.position.Plus(this.right.offset));
        this.left.Draw(this.Transform.position.Plus(this.left.offset));
    }
}

class Player extends Component
{
    constructor()
    {
        super();
    }

    Update()
    {
        this.gameObject.Character.aimPosition = camera.ScreenToWorldPoint(Inputs.mousePosition);
        camera.position = this.gameObject.Transform.position.Plus(this.gameObject.Character.right.Transform.position).DivideBy(2);

        if(Inputs.Get("up").held) this.gameObject.Character.velocity.y = lerp(this.gameObject.Character.velocity.y, -1, this.gameObject.Character.acceleration);
        else if(Inputs.Get("down").held) this.gameObject.Character.velocity.y = lerp(this.gameObject.Character.velocity.y, 1, this.gameObject.Character.acceleration);
        else this.gameObject.Character.velocity.y = lerp(this.gameObject.Character.velocity.y, 0, this.gameObject.Character.acceleration);

        if(Inputs.Get("left").held)
        {
            this.gameObject.Character.velocity.x = lerp(this.gameObject.Character.velocity.x, -1, this.gameObject.Character.acceleration);

            if(this.gameObject.Character.direction == 1)
            {
                this.gameObject.Character.gameObject.Transform.scale.x = -this.gameObject.Character.gameObject.Transform.scale.x;
                this.gameObject.Character.direction = -1;
            }
        }
        else if(Inputs.Get("right").held)
        {
            this.gameObject.Character.velocity.x = lerp(this.gameObject.Character.velocity.x, 1, this.gameObject.Character.acceleration);

            if(this.gameObject.Character.direction == -1)
            {
                this.gameObject.Character.gameObject.Transform.scale.x = -this.gameObject.Character.gameObject.Transform.scale.x;
                this.gameObject.Character.direction = 1;
            }
        }
        else this.gameObject.Character.velocity.x = lerp(this.gameObject.Character.velocity.x, 0, this.gameObject.Character.acceleration);
        this.gameObject.Character.gameObject.Transform.position.Add(this.gameObject.Character.velocity.MultiplyBy(this.gameObject.Character.speed));
    
    
        if(this.gameObject.Character.right.weaponUnder != this.gameObject.Character.weapon)
            Renderer.Text("Pickup", "16px Roboto", "white", this.gameObject.Character.right.Transform.position, 100);

        if(Inputs.Get("interact").down)
        {
            if(this.gameObject.Character.right.weaponUnder != undefined)
            {
                this.gameObject.Character.Equip(this.gameObject.Character.right.weaponUnder);
            }
        }
        if(Inputs.Get("drop").down)
        {
            if(this.gameObject.Character.weapon != undefined)
            {
                this.gameObject.Character.Drop();
            }
        }
    }
}

class HandObject extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new Hand());
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
        this.weaponUnder = null;
    }

    OnTriggerEnter(other)
    {
        if(other.gameObject.Weapon != undefined)
            this.weaponUnder = other.gameObject.Weapon;
    }

    OnTriggerExit(other)
    {
        if(other.gameObject.Weapon != undefined)
            this.weaponUnder = undefined;
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

class WeaponObject extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new SpriteRenderer(roguelike, {x:44 * 16 + 44 - 4.5, y:6 * 16 + 6}, {x:16, y:16}));
        this.AddComponent(new CircleCollider(6));
        this.AddComponent(new Weapon());
        this.Transform.layer = 3;
        this.Transform.scale = new Vector2(10, 10);
    }

    Update()
    {
        super.Update();
    }
}

class Weapon extends Component
{
    constructor()
    {
        super();
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
        this.layer = 0;
        this.AddComponent(new SpriteRenderer(dungeon, {x:cX, y:cY}, {x:16, y:16}));
    }
}