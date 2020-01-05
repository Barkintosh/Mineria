var blocksOnScreen = 0;
var debug = false;

var btn = new Button({x:5, y:5}, 100, 30, "Debug", "red", ToggleDebbug);

function CharacterLayer()
{
  	if(player.Transform.layer == -1) player.Transform.layer = 1;
  	else player.Transform.layer = -1;
}

function UpdateInterface()
{
	btn.Update();

	if(debug)
	{
		ctx.strokeStyle = "green";
		ctx.lineWidth = 5;
		ctx.rect(
			0,
			0,
			canvas.width,
			canvas.height
		);
		ctx.stroke();
	}
}

function TogglePause()
{
  	pause = !pause;
}

function ToggleDebbug()
{
	debug = !debug;
	for(var i = 0; i < scene.length; i++)
	{
		var sr = scene[i].GetComponent("SpriteRenderer");
		if(sr != null) sr.ToggleDebug();

		var c = scene[i].GetComponent("Collider");
		if(c != null) c.ToggleDebug();

		var t = scene[i].GetComponent("Transform");
		if(t != null) t.ToggleDebug();

		var bc = scene[i].GetComponent("BoxCollider");
		if(bc != null) bc.ToggleDebug();
	}
	if(debug) btn.color = "green";
	else btn.color = "red";
}