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

var player = Instantiate("Character");
var camera = Instantiate("Camera");

function Start()
{
    ResizeScreen();

    camera.FocusOn(player.GetComponent("Transform"));

    Instantiate("Dummy", { x:200, y:0}).GetComponent("Transform");
/*
    var anim = Instantiate("Dummy", { x:-200, y:100}).GetComponent("Flipbook");
    anim.sheet = characterSprite;
    anim.frameCount = 8;
    anim.spriteSize = {x:32, y:32};
    anim.speed = 0.25;
    */

    anim = Instantiate("Dummy", { x:-100, y:100}).GetComponent("Flipbook");
    anim.sheet = asteroidSprite;
    anim.frameCount = 19;
    anim.spriteSize = {x:72, y:72};
    anim.pixelCoord = {x: 0, y:0};
    anim.originPixelCoord = anim.pixelCoord;
    anim.speed = 0.15;

    Refresh();
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
    DrawBackground();

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

function DrawBackground() 
{
    ctx.beginPath();
    var grd = ctx.createLinearGradient(0, window.innerHeight, window.innerWidth, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.5, "green");
    grd.addColorStop(1, "blue");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
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