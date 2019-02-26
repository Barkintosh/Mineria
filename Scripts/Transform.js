class Transform
{
    constructor(sPos = {x:0, y:0}, sSize = {x:1, y:1})
    {
        this.position = {
            x:sPos.x,
            y:sPos.y
        };
        this.scale = {
            x:sSize.x,
            y:sSize.y
        };
        /*
        this.rotation = {
            x:0,
            y:0
        };
        */
    }
}