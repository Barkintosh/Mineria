class Character extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new SpriteRenderer(this, minecraftBlocksSprite, {x:32, y:48}, 16, 16));
        this.AddComponent(new BoxCollider(this, false, {x:16, y:16}));
        this.AddComponent(new Controller(this));
        this.Transform.size = {x: 1, y: 1};
        this.Transform.name = "Character";
    }
}