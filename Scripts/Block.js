class Block
{
    constructor(id, gridPosition, playerPosition)
    {
        this.id = id;
        this.gridPosition = gridPosition;
        this.worldPosition = 
        {
            x: (this.gridPosition.x - player.transform.position.x) * scale + canvas.width/2,
            y: (this.gridPosition.y - player.transform.position.y) * scale + canvas.height/2
        }
    }

    DrawBlock()
    {
        ctx.drawImage
        (
            blocksSprite,
            this.id * 16,
            0,
            16,
            16,

            this.worldPosition.x - scale/2,
            this.worldPosition.y - scale/2,
            scale,
            scale
        );
    }

    IsClicked(x, y)
    {
        if(x > this.worldPosition.x - scale/2
        && x < this.worldPosition.x + scale/2
        && y > this.worldPosition.y - scale/2
        && y < this.worldPosition.y + scale/2) return true;
        else return false;
    }

    PointInBounds(x, y)
    {
        if(x > this.collider[0]
        && x < this.collider[4]
        && y > this.collider[1]
        && y < this.collider[5]) return true;
        else return false;  
    }

    IsColling(collider)
    {
        for( let i = 0; i < collider.length; i += 2)
        {
            if(this.PointInBounds(player.collider[i], player.collider[i+1]))
                return true;
        }
        return false;
    }

    IsOnScreen()
    {
        if
        (
        this.worldPosition.x > -scale + 100
        && this.worldPosition.x < window.innerWidth - 100
        && this.worldPosition.y > -scale + 100
        && this.worldPosition.y < window.innerHeight - 100
        )
        {
            return true;
        }
        else return false;
    }

    DrawShadow()
    {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0," + GetLightPercentage(8, this.gridPosition.x, this.gridPosition.y) + ")";
        ctx.fillRect(this.worldPosition.x - scale/2, this.worldPosition.y - scale/2, scale, scale);
    }

    DrawDebug()
    {
        if(Math.getDistance(this.gridPosition.x, this.gridPosition.y, player.transform.position.x, player.transform.position.y) < 0.5)
        {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeRect(this.worldPosition.x - scale/2, this.worldPosition.y - scale/2, scale, scale);
        }
        else
        {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 0.5;
            ctx.strokeRect(this.worldPosition.x - scale/2, this.worldPosition.y - scale/2, scale, scale);
        
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.moveTo(this.worldPosition.x, this.worldPosition.y - 5);
            ctx.lineTo(this.worldPosition.x, this.worldPosition.y + 5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.worldPosition.x - 5, this.worldPosition.y);
            ctx.lineTo(this.worldPosition.x + 5, this.worldPosition.y);
            ctx.stroke();
        }

        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center"; 
        ctx.justify = "center"; 
        ctx.textBaseline = 'middle'; 
        ctx.fillText(this.id, this.worldPosition.x, this.worldPosition.y);
    }

    DrawCollider()
    {
        ctx.strokeStyle = "white";
        ctx.beginPath();

        ctx.moveTo(this.collider[0], this.collider[1]);
        for( var i = 2; i < this.collider.length; i += 2)
        {
            ctx.lineTo(this.collider[i], this.collider[i+1]);
        }
        ctx.lineTo(this.collider[0], this.collider[1]);
        ctx.stroke();
    }

    Update()
    {
        this.worldPosition = 
        {
            x: (this.gridPosition.x - player.transform.position.x) * scale + canvas.width/2,
            y: (this.gridPosition.y - player.transform.position.y) * scale + canvas.height/2
        }

        this.collider = [
            this.worldPosition.x - scale/2,
            this.worldPosition.y - scale/2,

            this.worldPosition.x + scale/2,
            this.worldPosition.y - scale/2,
            
            this.worldPosition.x + scale/2,
            this.worldPosition.y + scale/2,

            this.worldPosition.x - scale/2,
            this.worldPosition.y + scale/2,
        ];

        this.DrawBlock();
        this.DrawShadow();

        //this.DrawCollider();

        if(debug)
        {
            this.DrawDebug();
        }


        if(this.IsColling(player.collider))
        {
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 0, 0, 0.75)";
            ctx.fillRect(this.worldPosition.x - scale/2, this.worldPosition.y - scale/2, scale, scale);
            //this.id = 7;
        }
        /*
        if(Math.getDistance(this.gridPosition.x, this.gridPosition.y, player.transform.position.x, player.transform.position.y) < 0.5)
        {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeRect(this.worldPosition.x - scale/2, this.worldPosition.y - scale/2, scale, scale);
        }
        */
    }
}