var blocksOnScreen = 0;

function InterfaceUpdate()
{
    for( var i = 0; i < blocks.length; i++)
    {
      for( var j = 0; j < blocks.length; j++)
      {
        if(!blocks[i][j].IsOnScreen())
        {
            blocksOnScreen++;
        }
      }
    }

    ctx.font = "21px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Blocks off screen : " + blocksOnScreen, 5, 25);

    blocksOnScreen = 0;
}