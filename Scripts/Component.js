class Component
{
    constructor()
    {
        this.debug = debug;
    }

    Update()
    {
        if(this.debug) this.Exhibit();
    }

    Exhibit()
    {

    }

    ToggleDebug()
    {
        this.debug = !this.debug;
    }
}