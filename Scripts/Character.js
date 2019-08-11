class Character extends GameObject
{
    constructor()
    {
        super();
        this.AddComponent(new SpriteRenderer(this, characterSprite, {x:32, y:48}, 16, 16));
        this.AddComponent(new Flipbook(this.SpriteRenderer, characterSprite, 8, {x: 0, y:0}, {x:32, y:32}, 0.25));
        this.AddComponent(new BoxCollider(this, false, {x:16, y:16}));
        this.AddComponent(new Controller(this));
        this.Transform.size = {x: 2, y: 2};
        this.Transform.name = "Character";
    }
}