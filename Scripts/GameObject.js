class GameObject
{
    constructor()
    {
        this.components = [];
        this.name = "GameObject";
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
                this.components.splice(i, 1);
            }
        }
    }
}