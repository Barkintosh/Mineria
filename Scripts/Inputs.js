var leftArrow;
var rightArrow;
var upArrow;
var downArrow;

var mouseX;
var mouseY;

var mouseDown = false;

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
        player.position.x -= player.speed/delta;
    else if(rightArrow)
        player.position.x += player.speed/delta;
    
    if(upArrow)
        player.position.y -= player.speed/delta;
    else if(downArrow)
        player.position.y += player.speed/delta;
}

function MovingMouse(event)
{
  mouseX = event.clientX;
  mouseY = event.clientY;
}

var mouseDownEvent = new CustomEvent("mouseDownEvent");

function MouseDown(event)
{
    this.dispatchEvent(mouseDownEvent);

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

    mouseDown = true;
}

function MouseUp(event)
{
    mouseDown = false;
}

const Scroll = e => {
    const direction = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
    scale += -direction * 1;
    if(scale < 1) scale = 1;
  };
  document.addEventListener("wheel", Scroll);
  document.addEventListener("mousewheel", Scroll);
  document.addEventListener("DOMMouseScroll", Scroll);