class Block
{
    constructor(id, gridPosition, playerPosition)
    {
        this.id = id;
        this.gridPosition = gridPosition;
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

            this.worldPosition.x,
            this.worldPosition.y,
            scale,
            scale
        );
    }

    IsClicked(x, y)
    {
        if(x > this.worldPosition.x
        && x < this.worldPosition.x + scale
        && y > this.worldPosition.y
        && y < this.worldPosition.y + scale) return true;
        else return false;
    }

    IsOnScreen()
    {
        if
        (
        this.worldPosition.x > -scale
        && this.worldPosition.x < window.innerWidth
        && this.worldPosition.y > -scale
        && this.worldPosition.y < window.innerHeight
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
        ctx.fillRect(this.worldPosition.x, this.worldPosition.y, scale, scale);
    }

    Update()
    {
        this.worldPosition = {
            x: /*player.position.x + */this.gridPosition.x * scale,
            y: /*player.position.y + */this.gridPosition.y * scale
        }

        if(this.IsOnScreen())
        {
            this.DrawBlock();
            this.DrawShadow();
        }
    }
}

function GetLightPercentage(range, x, y)
{
  var light = 1;

  for( var i = 0; i < blocks.length; i++)
  {
    for( var j = 0; j < blocks.length; j++)
    {
        var newLight = 0;
        /*
        newLight = Math.getDistance(x * scale + scale/2, y * scale + scale/2, mouseX - player.position.x, mouseY - player.position.y)/(range * scale);
        if(newLight < light) light = newLight;
        */
        newLight = Math.getDistance(x * scale + scale/2, y * scale + scale/2, player.position.x, player.position.y)/(2* scale);
        if(newLight < light) light = newLight;

        if(blocks[i][j].id == 6)
        {
        newLight = Math.getDistance(x * scale + scale/2, y * scale + scale/2, i * scale + scale/2, j * scale + scale/2)/(range * scale/* + ((Math.cos(time * 4)+1)/2)*25 */);
        if(newLight < light) light = newLight;
        }
    }
  }
  return light;
}