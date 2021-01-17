class Action
{
    constructor(key, name, value = false)
    {
        this.key = key;
        this.name = name;
        this.value = false;
    }
}

class Inputs
{
    static mouseX = 0;
    static mouseY = 0;
    static mousePosition =  new Vector2();
    static mouseDown = false;
    static mouse = false;
    static mouseUp = false;
    static wheel = 0;
    static actions = [];

    static Get(name)
    {
        for(var i = 0; i < Inputs.actions.length; i++)
        {
            if(Inputs.actions[i].name == name) return Inputs.actions[i].value;
        }
        return false;
    }
    
    static Add(key, name)
    {
        Inputs.actions[Inputs.actions.length] = new Action(key, name);
    }

    static Update()
    {
        Inputs.mouseDown = false;
        Inputs.mouseUp = false;
        Inputs.mousePosition = new Vector2(Inputs.mouseX, Inputs.mouseY);
        Inputs.wheel = 0;
    }
}

Inputs.Add("KeyW", "up");
Inputs.Add("KeyS", "down");
Inputs.Add("KeyA", "left");
Inputs.Add("KeyD", "right");
Inputs.Add("KeyR", "next");
Inputs.Add("KeyF", "previous");

document.addEventListener('keydown', function(event) 
{
    for(var i = 0; i < Inputs.actions.length; i++)
    {
        if(event.code == Inputs.actions[i].key)
        Inputs.actions[i].value = true;
    }
});
document.addEventListener('keyup', function(event) 
{
    for(var i = 0; i < Inputs.actions.length; i++)
    {
        if(event.code == Inputs.actions[i].key)
        Inputs.actions[i].value = false;
    }
});
document.addEventListener('mousedown', function()
{
    Inputs.mouseDown = true;
    Inputs.mouse = true;
});
document.addEventListener('mouseup', function()
{
    Inputs.mouseUp = true;
    Inputs.mouse = false;
});
document.addEventListener('mousemove', function()
{
    Inputs.mouseX = event.clientX;
    Inputs.mouseY = event.clientY;
});
document.addEventListener('wheel', function()
{
    Inputs.wheel = event.deltaY;
});