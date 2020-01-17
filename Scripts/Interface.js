var blocksOnScreen = 0;
var debug = false;

//var btn = new Button({x:5, y:5}, 100, 30, "Debug", "red", ToggleDebug);
//var freeze = new Button({x:5, y:40}, 100, 30, "Pause", "blue", function(){pause = !pause});
//var reload = new Button({x:5, y:75}, 100, 30, "Reload", "green", function(){document.location.reload(true)});

function CharacterLayer()
{
  	if(player.Transform.layer == -1) player.Transform.layer = 1;
  	else player.Transform.layer = -1;
}

function UpdateInterface()
{
	//btn.Update();
	//freeze.Update();
	//reload.Update();

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

function ToggleDebug()
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