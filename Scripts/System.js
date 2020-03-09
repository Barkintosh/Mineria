var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// SCENE
var scene = [];
var Render = new Renderer();
// REFRESH SYSTEM
var time = 0;
var fps = 120;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var pause = false;
var debug = false;
// SETTINGS
var gravity = 0.01;
var camera;

function Debug()
{
	for(var i = 0; i < scene.length; i++)
	{
		var sr = scene[i].GetComponent("SpriteRenderer");
		if(sr != null) sr.ToggleDebug();
		var c = scene[i].GetComponent("Collider");
		if(c != null) c.ToggleDebug();
		var t = scene[i].GetComponent("Transform");
        if(t != null) t.ToggleDebug();
        var rt = scene[i].GetComponent("RectTransform");
		if(rt != null) rt.ToggleDebug();
		var bc = scene[i].GetComponent("BoxCollider");
        if(bc != null) bc.ToggleDebug();
        var img = scene[i].GetComponent("Image");
		if(img != null) img.ToggleDebug();
    }
    Update();
}

function Pause()
{
    pause = !pause;
}

function Start()
{
    scene = [];
    ResizeScreen();
    Refresh();
    camera = Instantiate("CameraObject").Camera;
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

setInterval(function(){ShowFramePerSeconds()},250);

function ShowFramePerSeconds()
{
    var fpsText = document.getElementById("text-fps");
    var fpsValue = Math.round(1000 / delta);
    if(fpsValue < 15) fpsText.style.color = "red";
    else if(fpsValue < 30) fpsText.style.color = "yellow";
    else fpsText.style.color = "green";
    fpsText.innerHTML = "FPS " + fpsValue;
}

function Update()
{
    for(var i = 0; i < scene.length; i++) scene[i].Update();
    Render.Update();
    UpdateCollisions();
    UpdateInputs();
    RefreshList();
}

function GetObjectIndex(object)
{
    for(var i = 0; i < scene.length; i++)
    {
        if(object == scene[i]) return i;
    }
    return -1;
}

window.onresize = ResizeScreen;
function ResizeScreen()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
}

function RefreshList()
{
    const list = document.getElementById("scene-list");
    while (list.firstChild) {list.removeChild(list.lastChild);}

    for(var i = 0; i < scene.length; i++)
    {
        var node = document.createElement("gameobject-element");
        list.appendChild(node);
        var offset = 0;
        var alpha = 1;
        var size = 16;
        var arrow = "";
        var end = false;
        var t = scene[i].Transform;
        if(t == undefined) t = scene[i].RectTransform;
        if(t == undefined) continue;

        while(!end)
        {
            if(t.parent != undefined)
            {
                offset += 15;
                alpha -= 0.2;
                size -= 2;
                arrow = "&#8593; ";
                t = t.parent;
            }
            else end = true;
        }

        node.innerHTML = arrow + scene[i].name;
        node.style.paddingLeft = offset;
        node.style.fontSize = size;
        node.style.color = "rgba(255, 255, 255, " + alpha + ")";
    }

    document.getElementById("scene-title").innerHTML = "Elements in scene : " + scene.length;
}

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
            if(object.Transform != undefined)
            {
                object.Transform.children.forEach(function(e)
                {Destroy(e.gameObject);});
            }

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

