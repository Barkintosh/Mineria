class GameObject
{
    constructor()
    {
        this.components = [];
        this.transform = new Transform({x:0, y:0}, {x:1, y:1});
    }

    Start()
    {
        this.components.forEach(function(e)
        {
            if(c.Start != null) c.Start();
        });
    }

    Update()
    {
        this.components.forEach(function(e)
        {
            if(e.Update != null) e.Update();
        });
    }

    AddComponent(component)
    {   
        this.components[this.components.length] = component;
        this[component.constructor.name] = component;
    }

    GetComponent(component)
    {
        if(this[component] != undefined) return this[component];
        else return null;
    }

    RemoveComponent(component)
    {
        for(let i = 0; i < this.components.length; i++)
        {
            if(this.components[i] == component)
            {
                delete this.components[i];
                this[component.constructor.name] = undefined;
                this.components.splice(i, 1);
            }
        }
    }
}