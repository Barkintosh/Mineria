var leftArrow;
var rightArrow;
var upArrow;
var downArrow;

var mouseX;
var mouseY;

var mouseDown = false;
var mouseUp = false;

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
    mouseDown = false;
    mouseUp = false;
}

document.addEventListener('mousedown', function()
{
    mouseDown = true;
});

document.addEventListener('mouseup', function()
{
    mouseUp = true;
});

document.addEventListener('mousemove', function()
{
    mouseX = event.clientX;
    mouseY = event.clientY;
});

const Scroll = e => {
    const direction = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
    scale += -direction * 1;
    if(scale < 1) scale = 1;
  };
  document.addEventListener("wheel", Scroll);
  document.addEventListener("mousewheel", Scroll);
  document.addEventListener("DOMMouseScroll", Scroll);