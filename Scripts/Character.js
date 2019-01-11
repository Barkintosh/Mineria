class Character
{
    constructor()
    {
        this.position = {
            x: blocks.length/2,
            y: blocks.length/2
        };



        this.baseSpeed = 8;

        this.vSpeed = 0;
        this.hSpeed = 0;

        this.moving = false;
        this.falling = false;


        let bounds = [
            -scale/2,
            -scale,

            scale/2,
            -scale,
            
            scale/2,
            0,

            -scale/2,
            0
        ];

        this.collider = new Collider(bounds);
    }

    UpdateMovement()
    {
        if(leftArrow || rightArrow) this.moving = true;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 0, 0, 0.75)";
        ctx.fillRect(   
                        blocks[Math.round(this.position.x+1)][Math.round(this.position.y-1)].worldPosition.x - scale/2, 
                        blocks[Math.round(this.position.x+1)][Math.round(this.position.y-1)].worldPosition.y - scale/2, 
                        scale, 
                        scale
                    );
        ctx.fillRect(   
                        blocks[Math.round(this.position.x-1)][Math.round(this.position.y-1)].worldPosition.x - scale/2, 
                        blocks[Math.round(this.position.x-1)][Math.round(this.position.y-1)].worldPosition.y - scale/2, 
                        scale, 
                        scale
                    );
/*
        if(this.moving)
        {
            if(leftArrow && blocks[Math.round(this.position.x-1)][Math.round(this.position.y-1)].id == 6)
                this.vSpeed = lerp(this.vSpeed, -this.baseSpeed/delta, 0.5);
            else this.vSpeed = lerp(this.vSpeed, 0, 0.5);   
            

            if(rightArrow && blocks[Math.round(this.position.x+1)][Math.round(this.position.y-1)].id == 6)
                this.vSpeed = lerp(this.vSpeed, this.baseSpeed/delta, 0.5);
            else this.vSpeed = lerp(this.vSpeed, 0, 0.5);          
        }
        else this.vSpeed = lerp(this.vSpeed, 0, 0.5);   
*/
    if(this.moving)
    {
        if(leftArrow)
        {
            if(blocks[Math.round(this.position.x-1)][Math.round(this.position.y-1)].id == 6)
                this.vSpeed = lerp(this.vSpeed, -this.baseSpeed/delta, 0.5);
            else this.vSpeed = lerp(this.vSpeed, 0, 0.5);
        }
        else
        {
            if(blocks[Math.round(this.position.x+1)][Math.round(this.position.y-1)].id == 6)
                this.vSpeed = lerp(this.vSpeed, this.baseSpeed/delta, 0.5);
            else this.vSpeed = lerp(this.vSpeed, 0, 0.5); 
        }
    }
    else this.vSpeed = lerp(this.vSpeed, 0, 0.5); 




        this.falling = this.IsFalling();
        if(this.falling)
        {
            this.hSpeed += gravity;
        }
        else 
        {
            this.hSpeed = 0;
            this.position.y = Math.round(this.position.y) - 0.5;
        }

        if(upArrow && !this.falling)
        {
            this.hSpeed = -0.2;
        }



        this.position.x += this.vSpeed;
        this.position.y += this.hSpeed;

        this.moving = false;

        //console.log(this.falling);
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
        */
        if(blocks[Math.round(this.position.x)][Math.round(this.position.y)].id != 6) return false;
        else return true;
    }


    Draw()
    {
        ctx.drawImage
        (
            characterSprite,
            0,
            0,
            32,
            32,

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

    DrawCollider()
    {
        ctx.strokeStyle = "white";
        ctx.beginPath();

        ctx.moveTo(this.collider[0], this.collider[1]);
        for( let i = 2; i < this.collider.length; i += 2)
        {
            ctx.lineTo(this.collider[i], this.collider[i+1]);
        }
        ctx.lineTo(this.collider[0], this.collider[1]);
        ctx.stroke();
    }

    UpdateCollider()
    {
        this.collider.bounds = [
            canvas.width/2 - scale/2,
            canvas.height/2 - scale,

            canvas.width/2 + scale/2,
            canvas.height/2 - scale,
            
            canvas.width/2 + scale/2,
            canvas.height/2,

            canvas.width/2 - scale/2,
            canvas.height/2
        ];
        this.DrawCollider();
    }

    Update()
    {
        /*
        this.collider = [
            this.position.x - scale/2 + canvas.width/2,
            this.position.y - scale + canvas.height/2,

            this.position.x + scale/2 + canvas.width/2,
            this.position.y - scale + canvas.height/2,
            
            this.position.x + scale/2 + canvas.width/2,
            this.position.y + canvas.height/2,

            this.position.x - scale/2 + canvas.width/2,
            this.position.y + canvas.height/2
        ];
        */

        let worldPosition = [
            canvas.width/2 - scale/2,
            canvas.height/2 - scale,

            canvas.width/2 + scale/2,
            canvas.height/2 - scale,
            
            canvas.width/2 + scale/2,
            canvas.height/2,

            canvas.width/2 - scale/2,
            canvas.height/2
        ];


        this.collider.Update(this.position);
        this.collider.Draw("yellow", 2);

        this.UpdateMovement();
        //this.UpdateCollider();

        this.Draw();
    }
}