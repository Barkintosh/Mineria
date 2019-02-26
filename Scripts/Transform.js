class Transform
{
    constructor(pos = {x:0, y:0}, size = {x:1, y:1})
    {
        this.position = {
            x:pos.x,
            y:pos.y
        };
        this.scale = {
            x:size.x,
            y:size.y
        };
        /*
        this.rotation = {
            x:0,
            y:0
        };
        */
    }
}