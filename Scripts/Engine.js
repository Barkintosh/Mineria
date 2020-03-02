function TogglePause()
{
    var btn = document.getElementById("btn-pause");
    pause = !pause;
    if(pause)
    {
        btn.innerHTML = "Pause";
        SetPressed(btn);
    }
    else
    {
        btn.innerHTML = "Pause";
        SetReleased(btn);
    }
}
function ToggleDebug()
{
    debug = !debug;
    Debug();
    var btn = document.getElementById("btn-debug");
    if(debug)
    {
        btn.innerHTML = "Debug Mode";
        SetPressed(btn);
    }
    else
    {
        btn.innerHTML = "Debug Mode";
        SetReleased(btn);
    }
}
function SetPressed(node)
{
    node.style.color = "#7289da";
    node.style.backgroundColor = "white";
    node.style.margin = "5px 15px 5px 15px";
}
function SetReleased(node)
{
    node.style.color = "white";
    node.style.backgroundColor = "#7289da";
    node.style.margin = "5px";
}


var panelOpen = true;
function TogglePanel()
{
    var panel = document.getElementById("panel");
    var btn = document.getElementById("btn-panel");
    panelOpen = !panelOpen;
    if(panelOpen)
    {
        panel.style.width = "250px";
        //panel.style.display = "flex";
        panel.style.padding = "10px";

        btn.style.left = "250px";
        btn.innerHTML = "&#8249;";
    }
    else
    {
        panel.style.width = "0px";
        //panel.style.display = "none";
        panel.style.padding = "0px";

        btn.style.left = "0px";
        btn.innerHTML = "&#8250;";
    }
}