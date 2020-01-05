var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// SCENE
var scene = [];
var Render = new Renderer();

// REFRESH SYSTEM
var time = 0;
var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var pause = false;

// SETTINGS
var gravity = 0.01;
var scale = 32;

var camera = Instantiate("Camera");

function Start()
{
    ResizeScreen();
    Refresh();

    Instantiate("GameManager");
}

function Refresh()
{
    requestAnimationFrame(Refresh);

    if(pause) return;

    now = Date.now();
    delta = now - then;
    if (delta > interval) 
    {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        Update();
        then = now - (delta % interval);
    }
    time = performance.now() / 1000;
}

function Update()
{
    for(var i = 0; i < scene.length; i++) scene[i].Update();
    Render.Update();
    UpdateCollisions();
    UpdateInterface();
    UpdateInputs();
}

function ResizeScreen()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
}

window.onresize = ResizeScreen;


function Instantiate(object, position = {x:0, y:0})
{
    var newObject = eval("new " + object + "()");
    scene[scene.length] = newObject;
    if(newObject.Transform != undefined)
    {
        newObject.Transform.position = position;
    }
    newObject.Start();
    return newObject;
}

function Destroy(object)
{
    for(var i = 0; i < scene.length; i++)
    {
        if(object == scene[i])
        {
            delete scene[i];
            scene.splice(i, 1);
            return;
        }
    }
}

function ScreenToWorld(posX, posY)
{
    return { x: posX + camera.Transform.position.x, y: posY + camera.Transform.position.y };
}

function FindComponents(component)
{
    var components = [];
    for(var i = 0; i < scene.length; i++)
    {
        var c = scene[i].GetComponent(component);
        if(c != null) components[components.length] = c;
    }
    return components;
}

function Include(filename)
{
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';

    head.appendChild(script)
}

function Include(filename, type = "text/javascript")
{
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.src = filename;
    script.type = type;

    head.appendChild(script)
}