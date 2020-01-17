function TogglePause()
{
    pause = !pause;
    if(pause) document.getElementById("btn-pause").innerHTML = "Play";
    else document.getElementById("btn-pause").innerHTML = "Pause";
}

function ToggleDebug()
{
    debug = !debug;
    Debug();
    if(debug) document.getElementById("btn-debug").innerHTML = "Debug Mode";
    else document.getElementById("btn-debug").innerHTML = "Normal Mode";
}