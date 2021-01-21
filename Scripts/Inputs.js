class Action
{
    constructor(key, name)
    {
        this.key = key;
        this.name = name;

        this.down = false;
        this.held = false;
        this.up = false;
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
            if(Inputs.actions[i].name == name) 
            {
                return Inputs.actions[i];
            }
        }
        return false;
    }

    static KeyGet(key)
    {
        for(var i = 0; i < Inputs.actions.length; i++)
        {
            if(Inputs.actions[i].key == key) 
            {
                return Inputs.actions[i];
            }
        }
        return false;
    }
    
    static Add(key, name)
    {
        Inputs.actions[Inputs.actions.length] = new Action(key, name);
    }

    static Update()
    {
        for(var i = 0; i < Inputs.actions.length; i++)
        {
            Inputs.actions[i].down = false;
            Inputs.actions[i].up = false;
        }

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
Inputs.Add("mouse0", "interact");
Inputs.Add("mouse1", "drop");

document.addEventListener('keydown', function(event) 
{
    for(var i = 0; i < Inputs.actions.length; i++)
    {
        if(event.code == Inputs.actions[i].key)
        {
            Inputs.actions[i].down = true;
            Inputs.actions[i].held = true;
            Inputs.actions[i].up = false;
        }
    }
});
document.addEventListener('keyup', function(event) 
{
    for(var i = 0; i < Inputs.actions.length; i++)
    {
        if(event.code == Inputs.actions[i].key)
        {
            Inputs.actions[i].down = false;
            Inputs.actions[i].held = false;
            Inputs.actions[i].up = true;
        }
    }
});
document.addEventListener('mousedown', function(event)
{
    Inputs.mouseDown = true;
    Inputs.mouse = true;

    var a = Inputs.KeyGet("mouse" + event.button);
    if(a != false)
    {
        a.down = true;
        a.held = true;
    }
});
document.addEventListener('mouseup', function(event)
{
    Inputs.mouseUp = true;
    Inputs.mouse = false;

    var a = Inputs.KeyGet("mouse" + event.button);
    if(a != false)
    {
        a.held = false;
        a.up = true;
    }
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