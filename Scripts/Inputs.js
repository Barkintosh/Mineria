var mouseX = 0;
var mouseY = 0;
var mouseDown = false;
var mouse;
var mouseUp = false;
var mousePosition;

class Input
{
    constructor(key, name, value = false)
    {
        this.key = key;
        this.name = name;
        this.value = false;
    }
}

var inputs = [];
Add("KeyW", "up");
Add("KeyS", "down");
Add("KeyA", "left");
Add("KeyD", "right");

Add("KeyR", "next");
Add("KeyF", "previous");

function Get(name)
{
    for(var i = 0; i < inputs.length; i++)
    {
        if(inputs[i].name == name) return inputs[i].value;
    }
    return false;
}

function Add(key, name)
{
    inputs[inputs.length] = new Input(key, name);
}

document.addEventListener('keydown', function(event) 
{
    for(var i = 0; i < inputs.length; i++)
    {
        if(event.code == inputs[i].key)
            inputs[i].value = true;
    }
});

document.addEventListener('keyup', function(event) 
{
    for(var i = 0; i < inputs.length; i++)
    {
        if(event.code == inputs[i].key)
            inputs[i].value = false;
    }
});
function UpdateInputs()
{
    mouseDown = false;
    mouseUp = false;
    mousePosition = {x: mouseX, y:mouseY};
}
document.addEventListener('mousedown', function()
{
    mouseDown = true;
    mouse = true;
});

document.addEventListener('mouseup', function()
{
    mouseUp = true;
    mouse = false;
});
document.addEventListener('mousemove', function()
{
    mouseX = event.clientX;
    mouseY = event.clientY;
});
var wheel = 0;
document.addEventListener('wheel', function()
{
    wheel = event.deltaY;
});