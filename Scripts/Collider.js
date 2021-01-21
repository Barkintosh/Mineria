class Collider extends Component
{
    constructor()
    {
        super();
        this.isTrigger = false;
        this.offset = new Vector2();
        this.others = [];
        this.id = Physics.GetID();
    }

    Overlap(other)
    {
        return false;
    }

    Remember(other)
    {
        if(other == this || this.Know(other)) return;
        
        this.others[this.others.length] = other;
    }

    Forget(other)
    {
        if(other == this || !this.Know(other)) return;

        for(var i = 0; i < this.others.length; i++)
        {
            if(this.others[i].id == other.id) this.others.splice(i, 1);
        }
    }

    Know(other)
    {
        if(other == this) return false;
        
        for(var i = 0; i < this.others.length; i++)
        {
            if(this.others[i].id == other.id) return true;
        }
        return false;
    }

    OnOverlapEnter(other)
    {
        if(other == this) return false;
        this.Remember(other);
        for(var i = 0; i < this.gameObject.components.length; i++)
        {
            if(typeof this.gameObject.components[i].OnTriggerEnter !== 'undefined')
                this.gameObject.components[i].OnTriggerEnter(other);
        }
    }

    OnOverlapExit(other)
    {
        if(other == this) return false;
        this.Forget(other);
        for(var i = 0; i < this.gameObject.components.length; i++)
        {
            if(typeof this.gameObject.components[i].OnTriggerExit !== 'undefined')
                this.gameObject.components[i].OnTriggerExit(other);
        }
    }
}