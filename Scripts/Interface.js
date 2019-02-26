var blocksOnScreen = 0;
var debug = false;

var btn = new Button({x:10, y:10}, 100, 30, "Debug", "red", ToggleDebbug);

function UpdateInterface()
{
  btn.Update();
}

function ToggleDebbug()
{
  debug = !debug;
  player.DebugMode();

  for(var i = 0; i < scene.length; i++)
  {
    var sr = scene[i].GetComponent("SpriteRenderer");
    if(sr != null) sr.ToggleMask();

    var c = scene[i].GetComponent("Collider");
    if(c != null) c.ToggleShown();
  }
}