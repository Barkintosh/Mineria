class Character
{
    constructor()
    {
        this.position = {
            x: canvas.width/2,
            y: canvas.height/2
        }
        this.speed = 1;
    }

    Draw()
    {
        ctx.drawImage
        (
            characterSprite,
            0,
            0,
            16,
            16,

            this.position.x - scale/2,
            this.position.y - scale,
            scale,
            scale
        );
    }
}