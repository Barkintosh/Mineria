var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var blocks = Create2DArray(64);

var scale = 32;

var time;

var mouseX;
var mouseY;

var refreshTime = 1000 / 60;
setInterval(Update, refreshTime);

// Proceed when the pages load
function Start() 
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;

  GenerateBlocks();
}

// Updates every 'refreshTime'
function Update() 
{
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  UpdateBlocks();
  //UpdateShadows();

  time = performance.now() / 1000;
}

function GenerateBlocks()
{
  for( var i = 0; i < blocks.length; i++)
  {
    for( var j = 0; j < blocks.length; j++)
    {
      blocks[i][j] = GetRandomInt(0, 6);

      var randLight = GetRandomInt(0, 501);
      if(randLight <= 1) blocks[i][j] = 6;
    }
  }
}

function UpdateBlocks()
{
  for( var i = 0; i < blocks.length; i++)
  {
    for( var j = 0; j < blocks.length; j++)
    {
      DrawBlock(blocks[i][j], i * scale, j * scale);
      DrawShadow(i, j);
    }
  }
}

function GetLightPercentage(x, y)
{
  var light = 0;

  for( var i = 0; i < blocks.length; i++)
  {
    for( var j = 0; j < blocks.length; j++)
    {
      if(blocks[i][j] == 6)
      {
        var newLight = Math.getDistance(x * scale + scale/2, y * scale + scale/2, i * scale + scale/2, j * scale + scale/2);
        if(newLight < light) light = newLight;
      }
    }
  }
  return light;
}

function DrawBlock(which, x, y)
{
  ctx.drawImage
  (
    img,
    which * 16,
    0,
    16,
    16,

    x,
    y,
    scale,
    scale
  );
}

function DrawShadow(x, y)
{
  var light = 1;

  for( var i = 0; i < blocks.length; i++)
  {
    for( var j = 0; j < blocks.length; j++)
    {
      if(blocks[i][j] == 6)
      {
        var newLight = Math.getDistance(x * scale + scale/2, y * scale + scale/2, i * scale + scale/2, j * scale + scale/2)/(8 * scale + ((Math.cos(time * 4)+1)/2)*25 );
        if(newLight < light) light = newLight;
      }
    }
  }

  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0," + light + ")";
  ctx.fillRect(x * scale, y * scale, scale, scale);
}

// When mouse moves
function MovingMouse(event)
{
  mouseX = event.clientX;
  mouseY = event.clientY;
}

// When mouse is clicked down
function MouseDown(event)
{ 

}

// When mouse is clicked up
function MouseUp(event)
{

}

// Resize the window on runtime
window.onresize = function() 
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
};

function DrawBackground() 
{
  ctx.beginPath();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}