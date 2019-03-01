class Dummy extends GameObject
{
    constructor()
    {
        super();
        this.name = "Dummy";
        this.AddComponent(new SpriteRenderer(this.Transform, creeperSprite, {x:0, y:0}, 32, 32, HorizontalAlignement.MIDDLE, VerticalAlignement.MIDDLE));
        this.AddComponent(new BoxCollider(this.Transform, false, {x:32, y:32}));
        this.moving = false;
        this.Transform.name = "Dummy";
    }

    Update()
    {
        super.Update();
        if(mouseDown && this.BoxCollider.IsPointInBounds({x:mouseX, y:mouseY}))
        {
            this.ToggleMoving();
        }
        if(this.moving) this.Transform.rotation += 1;
    }

    ToggleMoving()
    {
        this.moving = !this.moving;
    }
}