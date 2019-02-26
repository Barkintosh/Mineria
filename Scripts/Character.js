class Character extends GameObject
{
    constructor()
    {
        super();

        this.baseSpeed = 250;
        this.vSpeed = 0;
        this.hSpeed = 0;
        this.moving = false;
        this.falling = false;
        
        this.transform = new Transform( {x:blocks.length/2, y:blocks.length/2}, {x:1, y:1} );

        let bounds = [
            // LEFT TOP
            -scale/2,
            -scale,
            // RIGHT TOP
            scale/2,
            -scale,
            // LEFT DOWN
            scale/2,
            0,
            // RIGHT DOWN
            -scale/2,
            0];

        this.AddComponent(new Collider(this.transform, bounds));
        this.AddComponent(new SpriteRenderer(this.transform, characterSprite, {x:0, y:0}, 32, 32, HorizontalAlignement.MIDDLE, VerticalAlignement.DOWN));
    }

    Movement()
    {
        if(leftArrow || rightArrow) this.moving = true;
        /*
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 0, 0, 0.75)";
        ctx.fillRect(   
                        blocks[Math.round(this.transform.position.x+1)][Math.round(this.transform.position.y-1)].worldPosition.x - scale/2, 
                        blocks[Math.round(this.transform.position.x+1)][Math.round(this.transform.position.y-1)].worldPosition.y - scale/2, 
                        scale, 
                        scale
                    );
        ctx.fillRect(   
                        blocks[Math.round(this.transform.position.x-1)][Math.round(this.transform.position.y-1)].worldPosition.x - scale/2, 
                        blocks[Math.round(this.transform.position.x-1)][Math.round(this.transform.position.y-1)].worldPosition.y - scale/2, 
                        scale, 
                        scale
                    );

        if(this.moving)
        {
            if(leftArrow)
            {
                if(blocks[Math.round(this.transform.position.x-1)][Math.round(this.transform.position.y-1)].id == 6)
                    this.vSpeed = lerp(this.vSpeed, -this.baseSpeed/delta, 0.5);
                else this.vSpeed = lerp(this.vSpeed, 0, 0.5);
            }
            else
            {
                if(blocks[Math.round(this.transform.position.x+1)][Math.round(this.transform.position.y-1)].id == 6)
                    this.vSpeed = lerp(this.vSpeed, this.baseSpeed/delta, 0.5);
                else this.vSpeed = lerp(this.vSpeed, 0, 0.5); 
            }
        }
        */


        if(this.moving)
        {
            if(leftArrow)
            {
                this.vSpeed = lerp(this.vSpeed, -this.baseSpeed/delta, 0.5);
            }
            else
            {
                this.vSpeed = lerp(this.vSpeed, this.baseSpeed/delta, 0.5);
            }
        }
        else this.vSpeed = lerp(this.vSpeed, 0, 0.5); 

        /*
        this.falling = this.IsFalling();
        if(this.falling)
        {
            this.hSpeed += gravity;
        }
        else 
        {
            this.hSpeed = 0;
            this.transform.position.y = Math.round(this.transform.position.y) - 0.5;
        }

        if(upArrow && !this.falling)
        {
            this.hSpeed = -0.2;
        }

        */
        this.transform.position.x += this.vSpeed;
        //this.transform.position.y += this.hSpeed;
        this.moving = false;
    }

    IsFalling()
    {
        /*
        let left = Math.round(player.position.x - 2);
        if(left < 0) left = 0;
        let right = Math.round(player.position.x + 2);
        if(right > blocks.length) right = blocks.length;
        let top = Math.round(player.position.y - 2);
        if(top < 0) top = 0;
        let down = Math.round(player.position.y + 2);
        if(down > blocks.length) down = blocks.length;
        for( let i = left; i < right; i++)
        {
          for( let j = top; j < down; j++)
          {
                if(blocks[i][j].IsColling(this.collider))
                {
                    if(blocks[i][j].id != 7 || blocks[i][j].id != 6) return true;
                    else return false;
                }
            }
        }
        
        if(blocks[Math.round(this.transform.position.x)][Math.round(this.transform.position.y)].id != 6) return false;
        else return true;
        */
    }

    DebugMode()
    {
        this.SpriteRenderer.ToggleMask();
    }

    Update()
    {
        super.Update();
        this.Movement();
    }
}