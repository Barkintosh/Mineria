var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var blocks = Create2DArray(64);
var scale = 32;
var time;
var player = new Character();

//var refreshTime = 1000 / 120;
//setInterval(Update, refreshTime);

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
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  UpdateBlocks();
  player.Draw();
  InterfaceUpdate();
  UpdateInputs();

  time = performance.now() / 1000;
  requestAnimationFrame(Update);
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
  for( var i = 0; i < blocks.length; i++)
  {
    for( var j = 0; j < blocks.length; j++)
    {
      blocks[i][j].Update();
    }
  }
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
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}