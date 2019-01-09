var leftArrow;
var rightArrow;
var upArrow;
var downArrow;

var mouseX;
var mouseY;

document.addEventListener('keydown', function(event) 
{
    if(event.keyCode == 37) // LEFT
    {
        leftArrow = true;
    }
    else if(event.keyCode == 39) // RIGHT
    {
        rightArrow = true;
    }
    if(event.keyCode == 38) // UP
    {
        upArrow = true;
    }
    else if(event.keyCode == 40) // DOWN
    {
        downArrow = true;
    }
});

document.addEventListener('keyup', function(event) 
{
    if(event.keyCode == 37) // LEFT
    {
        leftArrow = false;
    }
    else if(event.keyCode == 39) // RIGHT
    {
        rightArrow = false;
    }
    if(event.keyCode == 38) // UP
    {
        upArrow = false;
    }
    else if(event.keyCode == 40) // DOWN
    {
        downArrow = false;
    }
});

function UpdateInputs()
{
    if(leftArrow)
        player.position.x -= player.speed;
    else if(rightArrow)
        player.position.x += player.speed;
    
    if(upArrow)
        player.position.y -= player.speed;
    else if(downArrow)
        player.position.y += player.speed;
}

function MovingMouse(event)
{
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function MouseDown(event)
{
    for( var i = 0; i < blocks.length; i++)
    {
        for( var j = 0; j < blocks.length; j++)
        {
            if(blocks[i][j].IsClicked(mouseX, mouseY))
            {
                blocks[i][j].id = 6;
                return;
            }
        }
    }
}

function MouseUp(event)
{

}