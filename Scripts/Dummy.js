class Dummy extends GameObject
{
    constructor()
    {
        super();
        this.name = "Dummy";
        this.AddComponent(new SpriteRenderer(this, fireCircle, {x:0, y:0}, 50, 50));
        this.AddComponent(new Flipbook(this.SpriteRenderer, fireCircle, 60, {x:0, y:0}, {x:50, y:50}, 1));
        this.AddComponent(new BoxCollider(this, false, {x:32, y:32}));
        this.moving = false;
        this.Transform.size = {x: 1, y: 1};
        this.Transform.name = "Dummy";
    }

    Update()
    {
        super.Update();

        if(mouseDown && this.BoxCollider.IsPointInBounds({x:mouseX, y:mouseY}))
        {
            this.ToggleMoving();
        }
        if(this.moving)
        {
            this.Transform.rotation += 1;
        }
    }

    ToggleMoving()
    {
        this.moving = !this.moving;
    }
}