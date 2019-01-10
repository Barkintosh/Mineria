class Character
{
    constructor()
    {
        this.position = {
            x: blocks.length/2,
            y: blocks.length/2
        }

        this.baseSpeed = 16;
        this.vSpeed = 0;
        this.moving = false;
    }

    UpdateMovement()
    {
        if(leftArrow || rightArrow) this.moving = true;

        if(this.moving)
        {
            if(leftArrow)
                this.vSpeed = lerp(this.vSpeed, -this.baseSpeed/delta, 0.5);
            if(rightArrow)
                this.vSpeed = lerp(this.vSpeed, this.baseSpeed/delta, 0.5);
        }
        else
        {
            this.vSpeed = lerp(this.vSpeed, 0, 0.5);   
        }

        this.position.x += this.vSpeed;
        this.moving = false;
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

            canvas.width/2 - scale/2,
            canvas.height/2 - scale,
            scale,
            scale
        );    
        
        ctx.font = "12px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center"; 
        ctx.textBaseline = 'middle'; 
        ctx.fillText(Math.round(this.vSpeed*delta), canvas.width/2, canvas.height/2 + scale/2);
    }

    Update()
    {
        this.UpdateMovement();
        this.Draw();
    }
}