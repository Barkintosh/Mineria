var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var blocks = Create2DArray(2048);
var scale = 32;
var player = new Character();
var time = 0;
var gravity = 0.01;

var worldOrigin = 
{
  x: 0,
  y: 0
}

var cameraClampShift = -1;

var fps = 30;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

function Start() 
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;

  GenerateBlocks();

  Update();
}

function Update() 
{
  requestAnimationFrame(Update);
     
  now = Date.now();
  delta = now - then;
   
  if (delta > interval) 
  {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    DrawBackground();
    UpdateBlocks();
    InterfaceUpdate();

    player.Update();

    then = now - (delta % interval);
  }
  time = performance.now() / 1000;
}

function GenerateBlocks()
{
  for( var i = 0; i < blocks.length; i++)
  {
    for( var j = 0; j < blocks.length; j++)
    {
      blocks[i][j] = new Block(GetRandomInt(0, 6), position = {x: i, y: j});
      var randLight = GetRandomInt(0, 501);
      if(randLight <= 1) blocks[i][j].id = 6;
    }
  }
}

function UpdateBlocks()
{
  let left = Math.round(player.position.x - canvas.width*0.5/scale) + cameraClampShift;
  if(left < 0) left = 0;

  let right = Math.round(player.position.x + canvas.width*0.5/scale) - cameraClampShift;
  if(right > blocks.length) right = blocks.length;

  let top = Math.round(player.position.y - canvas.height*0.5/scale) + cameraClampShift;
  if(top < 0) top = 0;

  let down = Math.round(player.position.y + canvas.height*0.5/scale) - cameraClampShift;
  if(down > blocks.length) down = blocks.length;
  for( let i = left; i < right; i++)
  {
    for( let j = top; j < down; j++)
    {
      blocks[i][j].Update();
    }
  }
}

function GetLightPercentage(range, x, y)
{
  var light = 1;
  
  let left = Math.round(player.position.x - canvas.width*0.5/scale) + cameraClampShift;
  if(left < 0) left = 0;

  let right = Math.round(player.position.x + canvas.width*0.5/scale) - cameraClampShift;
  if(right > blocks.length) right = blocks.length;

  let top = Math.round(player.position.y - canvas.height*0.5/scale) + cameraClampShift;
  if(top < 0) top = 0;

  let down = Math.round(player.position.y + canvas.height*0.5/scale) - cameraClampShift;
  if(down > blocks.length) down = blocks.length;

  for( let i = left; i < right; i++)
  {
    for( let j = top; j < down; j++)
    {
        var newLight = 0;
        /*
        newLight = Math.getDistance(x * scale + scale/2, y * scale + scale/2, mouseX - player.position.x, mouseY - player.position.y)/(range * scale);
        if(newLight < light) light = newLight;
        */
        
        newLight = Math.getDistance(x, y, player.position.x, player.position.y)/4 ;
        if(newLight < light) light = newLight;

        if(blocks[i][j].id == 6)
        {
            newLight = Math.getDistance(x, y, i, j)/(range);
            if(newLight < light) light = newLight;
        }
    }
  }

  if(light < 0) light = 0;
  else if(light > 1) light = 1;

  return light;
}

window.onresize = function() 
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
};

function DrawBackground() 
{
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}