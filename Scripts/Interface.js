var blocksOnScreen = 0;
var debug = false;

var btn = new Button(position = {x:10, y:10}, 100, 30, "Debug", ToggleDebbug);

function InterfaceUpdate()
{
  btn.Update();
}

function ToggleDebbug()
{
  debug = !debug;
  console.log("debug");
}