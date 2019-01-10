class Block
{
    constructor(id, gridPosition, playerPosition)
    {
        this.id = id;
        this.gridPosition = gridPosition;
        this.worldPosition = 
        {
            x: (this.gridPosition.x - player.position.x) * scale + canvas.width/2,
            y: (this.gridPosition.y - player.position.y) * scale + canvas.height/2
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
        if(Math.getDistance(this.gridPosition.x, this.gridPosition.y, player.position.x, player.position.y) < 0.5)
        {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
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

    Update()
    {
        this.worldPosition = 
        {
            x: (this.gridPosition.x - player.position.x) * scale + canvas.width/2,
            y: (this.gridPosition.y - player.position.y) * scale + canvas.height/2
        }

        this.DrawBlock();
        this.DrawShadow();

        if(debug)
        {
            this.DrawDebug();
        }
    }
}