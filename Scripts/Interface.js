var blocksOnScreen = 0;
var debug = false;

var btn = new Button({x:10, y:10}, 100, 30, "Debug", ToggleDebbug);
var btn2 = new Button({x:10, y:50}, 100, 30, "Button", Blame);

function UpdateInterface()
{
  btn.Update();
  btn2.Update();
}

function ToggleDebbug()
{
  debug = !debug;
  player.DebugMode();
}

function Blame()
{

}